// Detecta el tipo real de un archivo por sus primeros bytes. La extension y el
// Content-Type del cliente no se consideran: son entrada hostil.

export type CvKind = "pdf" | "doc" | "docx";

const signatures: { kind: CvKind; bytes: number[]; mime: string; ext: string }[] = [
  { kind: "pdf", bytes: [0x25, 0x50, 0x44, 0x46], mime: "application/pdf", ext: "pdf" },
  {
    kind: "doc",
    bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
    mime: "application/msword",
    ext: "doc",
  },
  {
    kind: "docx",
    bytes: [0x50, 0x4b, 0x03, 0x04],
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ext: "docx",
  },
];

export function detectCvType(head: Uint8Array) {
  for (const s of signatures) {
    if (s.bytes.every((b, i) => head[i] === b)) return s;
  }
  return null;
}
