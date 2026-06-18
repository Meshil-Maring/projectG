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
      try {
        await api.delete(`${path}/${item.id}`);
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) continue;
        throw e;
      }
    }
  }

  const result: T[] = [];
  for (const item of next) {
    const prevItem = prev.find((p) => p.id === item.id);
    const { id: _id, ...body } = item;
    if (!prevIds.has(item.id)) {
      result.push(await api.post<T>(path, body));
    } else if (JSON.stringify({ ...prevItem, id: undefined }) !== JSON.stringify({ ...item, id: undefined })) {
      try {
        result.push(await api.patch<T>(`${path}/${item.id}`, body));
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) {
          result.push(await api.post<T>(path, body));
        } else {
          throw e;
        }
      }
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

// ── Shared gallery types ──────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface GalleryGroup {
  id: number;
  name: string;
  description: string;
  theme: string;
  themeColor: string;
  order: number;
  images: GalleryImage[];
}

async function uploadToGalleryGroup(endpoint: string, groupId: number, file: File): Promise<GalleryImage> {
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('pg_admin_token');
  const res = await fetch(`${API_URL}${endpoint}/${groupId}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.error?.message ?? 'Upload failed');
  return json.data as GalleryImage;
}

// ── WHG Gallery ───────────────────────────────────────────────────────────────

export type WhgGalleryImage = GalleryImage;
export type WhgGroup = GalleryGroup;

export function fetchWhgGroups(): Promise<GalleryGroup[]> {
  return api.get<GalleryGroup[]>('/content/whg-gallery/groups');
}

export function createWhgGroup(name: string, description?: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.post<GalleryGroup>('/content/whg-gallery/groups', { name, description: description ?? '', theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function updateWhgGroup(id: number, name: string, description: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.patch<GalleryGroup>(`/content/whg-gallery/groups/${id}`, { name, description, theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function deleteWhgGroup(id: number): Promise<{ id: number }> {
  return api.delete<{ id: number }>(`/content/whg-gallery/groups/${id}`);
}

export function uploadToWhgGroup(groupId: number, file: File): Promise<GalleryImage> {
  return uploadToGalleryGroup('/content/whg-gallery/groups', groupId, file);
}

export function deleteWhgGalleryImage(imageId: string): Promise<{ id: string }> {
  return api.delete<{ id: string }>(`/content/whg-gallery/image/${imageId}`);
}

export function updateWhgGalleryImage(imageId: string, name: string, description: string): Promise<GalleryImage> {
  return api.patch<GalleryImage>(`/content/whg-gallery/image/${imageId}`, { name, description });
}

// ── LAC Gallery ───────────────────────────────────────────────────────────────

export function fetchLacGroups(): Promise<GalleryGroup[]> {
  return api.get<GalleryGroup[]>('/content/lac-gallery/groups');
}

export function createLacGroup(name: string, description?: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.post<GalleryGroup>('/content/lac-gallery/groups', { name, description: description ?? '', theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function updateLacGroup(id: number, name: string, description: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.patch<GalleryGroup>(`/content/lac-gallery/groups/${id}`, { name, description, theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function deleteLacGroup(id: number): Promise<{ id: number }> {
  return api.delete<{ id: number }>(`/content/lac-gallery/groups/${id}`);
}

export function uploadToLacGroup(groupId: number, file: File): Promise<GalleryImage> {
  return uploadToGalleryGroup('/content/lac-gallery/groups', groupId, file);
}

export function deleteLacGalleryImage(imageId: string): Promise<{ id: string }> {
  return api.delete<{ id: string }>(`/content/lac-gallery/image/${imageId}`);
}

export function updateLacGalleryImage(imageId: string, name: string, description: string): Promise<GalleryImage> {
  return api.patch<GalleryImage>(`/content/lac-gallery/image/${imageId}`, { name, description });
}

// ── HRDS Gallery ──────────────────────────────────────────────────────────────

export function fetchHrdsGroups(): Promise<GalleryGroup[]> {
  return api.get<GalleryGroup[]>('/content/hrds-gallery/groups');
}

export function createHrdsGroup(name: string, description?: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.post<GalleryGroup>('/content/hrds-gallery/groups', { name, description: description ?? '', theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function updateHrdsGroup(id: number, name: string, description: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.patch<GalleryGroup>(`/content/hrds-gallery/groups/${id}`, { name, description, theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function deleteHrdsGroup(id: number): Promise<{ id: number }> {
  return api.delete<{ id: number }>(`/content/hrds-gallery/groups/${id}`);
}

export function uploadToHrdsGroup(groupId: number, file: File): Promise<GalleryImage> {
  return uploadToGalleryGroup('/content/hrds-gallery/groups', groupId, file);
}

export function deleteHrdsGalleryImage(imageId: string): Promise<{ id: string }> {
  return api.delete<{ id: string }>(`/content/hrds-gallery/image/${imageId}`);
}

export function updateHrdsGalleryImage(imageId: string, name: string, description: string): Promise<GalleryImage> {
  return api.patch<GalleryImage>(`/content/hrds-gallery/image/${imageId}`, { name, description });
}

// ── CWG Gallery ───────────────────────────────────────────────────────────────

export function fetchCwgGroups(): Promise<GalleryGroup[]> {
  return api.get<GalleryGroup[]>('/content/cwg-gallery/groups');
}

export function createCwgGroup(name: string, description?: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.post<GalleryGroup>('/content/cwg-gallery/groups', { name, description: description ?? '', theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function updateCwgGroup(id: number, name: string, description: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.patch<GalleryGroup>(`/content/cwg-gallery/groups/${id}`, { name, description, theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function deleteCwgGroup(id: number): Promise<{ id: number }> {
  return api.delete<{ id: number }>(`/content/cwg-gallery/groups/${id}`);
}

export function uploadToCwgGroup(groupId: number, file: File): Promise<GalleryImage> {
  return uploadToGalleryGroup('/content/cwg-gallery/groups', groupId, file);
}

export function deleteCwgGalleryImage(imageId: string): Promise<{ id: string }> {
  return api.delete<{ id: string }>(`/content/cwg-gallery/image/${imageId}`);
}

export function updateCwgGalleryImage(imageId: string, name: string, description: string): Promise<GalleryImage> {
  return api.patch<GalleryImage>(`/content/cwg-gallery/image/${imageId}`, { name, description });
}

// ── FSEDS Gallery ─────────────────────────────────────────────────────────────

export function fetchFsedsGroups(): Promise<GalleryGroup[]> {
  return api.get<GalleryGroup[]>('/content/fseds-gallery/groups');
}

export function createFsedsGroup(name: string, description?: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.post<GalleryGroup>('/content/fseds-gallery/groups', { name, description: description ?? '', theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function updateFsedsGroup(id: number, name: string, description: string, theme?: string, themeColor?: string): Promise<GalleryGroup> {
  return api.patch<GalleryGroup>(`/content/fseds-gallery/groups/${id}`, { name, description, theme: theme ?? '', themeColor: themeColor ?? '' });
}

export function deleteFsedsGroup(id: number): Promise<{ id: number }> {
  return api.delete<{ id: number }>(`/content/fseds-gallery/groups/${id}`);
}

export function uploadToFsedsGroup(groupId: number, file: File): Promise<GalleryImage> {
  return uploadToGalleryGroup('/content/fseds-gallery/groups', groupId, file);
}

export function deleteFsedsGalleryImage(imageId: string): Promise<{ id: string }> {
  return api.delete<{ id: string }>(`/content/fseds-gallery/image/${imageId}`);
}

export function updateFsedsGalleryImage(imageId: string, name: string, description: string): Promise<GalleryImage> {
  return api.patch<GalleryImage>(`/content/fseds-gallery/image/${imageId}`, { name, description });
}
