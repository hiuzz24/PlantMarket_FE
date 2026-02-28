import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import LogoImage from '../../assets/logo3.png';
import { ShoppingCart, LogOut, UserCircle, Leaf, ClipboardList, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authApi from '../../configs/AuthApi';
import { toast } from 'react-toastify';
import cartApi from '../../configs/CartApi';

export default function Header() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const fetchData = async () => {
        try {
            const res = await cartApi.getCartByUser();
            setCart(res);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching cart';
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        fetchData();

        const handleCartUpdate = () => {
            fetchData();
        };

        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const res = await authApi.logout();
            toast.success(res || "Hẹn gặp lại bạn tại Mộc Mơ!");
        } catch (error) {
            console.log("Đăng xuất thất bại", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            navigate('/HomePage');
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .navbar-custom {
                    background-color: white;
                    border-bottom: 2px solid #f0f4f2;
                    transition: all 0.3s ease;
                }
                .nav-link-custom {
                    color: #52796f !important;
                    font-weight: 600;
                    position: relative;
                    padding: 8px 15px !important;
                    transition: color 0.3s ease;
                }
                .nav-link-custom::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 5px;
                    left: 50%;
                    background-color: #84a98c;
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }
                .nav-link-custom:hover::after {
                    width: 70%;
                }
                .btn-login-custom {
                    color: #52796f !important;
                    font-weight: 600;
                    border: 1px solid #52796f;
                    border-radius: 20px;
                    padding: 5px 20px !important;
                    transition: all 0.3s ease;
                }
                .btn-login-custom:hover {
                    background-color: #f0f7f4;
                    transform: translateY(-2px);
                }
            `}} />

            <Navbar expand="lg" className="navbar-custom sticky-top shadow-sm">
                <Container fluid className="px-md-5 d-flex align-items-center justify-content-between py-3">
                    <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={() => navigate('/HomePage')}>
                        <Navbar.Brand style={{ padding: '10px' }}>
                            <img src={LogoImage} alt='Mộc Mơ' style={{ height: '60px', marginLeft: '1rem' }} />
                        </Navbar.Brand>
                        <span style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 800,
                            fontSize: 30,
                            color: '#52796f'
                        }}>Mộc Mơ</span>
                    </div>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto d-flex align-items-center gap-4 me-5'>
                            <Nav.Link onClick={() => navigate('/ShopKit')} className="nav-link-custom">Cửa hàng</Nav.Link>
                            <Nav.Link onClick={() => navigate('/AboutPage')} className="nav-link-custom">Giới thiệu</Nav.Link>
                            <Nav.Link onClick={() => navigate('/HomePage')} className="nav-link-custom">Cộng đồng</Nav.Link>
                            <Nav.Link onClick={() => window.open('https://www.facebook.com/profile.php?id=61586796640505')} className="nav-link-custom">Hỗ trợ</Nav.Link>

                            <Nav.Link onClick={() => navigate('/cart')} className="nav-link-custommx-2">
                                <div className="position-relative">
                                    <ShoppingCart size={22} strokeWidth={2.5} />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                                        {cart?.cartItems?.length || 0}
                                    </span>
                                </div>
                            </Nav.Link>

                            {user ? (
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="link" id="user-dropdown" style={{
                                        color: '#52796f',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <UserCircle size={22} />
                                        <span>{user.name}</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="border-0 shadow-lg mt-2" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                        <div className="px-3 py-2 bg-light mb-2">
                                            <small className="text-muted d-block">Xin chào,</small>
                                            <strong style={{ color: '#52796f' }}>{user.name}</strong>
                                        </div>

                                        {(user && user.role === 'ROLE_ADMIN') && (
                                            <>
                                                <Dropdown.Item
                                                    onClick={() => navigate('/admin/ManageProduct')}
                                                    className="py-2 px-3 fw-bold"
                                                    style={{ color: '#1d3f31' }}
                                                >
                                                    <LayoutDashboard size={18} className="me-2 text-primary" /> Quản trị hệ thống
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                            </>
                                        )}

                                        <Dropdown.Item className="py-2 px-3">
                                            <UserCircle size={18} className="me-2 text-success" /> Hồ sơ cá nhân
                                        </Dropdown.Item>

                                        <Dropdown.Item className="py-2 px-3">
                                            <ClipboardList size={18} className="me-2 text-info" /> Đơn hàng của tôi
                                        </Dropdown.Item>

                                        <Dropdown.Item className="py-2 px-3">
                                            <Leaf size={18} className="me-2 text-warning" /> Cây yêu thích
                                        </Dropdown.Item>

                                        <Dropdown.Divider />

                                        <Dropdown.Item onClick={handleLogout} className="py-2 px-3 text-danger">
                                            <LogOut size={18} className="me-2" /> Đăng xuất
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Nav.Link onClick={() => navigate('/login')} className="btn-login-custom ms-lg-3">
                                    Đăng nhập
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}