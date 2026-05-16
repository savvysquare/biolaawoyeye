import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Plus, Save, Trash2, LogOut, Upload, X, Film } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Media } from "@/lib/media";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Edit site content" }] }),
  component: Admin,
});

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string | null;
  year: number | null;
  sort_order: number;
  media: Media[];
};

type Manifesto = {
  id: string;
  title: string;
  description: string;
  category: string;
  term: string;
  sort_order: number;
};

const MANIFESTO_CATEGORIES = [
  "Water & Sanitation",
  "Education",
  "Electricity",
  "Healthcare",
  "Roads & Infrastructure",
  "Security",
  "Welfare",
  "Economic Empowerment",
];

function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<"content" | "projects" | "manifesto">("content");

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [user, loading, nav]);

  if (loading) return <div className="container-edge py-20">Loading…</div>;
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="container-edge py-20 max-w-2xl">
        <p className="eyebrow">Access required</p>
        <h1 className="display text-3xl mt-2 font-semibold">You are signed in, but not yet an admin.</h1>
        <p className="mt-4 text-muted-foreground">
          Ask the system owner to grant your account the <code className="px-1.5 py-0.5 rounded bg-secondary">admin</code> role.
          Your user ID is:
        </p>
        <pre className="mt-3 p-3 rounded bg-secondary text-xs overflow-auto">{user.id}</pre>
        <button
          onClick={async () => { await supabase.auth.signOut(); nav({ to: "/login" }); }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:border-foreground"
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="container-edge py-12">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="display text-4xl mt-2 font-semibold">Edit site content</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm hover:text-grass">View site →</Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); nav({ to: "/login" }); }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-foreground"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-2 border-b border-border">
        {[
          ["content", "Site content"],
          ["projects", "Projects"],
          ["manifesto", "Manifesto"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k as typeof tab)}
            className={`px-4 py-3 text-sm border-b-2 -mb-px transition ${
              tab === k ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "content" && <ContentEditor />}
        {tab === "projects" && <ProjectsEditor />}
        {tab === "manifesto" && <ManifestoEditor />}
      </div>
    </div>
  );
}

function ContentEditor() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["site_content_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("*").order("key");
      return data ?? [];
    },
  });
  const [draft, setDraft] = useState<Record<string, string>>({});
  useEffect(() => {
    const m: Record<string, string> = {};
    data.forEach((r) => (m[r.key] = r.value));
    setDraft(m);
  }, [data]);

  async function save(key: string) {
    const { error } = await supabase.from("site_content").update({ value: draft[key] }).eq("key", key);
    if (error) toast.error(error.message);
    else {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["site_content"] });
    }
  }

  return (
    <div className="space-y-4 max-w-3xl">
      {data.map((r) => (
        <div key={r.key} className="rounded-2xl border border-border p-5">
          <p className="eyebrow">{r.key}</p>
          <textarea
            value={draft[r.key] ?? ""}
            onChange={(e) => setDraft({ ...draft, [r.key]: e.target.value })}
            rows={r.value.length > 80 ? 4 : 2}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            onClick={() => save(r.key)}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium"
          >
            <Save size={12} /> Save
          </button>
        </div>
      ))}
    </div>
  );
}

function ProjectsEditor() {
  const qc = useQueryClient();
  const { data = [] } = useQuery<Project[]>({
    queryKey: ["projects_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("projects").select("*").order("sort_order");
      return ((data as unknown) as Project[]) ?? [];
    },
  });

  async function add() {
    const { error } = await supabase.from("projects").insert({
      title: "New project",
      description: "Description",
      category: MANIFESTO_CATEGORIES[0],
      sort_order: (data[data.length - 1]?.sort_order ?? 0) + 1,
    });
    if (error) toast.error(error.message);
    else { toast.success("Added"); refresh(); }
  }
  function refresh() {
    qc.invalidateQueries({ queryKey: ["projects_admin"] });
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  return (
    <div className="space-y-4">
      <button onClick={add} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm">
        <Plus size={14} /> Add project
      </button>
      <div className="grid lg:grid-cols-2 gap-4">
        {data.map((p) => (
          <ProjectRow key={p.id} project={p} onChange={refresh} />
        ))}
      </div>
    </div>
  );
}

function ProjectRow({ project, onChange }: { project: Project; onChange: () => void }) {
  const [p, setP] = useState<Project>({ ...project, media: project.media ?? [] });
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => setP({ ...project, media: project.media ?? [] }), [project]);

  async function save() {
    const { error } = await supabase.from("projects").update({
      title: p.title, description: p.description, category: p.category,
      location: p.location, year: p.year, sort_order: p.sort_order,
      media: p.media,
    }).eq("id", p.id);
    if (error) toast.error(error.message); else { toast.success("Saved"); onChange(); }
  }
  async function remove() {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", p.id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); onChange(); }
  }

  async function onUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const added: Media[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${p.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("project-media").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (error) {
        toast.error(`${file.name}: ${error.message}`);
        continue;
      }
      const { data: pub } = supabase.storage.from("project-media").getPublicUrl(path);
      added.push({
        url: pub.publicUrl,
        type: file.type.startsWith("video/") ? "video" : "image",
        path,
      });
    }
    const newMedia = [...(p.media ?? []), ...added];
    const { error: updErr } = await supabase.from("projects").update({ media: newMedia }).eq("id", p.id);
    if (updErr) toast.error(updErr.message);
    else {
      setP({ ...p, media: newMedia });
      toast.success(`Uploaded ${added.length} file(s)`);
      onChange();
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function removeMedia(idx: number) {
    const m = p.media[idx];
    const newMedia = p.media.filter((_, i) => i !== idx);
    if (m.path) await supabase.storage.from("project-media").remove([m.path]);
    const { error } = await supabase.from("projects").update({ media: newMedia }).eq("id", p.id);
    if (error) toast.error(error.message);
    else { setP({ ...p, media: newMedia }); onChange(); }
  }

  return (
    <div className="rounded-2xl border border-border p-5 space-y-3">
      <input value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })}
        className="w-full text-base font-medium rounded border border-input bg-background px-3 py-2" />
      <textarea value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} rows={3}
        className="w-full text-sm rounded border border-input bg-background px-3 py-2" />
      <div className="grid grid-cols-2 gap-2">
        <select value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })}
          className="w-full text-sm rounded border border-input bg-background px-3 py-2">
          {MANIFESTO_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          {!MANIFESTO_CATEGORIES.includes(p.category) && <option value={p.category}>{p.category}</option>}
        </select>
        <input placeholder="Location" value={p.location ?? ""} onChange={(e) => setP({ ...p, location: e.target.value })}
          className="w-full text-sm rounded border border-input bg-background px-3 py-2" />
        <input type="number" placeholder="Year" value={p.year ?? ""} onChange={(e) => setP({ ...p, year: e.target.value ? Number(e.target.value) : null })}
          className="w-full text-sm rounded border border-input bg-background px-3 py-2" />
        <input type="number" placeholder="Sort order" value={p.sort_order} onChange={(e) => setP({ ...p, sort_order: Number(e.target.value) })}
          className="w-full text-sm rounded border border-input bg-background px-3 py-2" />
      </div>

      {/* Media manager */}
      <div className="pt-2">
        <p className="eyebrow mb-2">Media · {p.media.length}</p>
        {p.media.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {p.media.map((m, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                {m.type === "image" ? (
                  <img src={m.url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full grid place-items-center bg-foreground/5">
                    <Film size={20} className="text-foreground/40" />
                  </div>
                )}
                <button
                  onClick={() => removeMedia(i)}
                  className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-background/90 opacity-0 group-hover:opacity-100 transition"
                  aria-label="Remove"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <label className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-xs cursor-pointer hover:border-foreground">
          <Upload size={12} /> {uploading ? "Uploading…" : "Upload images / video"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            disabled={uploading}
            onChange={(e) => onUpload(e.target.files)}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex gap-2 pt-2">
        <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs">
          <Save size={12} /> Save
        </button>
        <button onClick={remove} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-destructive hover:border-destructive">
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </div>
  );
}

function ManifestoEditor() {
  const qc = useQueryClient();
  const { data = [] } = useQuery<Manifesto[]>({
    queryKey: ["manifesto_admin"],
    queryFn: async () => {
      const { data } = await supabase.from("manifesto_items").select("*").order("sort_order");
      return (data as Manifesto[]) ?? [];
    },
  });

  async function add(term: "current" | "previous") {
    const { error } = await supabase.from("manifesto_items").insert({
      title: "New promise", description: "Description", category: MANIFESTO_CATEGORIES[0], term,
      sort_order: (data.filter((d) => d.term === term).at(-1)?.sort_order ?? 0) + 1,
    });
    if (error) toast.error(error.message); else { toast.success("Added"); refresh(); }
  }
  function refresh() {
    qc.invalidateQueries({ queryKey: ["manifesto_admin"] });
    qc.invalidateQueries({ queryKey: ["manifesto"] });
  }

  return (
    <div className="space-y-10">
      {(["current", "previous"] as const).map((term) => (
        <section key={term}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="display text-2xl font-semibold capitalize">{term} manifesto</h2>
            <button onClick={() => add(term)} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs">
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {data.filter((d) => d.term === term).map((m) => (
              <ManifestoRow key={m.id} item={m} onChange={refresh} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ManifestoRow({ item, onChange }: { item: Manifesto; onChange: () => void }) {
  const [m, setM] = useState(item);
  useEffect(() => setM(item), [item]);

  async function save() {
    const { error } = await supabase.from("manifesto_items").update({
      title: m.title, description: m.description, category: m.category, sort_order: m.sort_order,
    }).eq("id", m.id);
    if (error) toast.error(error.message); else { toast.success("Saved"); onChange(); }
  }
  async function remove() {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from("manifesto_items").delete().eq("id", m.id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); onChange(); }
  }

  return (
    <div className="rounded-2xl border border-border p-5 space-y-2">
      <input value={m.title} onChange={(e) => setM({ ...m, title: e.target.value })}
        className="w-full text-base font-medium rounded border border-input bg-background px-3 py-2" />
      <textarea value={m.description} onChange={(e) => setM({ ...m, description: e.target.value })} rows={3}
        className="w-full text-sm rounded border border-input bg-background px-3 py-2" />
      <div className="grid grid-cols-2 gap-2">
        <select value={m.category} onChange={(e) => setM({ ...m, category: e.target.value })}
          className="w-full text-sm rounded border border-input bg-background px-3 py-2">
          {MANIFESTO_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          {!MANIFESTO_CATEGORIES.includes(m.category) && <option value={m.category}>{m.category}</option>}
        </select>
        <input type="number" placeholder="Sort" value={m.sort_order} onChange={(e) => setM({ ...m, sort_order: Number(e.target.value) })}
          className="w-full text-sm rounded border border-input bg-background px-3 py-2" />
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs">
          <Save size={12} /> Save
        </button>
        <button onClick={remove} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-destructive hover:border-destructive">
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </div>
  );
}
