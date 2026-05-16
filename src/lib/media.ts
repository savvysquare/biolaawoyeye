export type Media = { url: string; type: "image" | "video"; path?: string };

export function isImage(file: File) {
  return file.type.startsWith("image/");
}
export function isVideo(file: File) {
  return file.type.startsWith("video/");
}
