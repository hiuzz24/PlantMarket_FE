import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import cartApi from "../../configs/CartApi";
import { toast } from "react-toastify";

export default function ProductDetailModal({ show, onHide, product }) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const addToCart = async (p) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('you must login to add product to cart!');
            return;
        }

        const decode = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decode && decode.exp < currentTime) {
            localStorage.removeItem('token');
            toast.error('you must login to add product to cart!');
            return;
        }

        const dataSend = {
            productId: p.productId,
            quantity: quantity
        };

        if (quantity > p.stockQuantity) {
            toast.error(`Only ${p.stockQuantity} products left in stock.`);
            return;
        }

        try {
            const res = await cartApi.addToCart(dataSend);
            toast.success(res?.message);
            setQuantity(1);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.message || 'Error when add to cart!');
        }

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            onExited={() => setQuantity(1)}
            size="lg"
            centered
            contentClassName="rounded-5 border-0 shadow-lg"
        >
            <Modal.Header closeButton className="border-0 pb-0" />

            <Modal.Body className="p-4 pt-0">
                {product ? (
                    <Row className="align-items-start">
                        <Col md={6} className="text-center rounded-5 p-5 d-flex align-items-center justify-content-center"
                            style={{ backgroundColor: '#F8FAF6', minHeight: '400px' }}>
                            <img
                                src={`http://localhost:8080${product.imageUrl}`}
                                alt={product.name}
                                style={{ width: '85%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Col>

                        <Col md={6} className="ps-md-5 d-flex flex-column gap-3">
                            <div className="d-flex gap-2">
                                {product.isBestSeller && (
                                    <Badge pill bg="warning" text="dark" className="px-3 py-2" style={{ fontSize: '14px' }}>
                                        ⭐ Best Seller
                                    </Badge>
                                )}
                                <Badge pill bg="" className="px-3 py-2"
                                    style={{ fontSize: '14px', backgroundColor: '#e3f3e9ff', color: '#2f855a' }}>
                                    🌿 Difficulty: {product.difficultyLevel}
                                </Badge>
                            </div>

                            <h1 className="fw-bold mt-1" style={{ color: '#2F3E46', fontSize: '36px' }}>
                                {product.name}
                            </h1>

                            <h2 style={{ color: '#2f855aff', fontWeight: 'bold', fontSize: '42px' }}>
                                {product.price?.toLocaleString('vi-VN')}
                                <span style={{ fontSize: '0.6em', verticalAlign: 'middle', marginLeft: '4px' }}>đ</span>
                            </h2>

                            <p style={{ color: '#6c757d', fontSize: '15px', lineHeight: '1.6' }}>
                                {product.description}
                            </p>

                            <div style={{ fontSize: '14px', color: '#6c757d' }}>
                                <div><b>Category:</b> {product.category?.name || "Indoor Plants"}</div>
                            </div>

                            <div className="p-3 rounded-4" style={{ backgroundColor: '#e3f3e9ff', fontSize: '14px' }}>
                                <b style={{ color: '#2F3E46' }}>Tình trạng:</b> {product.stockQuantity > 0 ? `Còn ${product.stockQuantity} sản phẩm` : "Hết hàng"}
                            </div>

                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="fw-bold" style={{ color: '#2F3E46' }}>Số lượng:</span>
                                    <div className="d-flex align-items-center border rounded-pill px-2 py-1 bg-white shadow-sm">
                                        <Button variant="link" onClick={handleDecrease} className="text-success text-decoration-none fw-bold p-0 px-2" style={{ fontSize: '18px' }}>−</Button>
                                        <span className="px-2 fw-bold" style={{ minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                                        <Button variant="link" onClick={handleIncrease} disabled={quantity >= product.stockQuantity} className="text-success text-decoration-none fw-bold p-0 px-2" style={{ fontSize: '18px' }}>+</Button>
                                    </div>
                                </div>

                                <Button
                                    className="p-3 rounded-4 border-0 shadow-sm flex-grow-1 ms-3"
                                    style={{ backgroundColor: '#62B895', fontWeight: 'bold', fontSize: '17px', transition: 'all 0.6s ease' }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0px 2px 15px rgba(0,0,0,0.3)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    onClick={() => addToCart(product)}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <div className="text-center p-5 font-italic">Đang tải thông tin sản phẩm...</div>
                )}
            </Modal.Body>
        </Modal>
    );
}