import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/logo3.png';
import { Heart, Leaf, Users, Sprout, BookOpen, MessageCircle, Star } from 'lucide-react';


const AboutPage = () => {
  const config = {
    primary: "#62B895",
    secondary: "#BEEFD0",
    dark: "#2d5a45",
    accent: "#4a7c59",
  };

  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Quicksand', sans-serif" }}>
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

          <div style={{ textAlign: "center" }}>
            <img src={LogoImage} alt='Mộc Mơ' style={{ height: '300px', marginLeft: '1rem', borderRadius: '10px' }} />
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
                text: "Mỗi chậu cây mang theo niềm vui, giúp giảm stress và cân bằng cuộc sống.",
                icon: <Heart size={32} color={config.dark} />,
              },
              {
                title: "Bền Vững Xanh",
                text: "Bao bì thân thiện môi trường, nguồn cây giống và quy trình bền vững.",
                icon: <Leaf size={32} color={config.dark} />,
              },
              {
                title: "Kết Nối Tự Nhiên",
                text: "Giúp bạn tạo nên góc xanh thư giãn và kết nối lại với thiên nhiên.",
                icon: <Users size={32} color={config.dark} />,
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
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: config.secondary,
                    margin: "0 auto 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
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

      {/* ================= TEAM (Đã căn chỉnh 3 thành viên/hàng) ================= */}
      <section style={{ padding: "96px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: config.dark }}>
            Đội ngũ của chúng tôi
          </h2>

          <div
            style={{
              marginTop: 64,
              display: "grid",
              // Chỉnh thành 3 cột cố định trên màn hình lớn để 6 người chia đều 2 hàng
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "64px 32px", // Tăng khoảng cách hàng
            }}
          >
            {[
              { name: "Nhi", role: "Founder & CEO" },
              { name: "Hà", role: "Head of Operations" },
              { name: "Hải", role: "Plant Expert" },
              { name: "Hiếu", role: "Customer Care" },
              { name: "Đức Anh", role: "Customer Care" },
              { name: "Đạt", role: "Customer Care" },
            ].map((m, i) => (
              <div key={i} style={{ transition: "all 0.3s" }}>
                <div
                  style={{
                    width: 140, // Tăng kích thước avatar một chút cho thoáng
                    height: 140,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${config.secondary} 0%, #ffffff 100%)`,
                    margin: "0 auto 20px",
                    border: `3px solid ${config.secondary}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px"
                  }}
                >
                  {/* Có thể thay bằng hình ảnh thật sau này */}
                  👤
                </div>
                <h4 style={{ fontWeight: 700, color: config.dark, marginBottom: 8 }}>
                  {m.name}
                </h4>
                <div style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  background: "rgba(98,184,149,0.1)",
                  fontSize: 13,
                  color: config.primary,
                  fontWeight: 600
                }}>
                  {m.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS (Bản Sáng Tạo & Đồng Bộ) ================= */}
      <section style={{ padding: "100px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>

          <h2 style={{
            fontSize: 40,
            fontWeight: 700,
            color: config.dark,
            marginBottom: 64,
            fontFamily: "'Quicksand', sans-serif" // Trả về font đồng bộ
          }}>
            Hơn cả một chậu cây, đó là <span style={{ color: config.primary }}>lối sống xanh</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 30,
            }}
          >
            {[
              {
                t: "Sản phẩm chất lượng",
                d: "Tuyển chọn kỹ càng từng mầm xanh khỏe mạnh từ vườn ươm.",
                icon: <Star size={26} />,
                blob: "30% 70% 70% 30% / 30% 30% 70% 70%" // Hình dáng hữu cơ 1
              },
              {
                t: "Hướng dẫn chi tiết",
                d: "Cẩm nang chăm sóc từ A-Z, giúp bạn trở thành chuyên gia.",
                icon: <BookOpen size={26} />,
                blob: "50% 50% 33% 67% / 55% 27% 73% 45%" // Hình dáng hữu cơ 2
              },
              {
                t: "Hỗ trợ tận tâm",
                d: "Luôn đồng hành cùng bạn trong suốt quá trình cây trưởng thành.",
                icon: <MessageCircle size={26} />,
                blob: "30% 70% 37% 63% / 54% 30% 70% 46%" // Hình dáng hữu cơ 3
              },
              {
                t: "Cộng đồng xanh",
                d: "Kết nối và chia sẻ niềm đam mê cùng những người yêu thiên nhiên.",
                icon: <Sprout size={26} />,
                blob: "67% 33% 47% 53% / 37% 58% 42% 63%" // Hình dáng hữu cơ 4
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  padding: "40px 30px",
                  borderRadius: "30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: `1.5px solid #f0f7f4`,
                  boxShadow: "0 15px 35px rgba(82, 121, 111, 0.04)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.borderColor = config.primary;
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(98, 184, 149, 0.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#f0f7f4";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(82, 121, 111, 0.04)";
                }}
              >
                {/* Vòng tròn Icon Sáng tạo với hình dáng hữu cơ (Blob) */}
                <div style={{
                  width: 70,
                  height: 70,
                  borderRadius: item.blob, // Tạo hình dáng không đều
                  background: config.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: config.dark,
                  marginBottom: 24,
                  transition: "all 0.5s ease",
                }}>
                  {item.icon}
                </div>

                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: config.dark,
                  marginBottom: 12,
                  fontFamily: "'Quicksand', sans-serif"
                }}>
                  {item.t}
                </h3>

                <p style={{
                  fontSize: 15,
                  color: config.accent,
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {item.d}
                </p>

                {/* Trang trí nhỏ ở góc thẻ */}
                <div style={{
                  position: "absolute",
                  bottom: -10,
                  right: -10,
                  opacity: 0.1,
                  color: config.primary,
                  transform: "rotate(-15deg)"
                }}>
                  <Leaf size={60} fill="currentColor" />
                </div>
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
            onClick={() => navigate('/HomePage')}
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
            onClick={() => window.open('https://www.facebook.com/profile.php?id=61586796640505')}
          >
            💬 Liên hệ với chúng tôi
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
