import { describe, expect, it } from "vitest";
import { detectCvType } from "./file-type";

describe("detectCvType", () => {
  it("reconoce PDF por magic bytes", () => {
    expect(detectCvType(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]))?.kind).toBe("pdf");
  });
  it("reconoce DOCX (zip)", () => {
    expect(detectCvType(new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0, 0, 0, 0]))?.kind).toBe("docx");
  });
  it("reconoce DOC (OLE)", () => {
    expect(detectCvType(new Uint8Array([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))?.kind).toBe("doc");
  });
  it("rechaza un ejecutable aunque diga .pdf", () => {
    expect(detectCvType(new Uint8Array([0x4d, 0x5a, 0x90, 0x00, 0, 0, 0, 0]))).toBeNull();
  });
  it("rechaza buffers vacios", () => {
    expect(detectCvType(new Uint8Array([]))).toBeNull();
  });
});
