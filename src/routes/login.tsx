import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Staff sign-in" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
        nav({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You can now sign in.");
        setMode("login");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-edge min-h-[70vh] grid place-items-center py-20">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
        <p className="eyebrow text-primary">Staff portal</p>
        <h1 className="display text-3xl mt-2">{mode === "login" ? "Sign in" : "Create account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Admin access is required to edit site content. The first account created must be granted admin via the database.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="eyebrow">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="eyebrow">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <button
            disabled={busy}
            className="w-full inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-5 text-sm text-muted-foreground hover:text-primary"
        >
          {mode === "login" ? "Need an account? Create one" : "Have an account? Sign in"}
        </button>
        <div className="mt-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
