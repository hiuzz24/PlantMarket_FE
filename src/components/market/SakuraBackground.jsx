import React from 'react';

/**
 * SpringPetals Component
 * @param {number} count - Số lượng cánh hoa (mặc định 20)
 * @param {string} color - Màu chủ đạo (mặc định hồng đào)
 */
const SpringPetals = ({ count = 20, color = "#ffcce5" }) => {
  // Tạo dữ liệu ngẫu nhiên cho từng cánh hoa ngay khi component render
  const petals = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100 + "%",           // Vị trí ngang ngẫu nhiên
    size: Math.random() * 12 + 8 + "px",       // Kích thước ngẫu nhiên
    delay: Math.random() * 10 + "s",           // Thời gian chờ ngẫu nhiên
    duration: Math.random() * 8 + 6 + "s",     // Tốc độ rơi ngẫu nhiên
    drift: Math.random() * 150 - 75 + "px",    // Độ lệch ngang khi gió thổi
    opacity: Math.random() * 0.5 + 0.3,        // Độ trong suốt ngẫu nhiên
  }));

  return (
    <div 
      className="spring-petals-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none', // Đảm bảo không cản trở việc click vào nút bấm
        zIndex: 1
      }}
    >
      <style>
        {`
          @keyframes petalFall {
            0% { 
              transform: translateY(-10vh) translateX(0) rotate(0deg); 
              opacity: 0; 
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
              transform: translateY(110vh) translateX(var(--drift)) rotate(720deg); 
              opacity: 0; 
            }
          }

          .petal {
            position: absolute;
            background: linear-gradient(45deg, ${color}, #ffb3d9);
            border-radius: 80% 0 85% 10%; /* Form dáng cánh hoa đào */
            animation: petalFall linear infinite;
            filter: blur(0.5px);
          }
        `}
      </style>

      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--drift': p.drift, // Biến CSS để tạo quỹ đạo riêng cho mỗi cánh
          }}
        />
      ))}
    </div>
  );
};

export default SpringPetals;