import { Badge, Button, Card, Row } from "react-bootstrap";
import cartApi from '../../configs/CartApi';
import { toast } from "react-toastify";
import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import { jwtDecode } from "jwt-decode";

export default function ProductCard({ product }) {
    const [modalShow, setModalShow] = useState(false);

    const addToCart = async (p) => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('you must login to add product to cart!');
            return;
        }

        const decode = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decode.exp && decode.exp < currentTime) {
            localStorage.removeItem('token');
            toast.error('you must login to add product to cart');
            return;
        }

        const dataSend = {
            productId: p.productId,
            quantity: 1,
        };
        try {
            const res = await cartApi.addToCart(dataSend);
            toast.success(res.message);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.log(error);
            toast.error(error.response?.message || 'error when add to cart');
        }

    }

    return (
        <>
            <Card className="rounded-5 m-3 h-100 d-flex flex-column"
                style={{
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0,0,0,0.2)';

                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => { setModalShow(true) }}
            >
                <Card.Body className="rounded-top-5 d-flex flex-column gap-3" style={{ backgroundColor: '#F8FAF6' }}>
                    <div className="d-flex">
                        <Badge pill className="p-3 shadow-sm" bg="light"
                            style={{
                                width: 'fit-content',
                                color: '#52796F',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                zIndex: 10
                            }}>
                            {product.isBestSeller ? "★ Best Seller" : "🌿 Organize"}
                        </Badge>
                        <Badge pill className="p-3 shadow-sm ms-auto" bg=""
                            style={{
                                width: 'fit-content',
                                backgroundColor: '#87A28E',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                zIndex: 10
                            }}>
                            {product.stockQuantity > 0 ? "✓ In Stock" : "X Out Stock"}
                        </Badge>
                    </div>
                    <div style={{
                        height: '400px',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: 'inherit' // Để bo góc theo Card.Body nếu cần
                    }}>
                        <Card.Img
                            src={`${product.imageUrl}`}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '100%',     // Chiếm hết 400px của div bao ngoài
                                objectFit: 'cover',  // Cắt ảnh thừa, không làm méo ảnh
                                objectPosition: 'center',
                                display: 'block'
                            }}
                        />
                    </div>

                </Card.Body>
                <Card.Body className="rounded-bottom-5 mt-3" style={{ backgroundColor: 'white' }}>
                    <Card.Title
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textAlign: 'center'
                        }}
                    >{product.name}</Card.Title>
                    <Badge className="p-3 d-flex justify-content-center align-items-center mx-auto" bg=""
                        style={{
                            width: 'fit-content',
                            backgroundColor: '#f8faf9ff',
                            color: '#87A28E',
                            fontWeight: 'bold',
                            fontSize: '13px'

                        }}
                    >
                        {product.difficultyLevel} 🌿
                    </Badge>
                    <Card.Text
                        style={{
                            color: '#748d7bff',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textAlign: 'center'
                        }}
                    >
                        {product.description}
                    </Card.Text>
                    <Card.Title className="d-flex justify-content-center align-items-center"
                        style={{
                            color: '#5d8066ff',
                            fontWeight: 'bolder',
                            fontSize: '23px'
                        }}
                    >
                        {product.price.toLocaleString('vi-VN')}
                        <span style={{ fontSize: '0.6em', verticalAlign: 'super', marginLeft: '4px' }}>đ</span>
                    </Card.Title>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button className="d-flex justify-content-center align-items-center mt-4 p-3 rounded-4"
                            style={{
                                backgroundColor: '#87A28E',
                                width: '270px',
                                fontSize: '19px',
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
                            onClick={(e) => { addToCart(product), e.stopPropagation() }}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <ProductDetailModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
            />
        </>
    );
}
