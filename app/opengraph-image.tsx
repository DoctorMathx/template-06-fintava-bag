import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fintava — Premium Leather Bags Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end", background: "#1A1A1A", padding: "60px 70px", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>
        {/* Camel accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "#C4956A", display: "flex" }} />
        {/* Diagonal graphic */}
        <div style={{ position: "absolute", right: -100, top: -100, width: 500, height: 500, background: "rgba(196,149,106,0.07)", transform: "rotate(45deg)", display: "flex" }} />
        <div style={{ position: "absolute", right: 80, top: 80, width: 300, height: 300, border: "1px solid rgba(196,149,106,0.15)", display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C4956A", display: "flex" }}>New Season 2026</div>
          <div style={{ fontSize: 76, fontWeight: 900, color: "#ffffff", lineHeight: 1.0, letterSpacing: "0.02em", textTransform: "uppercase", display: "flex" }}>For going</div>
          <div style={{ fontSize: 76, fontWeight: 900, color: "#C4956A", lineHeight: 1.0, letterSpacing: "0.02em", textTransform: "uppercase", display: "flex" }}>everywhere.</div>
        </div>

        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginBottom: 48, maxWidth: 600, lineHeight: 1.5, display: "flex" }}>
          Premium leather bags for Nigeria&apos;s modern woman and man. Crafted to last. Designed to impress.
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", letterSpacing: "0.06em", display: "flex" }}>FINTAVA</div>
          <div style={{ background: "#C4956A", padding: "14px 32px", fontSize: 14, fontWeight: 700, color: "#ffffff", letterSpacing: "0.14em", textTransform: "uppercase", display: "flex" }}>Shop Now →</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
