import React from "react";

const AboutPage = () => {
  const config = {
    primary: "#62B895",
    secondary: "#BEEFD0",
    dark: "#2d5a45",
    accent: "#4a7c59",
  };

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          background:
            "linear-gradient(180deg,#ffffff 0%,#f8fdf9 50%,#BEEFD0 100%)",
          padding: "96px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Left */}
          <div>
            <span
              style={{
                display: "inline-flex",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(98,184,149,.15)",
                color: config.primary,
                fontWeight: 500,
                fontSize: 14,
                marginBottom: 24,
              }}
            >
              🌱 Thương hiệu cây cảnh Việt Nam
            </span>

            <h1
              style={{
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1.2,
                color: config.dark,
              }}
            >
              Về Mộc Mơ <br />
              <span style={{ color: config.primary }}>Nơi Mầm Xanh Nở Hoa</span>
            </h1>

            <p style={{ marginTop: 24, fontSize: 18, color: config.accent }}>
              Mang không gian xanh vào mọi nhà, kết nối con người với thiên nhiên
              qua từng chậu cây nhỏ
            </p>
          </div>

          {/* Right Illustration */}
          <div style={{ textAlign: "center" }}>
            <img
              src="/plant-hero.svg"
              alt="Plant"
              style={{ maxWidth: 380, width: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section style={{ padding: "96px 24px", background: "#f4fff8" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: config.dark }}>
            Khởi nguồn từ tình yêu thiên nhiên
          </h2>

          <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.8, color: config.accent }}>
            Mộc Mơ ra đời từ một ước mơ giản dị: mang thiên nhiên đến gần hơn với
            cuộc sống bận rộn của mỗi người. Chúng tôi tin rằng mỗi chậu cây nhỏ
            không chỉ là vật trang trí, mà còn là người bạn đồng hành, mang lại
            năng lượng tích cực cho không gian sống.
          </p>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section style={{ padding: "96px 24px", background: "#ecfff4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 700, color: config.dark }}>
            Sứ mệnh & Giá trị cốt lõi
          </h2>

          <div
            style={{
              marginTop: 64,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 32,
            }}
          >
            {[
              {
                title: "Gieo Mầm Hạnh Phúc",
                text:
                  "Mỗi chậu cây mang theo niềm vui, giúp giảm stress và cân bằng cuộc sống.",
              },
              {
                title: "Bền Vững Xanh",
                text:
                  "Bao bì thân thiện môi trường, nguồn cây giống và quy trình bền vững.",
              },
              {
                title: "Kết Nối Tự Nhiên",
                text:
                  "Giúp bạn tạo nên góc xanh thư giãn và kết nối lại với thiên nhiên.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  padding: 40,
                  borderRadius: 24,
                  textAlign: "center",
                  border: `2px solid ${config.secondary}`,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: config.secondary,
                    margin: "0 auto 24px",
                  }}
                />
                <h3 style={{ fontSize: 20, fontWeight: 700, color: config.dark }}>
                  {item.title}
                </h3>
                <p style={{ marginTop: 16, color: config.accent }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section style={{ padding: "96px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: config.dark }}>
            Đội ngũ của chúng tôi
          </h2>

          <div
            style={{
              marginTop: 64,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: 48,
            }}
          >
            {[
              { name: "Minh Anh", role: "Founder & CEO" },
              { name: "Hoàng Long", role: "Head of Operations" },
              { name: "Thu Hà", role: "Plant Expert" },
              { name: "Đức Phong", role: "Customer Care" },
            ].map((m, i) => (
              <div key={i}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: config.secondary,
                    margin: "0 auto 16px",
                  }}
                />
                <h4 style={{ fontWeight: 700, color: config.dark }}>
                  {m.name}
                </h4>
                <p style={{ fontSize: 14, color: config.accent }}>
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section style={{ padding: "96px 24px", background: "#f7fff9" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: config.dark }}>
            Hơn cả một chậu cây, đó là một lối sống
          </h2>

          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 24,
            }}
          >
            {[
              "Sản phẩm chất lượng cao",
              "Hướng dẫn chi tiết",
              "Hỗ trợ tận tâm",
              "Cộng đồng xanh",
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#eefdf4",
                  padding: 32,
                  borderRadius: 20,
                }}
              >
                <p style={{ fontWeight: 500, color: config.dark }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        style={{
          background: config.primary,
          padding: "96px 24px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: 36, fontWeight: 700 }}>
          Sẵn sàng bắt đầu hành trình xanh?
        </h2>
        <p style={{ marginTop: 16, opacity: 0.9 }}>
          Hãy để Mộc Mơ đồng hành cùng bạn tạo nên không gian sống tràn đầy sức
          sống
        </p>

        <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center" }}>
          <button
            style={{
              background: "#fff",
              color: config.primary,
              padding: "14px 28px",
              borderRadius: 999,
              border: "none",
              fontWeight: 600,
            }}
          >
            🌱 Khám phá ngay
          </button>
          <button
            style={{
              background: "transparent",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 999,
              border: "2px solid #fff",
              fontWeight: 600,
            }}
          >
            💬 Liên hệ với chúng tôi
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
