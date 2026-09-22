// Ventana deslizante en memoria. Suficiente como primera barrera por instancia;
// en produccion se complementa con el rate limiting del WAF (Vercel/Cloudflare),
// que si es global. Ver README, seccion Seguridad.

type Bucket = number[];

const buckets = new Map<string, Bucket>();

const MAX_KEYS = 5000;

export type RateLimitOptions = {
  limit: number;
  windowMs: number;
  now?: () => number;
};

export function rateLimit(key: string, { limit, windowMs, now = Date.now }: RateLimitOptions) {
  const t = now();
  const since = t - windowMs;
  const hits = (buckets.get(key) ?? []).filter((h) => h > since);

  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false as const, retryAfterMs: hits[0] + windowMs - t };
  }

  hits.push(t);
  buckets.set(key, hits);

  if (buckets.size > MAX_KEYS) {
    const oldest = buckets.keys().next().value;
    if (oldest !== undefined) buckets.delete(oldest);
  }

  return { ok: true as const, remaining: limit - hits.length };
}

export function resetRateLimit() {
  buckets.clear();
}
