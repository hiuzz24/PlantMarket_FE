import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LogoImage from '../../assets/logo.png';
import { Facebook, Instagram } from "lucide-react";
import { TbBrandTiktok } from "react-icons/tb";

export default function Footer() {
    return (
        <Container fluid style={{ backgroundColor: '#1d3f31ff' }} className="shadow ">
            <Row className="d-flex jutify-content-center align-items-center" style={{ margin: '2.5rem' }}>
                <Col md={3} className="d-flex flex-column align-items-start gap-4">
                    <div className='d-flex align-items-center gap-3'>
                        <img
                            src={LogoImage}
                            alt='Mộc Mơ'
                            style={{
                                height: '90px'
                            }}
                        />
                        <span style={{
                            fontFamily: "'Poppins', 'Montserrat', 'Nunito Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: 35,
                            color: '#8fcabcff'
                        }}>Mộc Mơ</span>
                    </div>
                    <p style={{
                        maxWidth: '350px', fontSize: '19px', color: '#CAD2C5',
                        lineHeight: '1.6', fontFamily: "'Poppins', sans-serif"
                    }}>
                        Mang thiên nhiên vào không gian sống của bạn.
                        Chúng tôi cung cấp bộ kit trồng cây cao cấp, hoàn toàn hữu cơ và dễ chăm sóc.</p>

                    <div className="d-flex gap-4">
                        <Facebook
                            className="rounded-5 p-2"
                            style={{
                                width: '45px', height: '45px', color: 'white',
                                backgroundColor: '#3b4e50', cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#87a28e',
                                    e.currentTarget.style.transform = 'translateY(-5px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#3b4e50',
                                    e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        />
                        <Instagram
                            className="border border-dark rounded-5 p-2"
                            style={{
                                width: '45px', height: '45px', color: 'white',
                                backgroundColor: '#3b4e50', cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#87a28e',
                                    e.currentTarget.style.transform = 'translateY(-5px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#3b4e50',
                                    e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        />
                        <TbBrandTiktok
                            className="border border-dark rounded-5 p-2"
                            style={{
                                width: '45px', height: '45px', color: 'white',
                                backgroundColor: '#3b4e50', cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#87a28e',
                                    e.currentTarget.style.transform = 'translateY(-5px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#3b4e50',
                                    e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        />
                    </div>

                </Col>
                <Col md={2} className="d-flex flex-column align-items-start">
                    <h4 className="mb-4 text-white fs-4">Mua Sắm</h4>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Tất cả bộ kit</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Bán chạy nhất</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Bộ quà tặng</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Phụ kiện</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Theo màu</a>
                </Col>
                <Col md={2} className="d-flex flex-column align-items-start">
                    <h4 className="mb-4 text-white fs-4">Hỗ trợ</h4>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Hướng Dẫn Trồng</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Câu Hỏi Thường Gặp</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Liên Hệ</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Vận Chuyển</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Đổi Trả</a>
                </Col>
                <Col md={2} className="d-flex flex-column align-items-start">
                    <h4 className="mb-4 text-white fs-4">Hỗ trợ</h4>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Giới Thiệu</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Bền Vững</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Blog</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Cộng Đồng</a>
                    <a href="#" style={{ color: '#CAD2C5', textDecoration: 'none', marginBottom: '10px', fontSize: '19px' }}>Tuyển Dụng</a>
                </Col>
                <Col md={3}>
                    <div className="border rounded-5 p-4 pb-5" style={{ backgroundColor: '#3b4e50', maxWidth: '600px' }}>
                        <h4 className="text-white">Nhận Ưu Đãi 10%</h4>
                        <p className="text-white">Đăng ký nhận tin tức và mã giảm giá đặc biệt</p>
                        <Form className="d-flex gap-2">
                            <Form.Control type="email" placeholder="Email của bạn"
                                style={{
                                    backgroundColor: '#4a5c5e',
                                    padding: '17px',
                                    borderColor: 'black',
                                    borderRadius: '16px'
                                }}
                            >
                            </Form.Control>
                            <Button
                                style={{
                                    borderRadius: '16px',
                                    padding: '17px',
                                    whiteSpace: 'nowrap'
                                }}
                            >Đăng ký</Button>
                        </Form>

                    </div>
                </Col>
            </Row>

            <Row className="d-flex align-items-center" style={{
                borderTop: '1px solid', borderColor: '#3b4e50',
                margin: '2.5rem', marginBottom: '2rem'
            }}>
                <Col md={6} className="text-white" style={{ marginTop: '3rem' }}>
                    © 2024 Mộc Mơ. Tất cả quyền được bảo lưu. 🌱
                </Col>
                <Col md={6} className="text-white d-flex justify-content-end gap-5" style={{ marginTop: '3rem'}}>
                    <p>Chính Sách Bảo Mật</p>
                    <p>Điều Khoản Dịch Vụ</p>
                    <p>Chính Sách Cookie</p>
                </Col>
            </Row>
        </Container>
    )
}