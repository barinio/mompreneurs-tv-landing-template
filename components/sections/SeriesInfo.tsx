import type { ContentJson } from "@/lib/types";

type Props = {
  seriesInfo: ContentJson["seriesInfo"];
};

export default function SeriesInfo({ seriesInfo }: Props) {
  return (
    <div style={{ backgroundColor: "#000000", padding: "24px 0 32px" }}>
      <div
        style={{
          backgroundColor: "#FAF5E4",
          maxWidth: 995,
          width: "100%",
          boxSizing: "border-box",
          margin: "0 auto",
          borderRadius: 4,
          padding: "clamp(20px, 4vw, 35px) clamp(16px, 4vw, 36px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {seriesInfo.boxes.map((box, i) => (
          <div
            key={i}
            style={{
              flex: "0 1 200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 6,
              padding: "0 12px",
            }}
          >
            <p
              style={{
                fontSize: "clamp(15px, 1.8vw, 20px)",
                fontWeight: 700,
                fontFamily: '"PT Sans Narrow", sans-serif',
                letterSpacing: "0.1em",
                color: "rgba(209, 177, 95, 0.98)",
                textTransform: "uppercase",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
              }}
            >
              {box.icon && <i className={box.icon} style={{ fontSize: "1em" }} />}
              {box.label}
            </p>
            <p
              style={{
                fontSize: "clamp(18px, 2.2vw, 24px)",
                fontWeight: 700,
                fontFamily: '"PT Sans Narrow", sans-serif',
                color: "rgb(102, 69, 46)",
                textTransform: "uppercase",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              {box.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
