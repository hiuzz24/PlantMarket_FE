import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cartApi from "../../configs/CartApi";
import orderApi from "../../configs/OrderApi";
import { useNavigate } from "react-router-dom";



export default function CheckOut() {
    const [cart, setCart] = useState(null);
    const SHIPPING_FEE = 30000;
    const subTotal = cart?.totalPrice || 0;
    const TOTAL_FEE = SHIPPING_FEE + subTotal;
    const navigate = useNavigate();

    const checkoutSchema = z.object({
        fullName: z.string()
            .min(1, { message: 'Please input full name' }),
        phoneNumber: z.string()
            .min(1, { message: 'Please input phone number' })
            .length(10, { message: 'Phone number must be exactly 10 digits' })
            .regex(/^[0-9]+$/, { message: 'Phone only contain number' }),
        emailAddress: z.string()
            .email({ message: 'Please input true form of email' })
            .optional()
            .or(z.literal('')),
        shippingAddress: z.string()
            .min(1, { message: 'Please input address' }),
        paymentMethod: z.enum(["COD", "PAYOS"]),
        notes: z.string().optional()
    })

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: { paymentMethod: "PAYOS", notes: "" }
    });

    const selectedPayment = watch("paymentMethod");

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

    const onPlaceOrder = async (data) => {
        try {
            const res = await orderApi.createOrder(data);

            if (data.paymentMethod === "PAYOS" && res.paymentUrl) {
                window.location.href = res.paymentUrl
            } else {
                navigate('/HomePage');
                toast.success("Order Successful!");
            }
        } catch (error) {
            toast.error(error.response?.message || "Something went wrong");
        }
    }

    return (
        <div style={{ backgroundColor: '#e7efecff', minHeight: '100vh', paddingBottom: '50px' }}>
            <Container fluid="xl" className="py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold" style={{ fontSize: '3.5rem', color: '#2F3E46' }}>Checkout</h1>
                    <p style={{ color: '#2f855aff', fontSize: '1.2rem' }}>Complete your order and bring nature home</p>
                </div>

                <Form onSubmit={handleSubmit(onPlaceOrder)}>
                    <Row>
                        <Col md={7}>
                            <Card className="border-0 rounded-5 shadow-sm p-4 ">
                                <h2 className="mb-4">Shipping Information</h2>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Full Name *</Form.Label>
                                    <Form.Control
                                        {...register("fullName")}
                                        isInvalid={!!errors.fullName}
                                        placeholder="Input your full name"
                                        className="py-3 rounded-4 border-0 bg-light"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.fullName?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Phone Number *</Form.Label>
                                    <Form.Control
                                        {...register("phoneNumber")}
                                        isInvalid={!!errors.phoneNumber}
                                        placeholder="Input your phone number"
                                        className="py-3 rounded-4 border-0 bg-light"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.phoneNumber?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                                    <Form.Control
                                        {...register("emailAddress")}
                                        isInvalid={!!errors.emailAddress}
                                        placeholder="Input your email"
                                        className="border-0 rounded-4 py-3 bg-light"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.emailAddress?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Delivery Address *</Form.Label>
                                    <Form.Control
                                        {...register("shippingAddress")}
                                        isInvalid={!!errors.shippingAddress}
                                        placeholder="Input your delivery address"
                                        as={"textarea"} rows={3}
                                        className="border-0 rounded-4 py-3 bg-light"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.shippingAddress?.message}</Form.Control.Feedback>
                                </Form.Group>
                                <div className="fw-semibold mb-2">Payment Method *</div>
                                {/* VNPAY */}
                                <div
                                    className={`d-flex align-items-center p-4 mb-3 border-2 rounded-4 cursor-pointer transition-all ${selectedPayment === 'PAYOS' ? 'border-success bg-light-success' : 'border-light bg-white'}`}
                                    onClick={() => setValue("paymentMethod", "PAYOS")}
                                    style={{ cursor: 'pointer', border: '2px solid' }}
                                >
                                    <div className="bg-light p-3 rounded-3 me-3" style={{ fontSize: '1.5rem' }}>💳</div>
                                    <div className="flex-grow-1">
                                        <div className="fw-bold fs-5">PAYOS Gateway</div>
                                        <small className="text-muted">Payment via QR code, domestic or international card.</small>
                                    </div>
                                    <Form.Check type="radio" checked={selectedPayment === 'PAYOS'} readOnly />
                                </div>
                                {/* COD */}
                                <div
                                    className={`d-flex align-items-center p-4 mb-4 border-2 rounded-4 cursor-pointer transition-all ${selectedPayment === 'COD' ? 'border-success bg-light-success' : 'border-light bg-white'}`}
                                    onClick={() => setValue("paymentMethod", "COD")}
                                    style={{ cursor: 'pointer', border: '2px solid' }}
                                >
                                    <div className="bg-light p-3 rounded-3 me-3" style={{ fontSize: '1.5rem' }}>🧧</div>
                                    <div className="flex-grow-1">
                                        <div className="fw-bold fs-5">Payment upon delivery (COD)</div>
                                        <small className="text-muted">Inspect the goods before payment.</small>
                                    </div>
                                    <Form.Check type="radio" checked={selectedPayment === 'COD'} readOnly />
                                </div>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Notes</Form.Label>
                                    <Form.Control
                                        {...register("notes")}
                                        isInvalid={!!errors.notes}
                                        placeholder="Input your notes"
                                        as={"textarea"} rows={2}
                                        className="border-0 rounded-4 py-3 bg-light"
                                    />
                                    <Form.Control.Feedback type="invalid">${errors.notes?.message}</Form.Control.Feedback>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-100 py-3 fw-bold rounded-pill border-0 shadow-sm"
                                    style={{ backgroundColor: '#62B895', fontSize: '1.3rem' }}
                                >
                                    Comple Order
                                </Button>
                            </Card>
                        </Col>
                        <Col md={5}>
                            <Card className="border-0 shadow-sm p-4 sticky-top" style={{ borderRadius: '30px', top: '30px' }}>
                                <h3 className="fw-bold mb-4" style={{ color: '#2F3E46' }}>Order Summary</h3>

                                <div className="mb-3 overflow-auto" style={{ maxHeight: '400px' }}>
                                    {cart?.cartItems?.map(item => (
                                        <div key={item.cartItemId} className="d-flex align-items-center mb-4">
                                            <div className="bg-light rounded-4 p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                                <img src={`http://localhost:8080${item.imageUrl}`} fluid className="rounded-3"
                                                    style={{ width: '65px', height: '70px', objectFit: 'contain' }}
                                                />
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="fw-bold mb-1 text-truncate" style={{ maxWidth: '150px' }}>{item.productName}</h6>
                                                <div className="text-success small fw-bold mb-2">Quantity: {item.quantity}</div>
                                                <div className="fw-bold">{(item.price).toLocaleString('vi-VN')}đ</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <hr className="my-2 opacity-50" />

                                <div className="fs-5">
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="text-muted">SubTotal</span>
                                        <span className="fw-bold">{subTotal.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="text-muted">Shipping</span>
                                        <span className="fw-bold">{SHIPPING_FEE.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center pt-3 border-top mb-4">
                                    <span className="h3 fw-bold mb-0">Total</span>
                                    <span className="h2 fw-bold mb-0" style={{ color: '#2f855aff' }}>{TOTAL_FEE.toLocaleString('vi-VN')}đ</span>
                                </div>

                                <div className="p-4 rounded-4" style={{ backgroundColor: '#f0fff4', border: '1px dashed #2f855aff' }}>
                                    <div className="d-flex align-items-center text-success mb-2 small">
                                        <span className="me-2">🛡️</span> Secure checkout
                                    </div>
                                    <div className="d-flex align-items-center text-success small">
                                        <span className="me-2">🚚</span> Fast delivery within 2-3 days
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}