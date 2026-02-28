import { Col, Container, Row } from "react-bootstrap";
import LogoImage from '../../assets/logo3.png';
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { TbBrandTiktok } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    // Style chung cho các link để code gọn hơn
    const linkStyle = {
        color: '#CAD2C5',
        textDecoration: 'none',
        marginBottom: '12px',
        fontSize: '16px',
        transition: 'all 0.3s ease',
        display: 'block',
        cursor: 'pointer'
    };

    const handleHover = (e) => {
        e.target.style.color = '#8fcabc';
        e.target.style.paddingLeft = '5px';
    };

    const handleLeave = (e) => {
        e.target.style.color = '#CAD2C5';
        e.target.style.paddingLeft = '0';
    };

    return (
        <Container fluid style={{ backgroundColor: '#1d3f31', paddingTop: '4rem' }} className="mt-auto">
            <Row className="justify-content-center px-md-5">
                {/* Cột 1: Thương hiệu & Social */}
                <Col lg={3} md={6} className="mb-4 mb-lg-0 pr-lg-5">
                    <div className='d-flex align-items-center gap-2 mb-4' 
                         style={{ cursor: 'pointer' }} 
                         onClick={() => navigate('/HomePage')}>
                        <img src={LogoImage} alt='Mộc Mơ' style={{ height: '70px' }} />
                        <span style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 700,
                            fontSize: 32,
                            color: '#8fcabc'
                        }}>Mộc Mơ</span>
                    </div>
                    <p style={{
                        fontSize: '16px',
                        color: '#CAD2C5',
                        lineHeight: '1.8',
                        marginBottom: '2rem'
                    }}>
                        Chúng tôi gieo mầm hạnh phúc qua từng bộ kit trồng cây hữu cơ, 
                        mang hơi thở thiên nhiên vào không gian sống hiện đại của bạn.
                    </p>
                    <div className="d-flex gap-3">
                        {[
                            { Icon: Facebook, link: 'https://www.facebook.com/profile.php?id=61586796640505' },
                            { Icon: Instagram, link: '#' },
                            { Icon: TbBrandTiktok, link: '#' }
                        ].map((social, index) => (
                            <div
                                key={index}
                                onClick={() => window.open(social.link, '_blank')}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(143, 202, 188, 0.2)'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = '#52796f';
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <social.Icon size={20} />
                            </div>
                        ))}
                    </div>
                </Col>

                {/* Cột 2: Mua Sắm */}
                <Col lg={2} md={6} className="mb-4 mb-lg-0 ps-lg-5">
                    <h5 className="text-white mb-4 fw-bold" style={{ letterSpacing: '1px' }}>CỬA HÀNG</h5>
                    <div className="d-flex flex-column">
                        {['Tất cả bộ kit', 'Bán chạy nhất', 'Bộ quà tặng', 'Phụ kiện', 'Cây cảnh theo mùa'].map((item) => (
                            <span key={item} style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                {item}
                            </span>
                        ))}
                    </div>
                </Col>

                {/* Cột 3: Hỗ trợ */}
                <Col lg={2} md={6} className="mb-4 mb-lg-0">
                    <h5 className="text-white mb-4 fw-bold" style={{ letterSpacing: '1px' }}>HỖ TRỢ</h5>
                    <div className="d-flex flex-column">
                        {['Hướng dẫn trồng', 'Câu hỏi thường gặp', 'Chính sách vận chuyển', 'Đổi trả & Hoàn tiền', 'Liên hệ chúng tôi'].map((item) => (
                            <span key={item} style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                {item}
                            </span>
                        ))}
                    </div>
                </Col>

                {/* Cột 4: Thông tin liên hệ */}
                <Col lg={3} md={6} className="mb-4 mb-lg-0">
                    <h5 className="text-white mb-4 fw-bold" style={{ letterSpacing: '1px' }}>LIÊN HỆ</h5>
                    <div className="d-flex flex-column gap-3">
                        <div className="d-flex align-items-start gap-3" style={{ color: '#CAD2C5' }}>
                            <MapPin size={20} className="mt-1" style={{ color: '#8fcabc' }} />
                            <span>Khu Công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội</span>
                        </div>
                        <div className="d-flex align-items-center gap-3" style={{ color: '#CAD2C5' }}>
                            <Phone size={20} style={{ color: '#8fcabc' }} />
                            <span>+84 123 456 789</span>
                        </div>
                        <div className="d-flex align-items-center gap-3" style={{ color: '#CAD2C5' }}>
                            <Mail size={20} style={{ color: '#8fcabc' }} />
                            <span>contact@mocmo.vn</span>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Bottom Bar */}
            <Row className="mx-md-5 mt-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                    <span style={{ color: 'rgba(202, 210, 197, 0.6)', fontSize: '14px' }}>
                        © 2026 Mộc Mơ - Vườn Ươm Hạnh Phúc. Bảo lưu mọi quyền. 🌱
                    </span>
                </Col>
                <Col md={6} className="text-center text-md-end">
                    <div className="d-flex justify-content-center justify-content-md-end gap-4" style={{ fontSize: '14px' }}>
                        <span style={linkStyle} className="mb-0">Chính sách bảo mật</span>
                        <span style={linkStyle} className="mb-0">Điều khoản</span>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}