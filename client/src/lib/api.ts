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
