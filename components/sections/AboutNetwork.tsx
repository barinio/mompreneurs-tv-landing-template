import type { ContentJson } from "@/lib/types";

type Props = {
  aboutNetwork: ContentJson["aboutNetwork"];
  theme?: ContentJson["theme"];
};

export default function AboutNetwork({ aboutNetwork }: Props) {
  const paragraphs = aboutNetwork.body.split("\n\n");

  return (
    <div
      style={{
        backgroundColor: "rgb(3, 2, 0)",
        backgroundImage: "url(/images/bg3.jpg)",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: 100,
        paddingBottom: 120,
      }}
    >
      <div
        style={{
          maxWidth: 936,
          width: "95%",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 40 }}>
          <div style={{ flex: "1 1 460px", minWidth: 280 }}>
            <h2
              style={{
                fontSize: 30,
                fontFamily: '"PT Sans Narrow", sans-serif',
                color: "rgb(202, 171, 122)",
                margin: 0,
                letterSpacing: "0.1em",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {aboutNetwork.eyebrow}
            </h2>
            <h1
              style={{
                fontSize: 90,
                color: "#fff",
                margin: "16px 0 0",
                fontFamily: 'Imbue, sans-serif',
                fontWeight: 500,
                lineHeight: 0.95,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              {aboutNetwork.headlineTop}
              <br />
              {aboutNetwork.headlineBottom}
            </h1>
            <h2
              style={{
                fontSize: 23,
                fontFamily: '"PT Sans Narrow", sans-serif',
                color: "#fff",
                margin: "36px 0 0",
                fontWeight: 500,
                lineHeight: 1.4,
                maxWidth: 560,
              }}
            >
              {aboutNetwork.subheadline}
              <span style={{ fontWeight: 700 }}>{aboutNetwork.subheadlineBold}</span>
            </h2>
          </div>
          <div style={{ flex: "0 1 380px", minWidth: 240, textAlign: "center" }}>
            <a
              href="https://www.insidesuccesstv.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={aboutNetwork.logoUrl}
                alt="Inside Success Network"
                style={{
                  maxWidth: "100%",
                  width: 331,
                  height: "auto",
                  display: "inline-block",
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))",
                }}
              />
            </a>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(9, 9, 9, 0.78)",
            borderRadius: 24,
            padding: "48px 80px",
            margin: "60px auto 0",
            maxWidth: 936,
          }}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: 21,
                fontFamily: '"PT Sans Narrow", sans-serif',
                fontWeight: 500,
                color: "#fff",
                margin: i === paragraphs.length - 1 ? 0 : "0 0 22px",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
