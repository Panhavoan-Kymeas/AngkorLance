// Uploaded files come back from the API as root-relative paths like
// "/uploads/<uuid>.png". In dev the SPA runs on a different origin than the API,
// so those need the API origin prefixed. In prod VITE_API_URL is "/api" and the
// reverse proxy serves "/uploads/..." directly, so the path is already correct.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

export function assetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_ORIGIN}${normalized}`;
}

// Neutral inline placeholder for jobs without an image (no network request, no missing file).
export const JOB_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">No image</text></svg>`,
  );
