import { Bell } from "lucide-react";
import { Col, Container, Row } from "react-bootstrap";

export default function AdminHeader() {
    return (
        <Container fluid className="py-3 px-4 shadow-sm bg-white">
            <Row className="d-flex align-items-center justify-content-between">

                {/* ===== Search Bar ===== */}
                <Col md={7} className="d-flex justify-content-start">
                    <input
                        type="search"
                        placeholder="🔍 Search products by name or category..."
                        className="rounded-4 px-4 py-3"
                        style={{
                            width: "100%",
                            maxWidth: "600px",
                            border: "1px solid #ddd",
                            backgroundColor: "#f8f9fa",
                            fontSize: "18px",
                            outline: "none",
                            transition: "all 0.2s ease",
                        }}
                        onFocus={(e) => (e.target.style.boxShadow = "0 0 8px rgba(0,0,0,0.2)")}
                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                    />
                </Col>

                <Col md={5}>
                    <Row className="d-flex align-items-center justify-content-end">

                        <Col md="auto" className="position-relative me-4">
                            <Bell size={28} style={{ cursor: "pointer" }} />
                        </Col>

                        <Col md="auto">
                            <div className="d-flex align-items-center">
                                <div className="me-3 text-end">
                                    <h6 className="mb-0" style={{ color: "#2F3E46" }}>Admin User</h6>
                                    <p className="mb-0" style={{ fontSize: "13px", color: "#6c757d" }}>Administrator</p>
                                </div>
                                <div
                                    className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundColor: "#62B895",
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                    }}
                                >
                                    AU
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
