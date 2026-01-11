import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cartApi from '../../configs/CartApi';
import { toast, ToastContainer } from "react-toastify";
import CartItem from "../../components/market/CartItem";

export default function Cart() {
    const [cart, setCart] = useState(null);

    const hasItem = cart?.cartItems && cart?.cartItems?.length > 0;

    const SHIPPING_FEE = hasItem ? 30000 : 0;
    const subTotal = cart?.totalPrice || 0;
    const TOTAL_FEE = SHIPPING_FEE + subTotal;
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await cartApi.getCartByUser();
            console.log(res);

            setCart(res);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching cart';
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onUpdateQuantity = async (productId, quantity) => {
        const dataSend = {
            productId: productId,
            quantity: quantity
        }
        try {
            await cartApi.updateCart(dataSend);
            fetchData();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.message || "Error");
        }
    };
    const onRemove = async (productId) => {
        try {
            await cartApi.removeItem(productId);
            fetchData();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.message || "Error");
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Container className="py-5">
                <div
                    style={{ color: '#62B895', cursor: 'pointer', fontWeight: '600' }}
                    onClick={() => navigate('/HomePage')}
                    className="mb-4 d-inline-block"
                >
                    ← Continue Shopping
                </div>

                <h1 className="fw-bold mb-1" style={{ color: '#2F3E46' }}>Your Shopping Cart</h1>
                <p className="text-muted mb-5">{cart?.cartItems?.length || 0} items in your cart</p>

                <Row className="gx-5">
                    <Col lg={8}>
                        {cart?.cartItems?.map(item => (
                            <CartItem
                                key={item.cartItemId}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemove={onRemove}
                            />
                        ))}
                    </Col>

                    <Col lg={4}>
                        <div className="bg-white rounded-5 p-4 border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                            <h4 className="fw-bold mb-4" style={{ color: '#2F3E46' }}>Order Summary</h4>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted fs-5">Subtotal</span>
                                <span className="fw-bold fs-5 text-dark">
                                    {subTotal.toLocaleString('vi-VN')}đ
                                </span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                                <span className="text-muted fs-5">Shipping</span>
                                <span className="fw-bold fs-5 text-dark">
                                    {SHIPPING_FEE.toLocaleString('vi-VN')}đ
                                </span>
                            </div>

                            <div className="mb-4">
                                <label className="fw-bold mb-2 text-muted">Promo Code</label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        placeholder="Enter code"
                                        className="rounded-4 border-light bg-light"
                                    />
                                    <Button style={{ backgroundColor: '#2f855aff' }} className="rounded-3 px-3 border-0">
                                        Apply
                                    </Button>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="h4 fw-bold mb-0">Total</span>
                                <span className="h3 fw-bold mb-0" style={{ color: '#2f855aff' }}>
                                    {TOTAL_FEE.toLocaleString('vi-VN')}đ
                                </span>
                            </div>

                            <Button
                                className="w-100 py-3 rounded-4 fw-bold border-0 mb-3"
                                style={{ backgroundColor: '#62B895', fontSize: '1.1rem' }}
                                disabled={!hasItem}
                                onClick={() => navigate("/checkout")}
                            >
                                Proceed to Checkout
                            </Button>

                            {/* Trust Badge */}
                            <div className="text-center p-2 rounded-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <small className="text-muted">
                                    🔒 Secure checkout • Free returns within 7 days
                                </small>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}