import { beforeEach, describe, expect, it } from "vitest";
import { rateLimit, resetRateLimit } from "./rate-limit";

describe("rateLimit", () => {
  beforeEach(() => resetRateLimit());

  it("permite hasta el limite dentro de la ventana", () => {
    let t = 0;
    const opts = { limit: 3, windowMs: 1000, now: () => t };
    expect(rateLimit("a", opts).ok).toBe(true);
    expect(rateLimit("a", opts).ok).toBe(true);
    expect(rateLimit("a", opts).ok).toBe(true);
    const blocked = rateLimit("a", opts);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterMs).toBe(1000);
    t = 1001;
    expect(rateLimit("a", opts).ok).toBe(true);
  });

  it("aisla claves distintas", () => {
    const opts = { limit: 1, windowMs: 1000, now: () => 0 };
    expect(rateLimit("a", opts).ok).toBe(true);
    expect(rateLimit("b", opts).ok).toBe(true);
    expect(rateLimit("a", opts).ok).toBe(false);
  });
});
