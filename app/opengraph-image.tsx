import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fintava — Premium Leather Bags Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#3D0000",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Camel accent top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#C4956A", display: "flex" }} />

        {/* Decorative circle */}
        <div style={{ position: "absolute", right: -80, top: -80, width: 440, height: 440, borderRadius: "50%", border: "1px solid rgba(196,149,106,0.2)", display: "flex" }} />
        <div style={{ position: "absolute", right: 60, top: 60, width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(196,149,106,0.12)", display: "flex" }} />

        {/* Eyebrow */}
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#C4956A", marginBottom: 20, display: "flex" }}>
          New Season — 2026
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 28 }}>
          <div style={{ fontSize: 88, fontWeight: 900, color: "#ffffff", lineHeight: 0.92, letterSpacing: "-0.02em", display: "flex" }}>
            Fintava
          </div>
          <div style={{ fontSize: 38, fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.2, letterSpacing: "0.01em", fontStyle: "italic", display: "flex" }}>
            Premium Leather Bags Nigeria
          </div>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", marginBottom: 52, maxWidth: 560, lineHeight: 1.6, display: "flex" }}>
          Crafted for Nigeria&apos;s modern woman and man. Built to last. Designed to impress.
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex" }}>
              fintava.ng
            </div>
          </div>
          <div style={{ background: "#C4956A", padding: "14px 34px", fontSize: 13, fontWeight: 800, color: "#ffffff", letterSpacing: "0.18em", textTransform: "uppercase", display: "flex" }}>
            Shop Now →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
