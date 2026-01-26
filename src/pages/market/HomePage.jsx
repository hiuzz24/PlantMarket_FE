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
        <div style={{ overflowX: 'hidden'}}>
            {injectStyles}
            <ChatBot />
            {/* <Container fluid className="w-screen mb-5"
                style={{
                    backgroundColor: '#bef1d0ff',
                    height: '620px'
                }}
            >
                <Row className="d-flex justify-content-between align-items-center" style={{ padding: '120px' }}>
                    <Col md={7} className="d-flex flex-column gap-5">
                        <h1 style={{
                            width: '800px',
                            lineHeight: '65px',
                            fontWeight: 'bold',
                            fontSize: '75px',
                            color: '#2F3E46'
                        }}>
                            Grow Fresh Herbs at Home
                        </h1>
                        <h5 style={{
                            width: '600px',
                            fontFamily: 'Poppins, sans-serif',
                            color: '#2F3E46',
                            fontSize: '23px'
                        }}>
                            Discover our curated collection of easy-to-grow plant kits. Perfect for beginners and seasoned gardeners alike.
                        </h5>
                        <Button className="p-3 rounded-5" style={{
                            backgroundColor: '#62B895',
                            width: '220px',
                            height: 'fit-content',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            border: 'none',
                            transition: 'all 0.6s ease'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0px 2px 15px rgba(0,0,0,0.3)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            onClick={() => {
                                featureRef.current?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                });
                            }}
                        >
                            Shop Best Seller
                        </Button>
                    </Col>
                    <Col md={5}>
                        <img src={Banner} style={{
                            width: '350px',
                            height: '480px'
                        }}></img>
                    </Col>
                </Row>
            </Container> */}
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
                        <div className="d-flex align-items-center gap-2" style={{ color: '#438e70', fontWeight: 'bold' }}>
                            <Sprout size={24} /> <span>MỪNG XUÂN ẤT TỴ 2025</span>
                        </div>
                        <h1 style={{
                            lineHeight: '80px',
                            fontWeight: '850',
                            fontSize: '70px',
                            color: '#2F3E46',
                            maxWidth: '800px'
                        }}>
                            Khai Xuân Như Ý <br />
                            <span style={{ color: '#438e70' }}>Gieo Mầm May Mắn</span>
                        </h1>
                        <h5 style={{
                            maxWidth: '550px',
                            fontFamily: 'Poppins, sans-serif',
                            color: '#4A5D55',
                            fontSize: '20px',
                            lineHeight: '1.6'
                        }}>
                            Đón không khí Tết trong lành với bộ sưu tập cây mầm tươi mới. Khởi đầu một năm xanh tươi, an khang và thịnh vượng.
                        </h5>
                        <Button className="p-3 rounded-5" style={{
                            backgroundColor: '#62B895',
                            width: '240px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            border: 'none',
                            boxShadow: '0 10px 20px rgba(98, 184, 149, 0.3)',
                            transition: 'all 0.4s ease'
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            onClick={() => featureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        >
                            Hái Lộc Đầu Năm
                        </Button>
                    </Col>

                    <Col md={5} className="d-flex justify-content-center position-relative">
                        <div style={{
                            position: 'absolute',
                            width: '450px',
                            height: '450px',
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            borderRadius: '50%',
                            filter: 'blur(40px)',
                            zIndex: 0
                        }}></div>

                        <img
                            src={Banner}
                            className="banner-img-animate"
                            style={{
                                width: '400px',
                                height: 'auto',
                                zIndex: 2,
                                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))'
                            }}
                            alt="Spring Kit"
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