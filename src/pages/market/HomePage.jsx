import { useEffect, useRef, useState } from "react";
import ProductCard from "../../components/market/ProductCard";
import productApi from "../../configs/ProductApi";
import { Button, Col, Container, Row } from "react-bootstrap";
import Banner from "../../assets/banner.png"
import { HouseHeart, Leaf, Sprout, UserStar } from "lucide-react";
import ChatBot from "../../components/market/ChatBot";

export default function HomePage() {
    const [listProduct, setListProduct] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);
    const featureRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await productApi.getAllProduct(page, size);
                console.log("data", res.content);

                setListProduct(res?.content ?? []);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [page, size]);

    const injectStyles = (
        <style>
            {`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                @keyframes flowerFall {
                    0% { transform: translate(0, -10px) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translate(100px, 600px) rotate(360deg); opacity: 0; }
                }
                .banner-img-animate {
                    animation: float 5s ease-in-out infinite;
                }
                .flower {
                    position: absolute;
                    background-color: #ffcce5;
                    border-radius: 10px 0 10px 0;
                    pointer-events: none;
                    animation: flowerFall 8s linear infinite;
                    z-index: 1;
                }
            `}
        </style>
    );

    return (
        <div style={{ overflowX: 'hidden' }}>
            {injectStyles}
            <ChatBot />
            <Container fluid className="mb-5 position-relative"
                style={{
                    backgroundColor: '#bef1d0ff',
                    height: '650px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 100px'
                }}
            >
                {/* Các cánh hoa đào rơi tạo không khí Xuân */}
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flower" style={{
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}%`,
                        width: `${Math.random() * 15 + 5}px`,
                        height: `${Math.random() * 15 + 5}px`,
                        animationDelay: `${Math.random() * 5}s`,
                        opacity: 0.6
                    }} />
                ))}

                <Row className="w-100 align-items-center">
                    <Col md={7} className="d-flex flex-column gap-4 text-start">
                        {/* Badge thông điệp mới */}
                        <div className="d-flex align-items-center gap-2"
                            style={{
                                color: '#438e70',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                fontSize: '14px'
                            }}>
                            <Leaf size={20} /> <span>HÀNH TRÌNH SỐNG XANH</span>
                        </div>

                        <h1 style={{
                            lineHeight: '1.2',
                            fontWeight: '800',
                            fontSize: '64px',
                            color: '#2F3E46',
                            maxWidth: '750px',
                            fontFamily: "'Playfair Display', serif"
                        }}>
                            Gieo Mầm Nhỏ <br />
                            <span style={{ color: '#62B895' }}>Nở Tương Lai Xanh</span>
                        </h1>

                        {/* Đoạn mô tả giải thích lý do chọn Mộc Mơ */}
                        <div style={{ maxWidth: '580px' }}>
                            <h5 style={{
                                fontFamily: "'Quicksand', sans-serif",
                                color: '#4A5D55',
                                fontSize: '19px',
                                lineHeight: '1.8',
                                marginBottom: '15px'
                            }}>
                                Mộc Mơ tin rằng sống xanh không cần sự hoàn hảo hay không gian rộng lớn.
                                Chỉ cần một trải nghiệm đủ <strong>nhẹ nhàng</strong> để ai cũng có thể bắt đầu.
                            </h5>
                            <p style={{ color: '#7A8B83', fontSize: '16px', fontStyle: 'italic' }}>
                                "Từ một hạt giống nhỏ, tình yêu thiên nhiên sẽ lớn dần lên một cách tự nhiên."
                            </p>
                        </div>

                        {/* Nút bấm chuyển sang hành động khám phá */}
                        <Button className="p-3 rounded-5" style={{
                            backgroundColor: '#62B895',
                            width: '260px',
                            fontSize: '17px',
                            fontWeight: '700',
                            border: 'none',
                            boxShadow: '0 10px 25px rgba(98, 184, 149, 0.25)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.backgroundColor = '#438e70';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.backgroundColor = '#62B895';
                            }}
                            onClick={() => featureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        >
                            Bắt đầu ngay <Sprout size={20} />
                        </Button>
                    </Col>

                    <Col md={5} className="d-flex justify-content-center position-relative">
                        {/* Hiệu ứng đổ bóng mờ ảo cho Banner thêm thanh thoát */}
                        <div style={{
                            position: 'absolute',
                            width: '400px',
                            height: '400px',
                            backgroundColor: 'rgba(98, 184, 149, 0.15)',
                            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', // Hình khối hữu cơ (Blob)
                            filter: 'blur(50px)',
                            zIndex: 0,
                            animation: 'blob-animate 10s infinite alternate'
                        }}></div>

                        <img
                            src={Banner}
                            className="banner-img-animate"
                            style={{
                                width: '100%',
                                maxWidth: '450px',
                                height: 'auto',
                                zIndex: 2,
                                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.08))'
                            }}
                            alt="Mộc Mơ Kit"
                        />
                    </Col>
                </Row>
            </Container>
            <Container fluid ref={featureRef}>
                <h1 className="d-flex justify-content-center align-items-center mb-5" style={{
                    color: '#2F3E46',
                    fontWeight: 'bold'
                }}>
                    Sản Phẩm "Lộc Xuân" Nổi Bật
                </h1>
                <div >
                    <Row className="justify-content-center">
                        {listProduct
                            .filter(p => p.isBestSeller)
                            .map(p => (
                                <Col md={3} key={p.productId} className="mb-4" style={{ cursor: 'pointer' }}>
                                    <ProductCard product={p} />
                                </Col>
                            ))}
                    </Row>
                </div>
            </Container>
            <Container fluid className="mb-5 mt-5 p-5 rounded-5" style={{ backgroundColor: '#e3f3e9ff', width: '1600px' }}>
                <h1 className="d-flex justify-content-center align-items-center mb-5" style={{
                    color: '#2F3E46',
                    fontWeight: 'bold'
                }}>
                    Tại sao chọn PlantKit?
                </h1>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col className="d-flex flex-column justify-content-center align-items-center gap-4" md={4}
                        style={{
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <HouseHeart style={{
                            width: '90px',
                            height: '90px',
                            backgroundColor: '#bef1d0ff',
                            padding: '25px',
                            borderRadius: '64px'
                        }} />
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                            <h3 style={{
                                color: '#2F3E46'
                            }}>
                                Dễ Dàng Chăm Sóc
                            </h3>
                            <h6 style={{
                                color: '#5c7e68ff',
                                width: '390px',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>
                                Hướng dẫn chi tiết từng bước, giúp cây luôn xanh tươi trong mọi điều kiện.
                            </h6>
                        </div>

                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center gap-4" md={4}
                        style={{
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <Leaf style={{
                            width: '90px',
                            height: '90px',
                            backgroundColor: '#bef1d0ff',
                            padding: '25px',
                            borderRadius: '64px'
                        }} />
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                            <h3 style={{
                                color: '#2F3E46'
                            }}>
                                Bền Vững & Hữu Cơ
                            </h3>
                            <h6 style={{
                                color: '#5c7e68ff',
                                width: '390px',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>
                                Chúng tôi sử dụng vật liệu thân thiện với môi trường, an toàn cho sức khỏe.
                            </h6>
                        </div>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center gap-4" md={4}
                        style={{
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <UserStar style={{
                            width: '90px',
                            height: '90px',
                            backgroundColor: '#bef1d0ff',
                            padding: '25px',
                            borderRadius: '64px'
                        }} />
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                            <h3 style={{
                                color: '#2F3E46'
                            }}>
                                Hỗ Trợ Tận Tâm
                            </h3>
                            <h6 style={{
                                color: '#5c7e68ff',
                                width: '390px',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>
                                Đội ngũ chuyên gia luôn sẵn sàng tư vấn kỹ thuật trồng cây 24/7.
                            </h6>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}