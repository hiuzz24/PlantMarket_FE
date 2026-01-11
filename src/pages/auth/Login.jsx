import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import publicApi from "../../configs/PublicApi";
import authApi from "../../configs/AuthApi";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await authApi.login(email, password);
            const token = res?.accessToken;
            const decoded = jwtDecode(token);

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({ name: decoded.fullname}));

            if (decoded.role === 'ROLE_ADMIN') {
                navigate("/Admin");
            } else {
                navigate("/HomePage");
            }
            toast.success("login success");

        } catch (error) {
            console.log(error);
            const errorMessage = error.response.data?.message || "Failed to login";
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Row className="w-100">
                    <Col lg={4} className="mx-auto">
                        <Form className="p-4 border rounded-3 shadow" onSubmit={handleSubmit}>
                            <h3>Login</h3>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="example"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )

}