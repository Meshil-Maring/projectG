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

// ── Raw Photos ────────────────────────────────────────────────────────────────

export interface RawPhoto {
  id: number;
  section: string;
  url: string;
  filename: string;
  caption: string;
  uploadedAt: string;
}

export function fetchRawPhotos(section?: string): Promise<RawPhoto[]> {
  const qs = section ? `?section=${encodeURIComponent(section)}` : "";
  return api.get<RawPhoto[]>(`/content/raw-photos${qs}`);
}

export async function uploadRawPhotos(
  files: File[],
  section: string,
): Promise<RawPhoto[]> {
  const formData = new FormData();
  formData.append("section", section);
  for (const file of files) formData.append("files", file);

  const token = localStorage.getItem("pg_admin_token");
  const res = await fetch(`${API_URL}/content/raw-photos/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(json?.error?.message ?? "Upload failed", res.status);
  return json.data as RawPhoto[];
}

export function deleteRawPhoto(id: number): Promise<RawPhoto> {
  return api.delete<RawPhoto>(`/content/raw-photos/${id}`);
}

export function updateRawPhotoCaption(id: number, caption: string): Promise<RawPhoto> {
  return api.patch<RawPhoto>(`/content/raw-photos/${id}`, { caption });
}

// ── WHG Gallery ───────────────────────────────────────────────────────────────

export interface WhgGalleryImage {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface WhgGroup {
  id: number;
  name: string;
  order: number;
  images: WhgGalleryImage[];
}

export function fetchWhgGroups(): Promise<WhgGroup[]> {
  return api.get<WhgGroup[]>('/content/whg-gallery/groups');
}

export function createWhgGroup(name: string): Promise<WhgGroup> {
  return api.post<WhgGroup>('/content/whg-gallery/groups', { name });
}

export function renameWhgGroup(id: number, name: string): Promise<WhgGroup> {
  return api.patch<WhgGroup>(`/content/whg-gallery/groups/${id}`, { name });
}

export function deleteWhgGroup(id: number): Promise<{ id: number }> {
  return api.delete<{ id: number }>(`/content/whg-gallery/groups/${id}`);
}

export async function uploadToWhgGroup(groupId: number, file: File): Promise<WhgGalleryImage> {
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('pg_admin_token');
  const res = await fetch(`${API_URL}/content/whg-gallery/groups/${groupId}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.error?.message ?? 'Upload failed');
  return json.data as WhgGalleryImage;
}

export function deleteWhgGalleryImage(imageId: string): Promise<{ id: string }> {
  return api.delete<{ id: string }>(`/content/whg-gallery/image/${imageId}`);
}

export function updateWhgGalleryImage(
  imageId: string,
  name: string,
  description: string,
): Promise<WhgGalleryImage> {
  return api.patch<WhgGalleryImage>(`/content/whg-gallery/image/${imageId}`, { name, description });
}
