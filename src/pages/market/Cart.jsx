import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cartApi from '../../configs/CartApi';
import { toast, ToastContainer } from "react-toastify";
import CartItem from "../../components/market/CartItem";
import { ArrowLeft, ShieldCheck, RefreshCcw } from "lucide-react"; // Thêm icon cho sinh động

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
            setCart(res);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Không thể tải dữ liệu giỏ hàng';
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
            toast.error(error.response?.data?.message || "Lỗi cập nhật số lượng");
        }
    };

    const onRemove = async (productId) => {
        try {
            await cartApi.removeItem(productId);
            fetchData();
            toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
        } catch (error) {
            toast.error(error.response?.data?.message || "Lỗi khi xóa sản phẩm");
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Container className="py-5">
                {/* Nút quay lại */}
                <div
                    style={{ color: '#62B895', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => navigate('/HomePage')}
                    className="mb-4 d-inline-block"
                >
                    <ArrowLeft size={18} /> Tiếp tục mua sắm
                </div>

                <h1 className="fw-bold mb-1" style={{ color: '#2F3E46' }}>Giỏ hàng của bạn</h1>
                <p className="text-muted mb-5">Đang có {cart?.cartItems?.length || 0} sản phẩm trong giỏ</p>

                <Row className="gx-5">
                    {/* Danh sách sản phẩm */}
                    <Col lg={8}>
                        {hasItem ? (
                            cart?.cartItems?.map(item => (
                                <CartItem
                                    key={item.cartItemId}
                                    item={item}
                                    onUpdateQuantity={onUpdateQuantity}
                                    onRemove={onRemove}
                                />
                            ))
                        ) : (
                            <div className="text-center py-5 bg-white rounded-5 shadow-sm">
                                <p className="text-muted fs-5">Giỏ hàng của bạn đang trống</p>
                                <Button 
                                    style={{ backgroundColor: '#62B895', border: 'none' }}
                                    className="rounded-4 px-4 py-2"
                                    onClick={() => navigate('/ShopKit')}
                                >
                                    Đến cửa hàng ngay
                                </Button>
                            </div>
                        )}
                    </Col>

                    {/* Tóm tắt đơn hàng */}
                    <Col lg={4}>
                        <div className="bg-white rounded-5 p-4 border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
                            <h4 className="fw-bold mb-4" style={{ color: '#2F3E46' }}>Tóm tắt đơn hàng</h4>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted fs-5">Tạm tính</span>
                                <span className="fw-bold fs-5 text-dark">
                                    {subTotal.toLocaleString('vi-VN')}đ
                                </span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                                <span className="text-muted fs-5">Phí vận chuyển</span>
                                <span className="fw-bold fs-5 text-dark">
                                    {SHIPPING_FEE.toLocaleString('vi-VN')}đ
                                </span>
                            </div>

                            {/* Mã giảm giá */}
                            <div className="mb-4">
                                <label className="fw-bold mb-2 text-muted">Mã giảm giá (Promo Code)</label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        placeholder="Nhập mã..."
                                        className="rounded-4 border-light bg-light"
                                    />
                                    <Button style={{ backgroundColor: '#2f855aff' }} className="rounded-3 px-3 border-0">
                                        Áp dụng
                                    </Button>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="h4 fw-bold mb-0">Tổng cộng</span>
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
                                Tiến hành thanh toán
                            </Button>

                            {/* Cam kết bảo mật */}
                            <div className="p-3 rounded-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    <ShieldCheck size={16} className="text-success" />
                                    <small className="text-dark fw-600">Thanh toán bảo mật 100%</small>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <RefreshCcw size={16} className="text-primary" />
                                    <small className="text-muted">Miễn phí đổi trả trong 7 ngày</small>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer position="bottom-right" />
        </div>
    );
}