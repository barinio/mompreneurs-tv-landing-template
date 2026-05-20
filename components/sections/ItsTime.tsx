import type { ContentJson } from "@/lib/types";
import { show } from "@/lib/show";

type Props = { itsTime: ContentJson["itsTime"] };

const BROWN = "rgb(102, 69, 46)";
const GOLD = "rgba(209, 177, 95, 0.98)";
const SERIF = 'Imbue, sans-serif';

const BODY_P_STYLE = {
  fontSize: 22,
  fontFamily: '"PT Sans Narrow", sans-serif',
  fontWeight: 500,
  lineHeight: 1.6,
  color: "#000",
  margin: "0 0 18px 0",
  textAlign: "left" as const,
};

export default function ItsTime({ itsTime }: Props) {
  return (
    <>
      {/* White card */}
      <div
        style={{
          backgroundColor: "#fff",
          width: "85%",
          maxWidth: 1000,
          margin: "clamp(-120px, -12vw, -40px) auto 0",
          padding: "55px 25px 30px",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 15px" }}>
          {/* Top headlines */}
          {show(itsTime.headlineTop) && (
            <h1
              style={{
                textAlign: "center",
                fontSize: "clamp(34px, 7vw, 62px)",
                color: BROWN,
                margin: 0,
                lineHeight: 1.05,
                fontFamily: SERIF,
                fontWeight: 500,
              }}
            >
              {itsTime.headlineTop}
            </h1>
          )}
          {show(itsTime.headlineBottom) && (
            <h1
              style={{
                textAlign: "center",
                fontSize: "clamp(34px, 7vw, 62px)",
                color: GOLD,
                margin: "6px 0 0",
                lineHeight: 1.05,
                fontFamily: SERIF,
                fontWeight: 500,
              }}
            >
              {itsTime.headlineBottom}
            </h1>
          )}

          {/* Body top */}
          <div style={{ marginTop: 28 }}>
            {itsTime.bodyTop.map((p, i) => (
              <p key={i} style={BODY_P_STYLE}>
                {p}
              </p>
            ))}
          </div>

          {/* Reality */}
          {show(itsTime.realityIntro) && (
            <p style={{ ...BODY_P_STYLE, fontStyle: "italic", fontWeight: 700 }}>
              {itsTime.realityIntro}
            </p>
          )}
          {itsTime.realityPoints.map((p, i) => (
            <p key={i} style={BODY_P_STYLE}>
              {p}
            </p>
          ))}

          {/* Mid headlines */}
          {show(itsTime.headlineMidTop) && (
            <h1
              style={{
                textAlign: "center",
                fontSize: "clamp(44px, 9vw, 80px)",
                color: GOLD,
                margin: "35px 0 0",
                lineHeight: 1,
                fontFamily: SERIF,
                fontWeight: 500,
              }}
            >
              {itsTime.headlineMidTop}
            </h1>
          )}
          {show(itsTime.headlineMidBottom) && (
            <h1
              style={{
                textAlign: "center",
                fontSize: "clamp(34px, 7vw, 62px)",
                color: BROWN,
                margin: "4px 0 0",
                lineHeight: 1.05,
                fontFamily: SERIF,
                fontWeight: 500,
              }}
            >
              {itsTime.headlineMidBottom}
            </h1>
          )}

          {/* Body mid */}
          <div style={{ marginTop: 28 }}>
            {itsTime.bodyMid.map((p, i) => (
              <p key={i} style={BODY_P_STYLE}>
                {p}
              </p>
            ))}
          </div>

          {/* Image */}
          {show(itsTime.imageUrl) && (
            <div style={{ textAlign: "center", marginTop: 35 }}>
              <img
                src={itsTime.imageUrl}
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "inline-block",
                }}
              />
            </div>
          )}

          {/* Imagine bold center */}
          {show(itsTime.imagineHeadline) && (
            <h2
              style={{
                textAlign: "center",
                fontSize: 26,
                color: "#000",
                margin: "32px 0 18px",
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              {itsTime.imagineHeadline}
            </h2>
          )}

          {/* Bullet list */}
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {itsTime.bullets.map((b, i) => (
              <li key={i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 12,
                    fontSize: 21,
                    color: "#000",
                    padding: "14px 0",
                    textAlign: "center",
                  }}
                >
                  <i
                    className="fas fa-check-circle"
                    style={{
                      color: GOLD,
                      fontSize: 22,
                      lineHeight: "1.3em",
                      flexShrink: 0,
                    }}
                  />
                  <span>{b}</span>
                </div>
                {i < itsTime.bullets.length - 1 && (
                  <div
                    style={{
                      borderTop: "1px solid rgb(214, 214, 214)",
                      width: "100%",
                      margin: "0 auto",
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
