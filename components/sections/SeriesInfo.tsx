import type { ContentJson } from "@/lib/types";

type Props = {
  seriesInfo: ContentJson["seriesInfo"];
};

const BOXES = [
  { icon: "fas fa-film", label: "SERIES", key: "series" as const },
  { icon: "fas fa-users", label: "STATUS", key: "status" as const },
  {
    icon: "fas fa-map-marker-alt",
    label: "FILM LOCATION",
    key: "location" as const,
  },
  {
    icon: "fas fa-calendar-alt",
    label: "FILMING DATE",
    key: "filmingDate" as const,
  },
];

export default function SeriesInfo({ seriesInfo }: Props) {
  return (
    <div style={{ backgroundColor: "#000000", padding: "24px 0 32px" }}>
      <div
        style={{
          backgroundColor: "#FAF5E4",
          maxWidth: 995,
          width: "100%",
          height: 132,
          boxSizing: "border-box",
          margin: "0 auto",
          borderRadius: 4,
          padding: "35px 36px",
          display: "flex",
          alignItems: "center",
          gap: 0,
        }}
      >
        {BOXES.map((box, i) => (
          <div
            key={box.key}
            style={{
              flex: "1 1 0",
              height: 62,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding:
                i === 0 ? "0 28px 0 0" : i === 3 ? "0 0 0 28px" : "0 28px",
            }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: 700,
                fontFamily: '"PT Sans Narrow", sans-serif',
                letterSpacing: "0.1em",
                color: "rgba(209, 177, 95, 0.98)",
                textTransform: "uppercase",
                margin: "0 0 6px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
              }}
            >
              <i className={box.icon} style={{ fontSize: 20 }} />
              {box.label}
            </p>
            <p
              style={{
                fontSize: 24,
                fontWeight: 700,
                fontFamily: '"PT Sans Narrow", sans-serif',
                color: "rgb(102, 69, 46)",
                textTransform: "uppercase",
                margin: 0,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {seriesInfo[box.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
