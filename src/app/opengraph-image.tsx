import { ImageResponse } from "next/og";

export const alt = "Gray Group — Arizona Luxury Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand-consistent Open Graph card, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#171717",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 9,
              color: "#C8B89A",
              textTransform: "uppercase",
            }}
          >
            Arizona Luxury Real Estate
          </div>

          <div
            style={{
              marginTop: 46,
              fontSize: 78,
              lineHeight: 1.05,
              color: "#F7F4EE",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Exceptional Properties.</span>
            <span>Extraordinary Living.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #383838",
            paddingTop: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, letterSpacing: 12, color: "#F7F4EE" }}>
              GRAY GROUP
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 14,
                letterSpacing: 5,
                color: "#9B8060",
              }}
            >
              PARADISE VALLEY · SCOTTSDALE · PHOENIX
            </div>
          </div>

          <div style={{ fontSize: 22, color: "#8a8a8a" }}>
            graygroupaz.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
