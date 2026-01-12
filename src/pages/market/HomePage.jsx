import { useEffect, useRef, useState } from "react";
import ProductCard from "../../components/market/ProductCard";
import productApi from "../../configs/ProductApi";
import { Button, Col, Container, Row } from "react-bootstrap";
import Banner from "../../assets/banner.png"
import { HouseHeart, Leaf, UserStar } from "lucide-react";
import ProductDetailModal from "../../components/market/ProductDetailModal";
import { ToastContainer } from "react-toastify";

export default function HomePage() {
    const [listProduct, setListProduct] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);
    const [modalShow, setModalShow] = useState(false);
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

    return (
        <>
            <Container fluid className="w-screen mb-5"
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
            </Container>
            <Container fluid ref={featureRef}>
                <h1 className="d-flex justify-content-center align-items-center mb-5" style={{
                    color: '#2F3E46',
                    fontWeight: 'bold'
                }}>
                    Featured Plant Kits
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
                    Why Choose PlantKit?
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
                                Easy-to-Follow Instructions
                            </h3>
                            <h6 style={{
                                color: '#5c7e68ff',
                                width: '390px',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>
                                Step-by-step guides make growing your plants simple and enjoyable, even for beginners.
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
                                Easy-to-Follow Instructions
                            </h3>
                            <h6 style={{
                                color: '#5c7e68ff',
                                width: '390px',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>
                                Step-by-step guides make growing your plants simple and enjoyable, even for beginners.
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
                                Easy-to-Follow Instructions
                            </h3>
                            <h6 style={{
                                color: '#5c7e68ff',
                                width: '390px',
                                fontSize: '18px',
                                textAlign: 'center'
                            }}>
                                Step-by-step guides make growing your plants simple and enjoyable, even for beginners.
                            </h6>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}