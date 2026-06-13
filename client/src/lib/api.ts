import type { ImageSpecKey } from './imageSpecs';

const API_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("pg_admin_token");
  const headers: Record<string, string> = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(json?.error?.message ?? "Request failed", res.status);
  }
  return json.data as T;
}

/**
 * Reconciles a locally-edited array against its last-known server state by
 * issuing the minimal create/update/delete/reorder calls, then returns the
 * array with server-assigned ids/fields applied.
 */
export async function syncList<T extends { id: number }>(
  path: string,
  prev: T[],
  next: T[],
): Promise<T[]> {
  const prevIds = new Set(prev.map((i) => i.id));
  const nextIds = new Set(next.map((i) => i.id));

  for (const item of prev) {
    if (!nextIds.has(item.id)) {
      await api.delete(`${path}/${item.id}`);
    }
  }

  const result: T[] = [];
  for (const item of next) {
    const prevItem = prev.find((p) => p.id === item.id);
    const { id: _id, ...body } = item;
    if (!prevIds.has(item.id)) {
      result.push(await api.post<T>(path, body));
    } else if (JSON.stringify({ ...prevItem, id: undefined }) !== JSON.stringify({ ...item, id: undefined })) {
      result.push(await api.patch<T>(`${path}/${item.id}`, body));
    } else {
      result.push(item);
    }
  }

  await api.patch(`${path}/reorder`, { ids: result.map((i) => i.id) });
  return result;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body !== undefined ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

export interface UploadedImage {
  url: string;
  path: string;
}

/** Uploads an image file for the given section. `replace` is the URL of the image being replaced, if any. */
export async function uploadImageFile(
  file: File,
  key: ImageSpecKey,
  replace?: string,
): Promise<UploadedImage> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("key", key);
  if (replace) formData.append("replace", replace);

  const token = localStorage.getItem("pg_admin_token");
  const res = await fetch(`${API_URL}/content/images/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(json?.error?.message ?? "Upload failed", res.status);
  }
  return json.data as UploadedImage;
}

/** Validates and stores a copy of the image found at `url` for the given section. */
export function uploadImageFromUrl(
  url: string,
  key: ImageSpecKey,
  replace?: string,
): Promise<UploadedImage> {
  return api.post<UploadedImage>("/content/images/from-url", { url, key, replace });
}
