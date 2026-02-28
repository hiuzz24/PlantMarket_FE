import { useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import authApi from "../../configs/AuthApi";
import RegisterGoogle from "./RegisterGoogle";
import { FaLeaf } from 'react-icons/fa';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authApi.login(email, password);
            handleLoginSuccess(res?.accessToken);
        } catch (error) {
            handleLoginError(error);
        }
    }

    const handleLoginSuccess = (token) => {
        const decoded = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({
            name: decoded.fullname,
            role: decoded.role
        }));

        if (decoded.role === 'ROLE_ADMIN') {
            navigate("/Admin");
        } else {
            navigate("/HomePage");
        }
        toast.success("Chào mừng bạn đến với Mộc Mơ!");
    };

    const handleLoginError = (error) => {
        const errorMessage = error.response?.data?.message || "Đăng nhập thất bại, vui lòng kiểm tra lại.";
        toast.error(errorMessage);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Thêm CSS inline cho nhanh hoặc đưa vào file .css riêng */}
            <style dangerousSetInnerHTML={{
                __html: `
                .login-page {
                    background-color: #f0f7f4; /* Màu nền xanh nhạt */
                    background-image: url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000'); /* Ảnh nền rừng cây mờ */
                    background-size: cover;
                    background-position: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                .login-card {
                    border-radius: 20px;
                    border: none;
                    background-color: rgba(255, 255, 255, 0.9); /* Nền trắng trong suốt */
                    box-shadow: 0 10px 30px rgba(98, 184, 149, 0.2); /* Đổ bóng màu xanh lá */
                }
                .brand-icon {
                    color: #62B895; /* Màu xanh lá chủ đạo của Mộc Mơ */
                    font-size: 2.5rem;
                }
                .brand-name {
                    color: #2d3436;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                }
                .btn-success-mocmo {
                    background-color: #62B895;
                    border: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 10px;
                }
                .btn-success-mocmo:hover {
                    background-color: #4da381;
                }
                .form-label {
                    color: #636e72;
                    font-weight: 500;
                }
                .divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    color: #b2bec3;
                    margin: 20px 0;
                }
                .divider::before, .divider::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #dfe6e9;
                }
                .divider:not(:empty)::before {
                    margin-right: .5em;
                }
                .divider:not(:empty)::after {
                    margin-left: .5em;
                }
            `}} />

            <Container fluid className="login-page d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Row className="w-100">
                    <Col lg={4} md={6} className="mx-auto">
                        <Card className="login-card p-4 p-md-5">
                            <Card.Body>
                                <div className="text-center mb-4">
                                    <FaLeaf className="brand-icon mb-2" />
                                    <h2 className="brand-name">Vườn Mộc Mơ</h2>
                                    <p className="text-muted small">Khơi nguồn sức sống xanh từ chậu cây nhỏ</p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email của bạn</Form.Label>
                                        <Form.Control type="email" placeholder="ví dụ: hoa@mocmo.vn"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="rounded-3"
                                            required
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control type="password" placeholder="Mật khẩu của bạn"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="rounded-3"
                                            required
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button variant="success" type="submit" className="w-100 btn-success-mocmo mb-3 rounded-pill shadow-sm">
                                        Đăng nhập ngay
                                    </Button>
                                </Form>

                                <div className="divider">Hoặc nhanh hơn qua</div>

                                {/* Tích hợp Component Đăng nhập Google vào đây */}
                                <RegisterGoogle
                                    onLoginSuccess={handleLoginSuccess}
                                    onLoginError={handleLoginError}
                                />

                                <div className="text-center mt-4 small text-muted">
                                    Bạn chưa có tài khoản? <Link to="/Register" style={{ color: '#62B895', fontWeight: 600, textDecoration: 'none' }}>Đăng ký ngay</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}