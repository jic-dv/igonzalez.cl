import "server-only";
import { env } from "@/shared/lib/env";

export { drfFieldErrors } from "@/shared/lib/drf";

// Cliente minimo del backend de la oficina (Django REST). Solo se usa en servidor:
// el navegador nunca habla con la API, asi la CSP no necesita abrir connect-src.

const TIMEOUT_MS = 8000;

export type ApiResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; data: unknown; reason: "http" | "network" };

async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function request<T>(path: string, init: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${env.IGONZALEZ_API_URL}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...(init.headers ?? {}) },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const data = await parseBody(res);
    return res.ok
      ? { ok: true, status: res.status, data: data as T }
      : { ok: false, status: res.status, data, reason: "http" };
  } catch {
    return { ok: false, status: 0, data: null, reason: "network" };
  }
}

export const apiGet = <T>(path: string, revalidateSeconds: number) =>
  request<T>(path, { method: "GET", next: { revalidate: revalidateSeconds } });

export const apiPostJson = <T>(path: string, body: Record<string, unknown>) =>
  request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

export const apiPostForm = <T>(path: string, body: FormData) =>
  request<T>(path, { method: "POST", body, cache: "no-store" });
