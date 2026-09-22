// Mide contraste WCAG entre pares de tokens OKLCH. Uso: node scripts/contrast.mjs
const oklchToSrgb = (L, C, h) => {
  const a = C * Math.cos((h * Math.PI) / 180),
    b = C * Math.sin((h * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3,
    m = m_ ** 3,
    s = s_ ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return [r, g, bb].map((v) => Math.min(1, Math.max(0, v)));
};
const lum = ([r, g, b]) => {
  const f = (c) => (c <= 0.0031308 ? c : c); // ya lineal
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const hex = ([r, g, b]) =>
  "#" +
  [r, g, b]
    .map((c) => {
      const s = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
      return Math.round(s * 255)
        .toString(16)
        .padStart(2, "0");
    })
    .join("");
const tokens = {
  ink: [0.21, 0.12, 268],
  ink2: [0.27, 0.11, 268],
  ink3: [0.34, 0.1, 268],
  brand: [0.45, 0.19, 268],
  brandHover: [0.4, 0.19, 268],
  amber: [0.82, 0.16, 75],
  amberDeep: [0.56, 0.14, 62],
  paper: [0.985, 0.004, 268],
  paper2: [0.96, 0.008, 268],
  line: [0.9, 0.012, 268],
  text: [0.24, 0.05, 268],
  muted: [0.47, 0.04, 268],
  onInkMuted: [0.8, 0.03, 268],
  wa: [0.5, 0.14, 155],
  error: [0.52, 0.2, 25],
  white: [1, 0, 0],
};
const rgb = Object.fromEntries(Object.entries(tokens).map(([k, v]) => [k, oklchToSrgb(...v)]));
const ratio = (a, b) => {
  const [l1, l2] = [lum(rgb[a]), lum(rgb[b])].sort((x, y) => y - x);
  return ((l1 + 0.05) / (l2 + 0.05)).toFixed(2);
};
for (const k of Object.keys(tokens)) console.log(k.padEnd(12), hex(rgb[k]));
const pairs = [
  ["text", "paper"],
  ["muted", "paper"],
  ["brand", "paper"],
  ["white", "brand"],
  ["white", "ink"],
  ["amber", "ink"],
  ["onInkMuted", "ink"],
  ["amberDeep", "paper"],
  ["white", "wa"],
  ["error", "paper"],
  ["ink", "amber"],
  ["text", "paper2"],
  ["muted", "paper2"],
  ["line", "paper"],
];
for (const [a, b] of pairs) console.log(`${a} / ${b}`.padEnd(22), ratio(a, b));
