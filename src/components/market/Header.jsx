import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import LogoImage from '../../assets/logo.png';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authApi from '../../configs/AuthApi';
import { toast } from 'react-toastify';

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleLogout = async() => {
        try {
            const res = await authApi.logout();
            toast.success(res);
        } catch (error) {
            console.log("logout failed");
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            navigate('/homepage');
        }
    };

    return (
        <Navbar expand="lg" bg='white' className='shadow-sm'>
            <Container fluid className="d-flex align-items-center justify-content-between">
                <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={() => navigate('/HomePage')}>
                    <Navbar.Brand href='/' style={{ padding: '10px' }}>
                        <img
                            src={LogoImage}
                            alt='Mộc Mơ'
                            style={{
                                height: '80px',
                                marginLeft: '1rem'
                            }}
                        />
                    </Navbar.Brand>
                    <span style={{
                        fontFamily: "'Poppins', 'Montserrat', 'Nunito Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: 30,
                        color: '#52796f'
                    }}>Mộc Mơ</span>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto d-flex align-items-center gap-4 me-5'>
                        <Nav.Link href='/ShopKit' style={{ color: '#52796f', fontWeight: '500' }}>Shop Kits</Nav.Link>
                        <Nav.Link href='/About' style={{ color: '#52796f', fontWeight: '500' }}>About</Nav.Link>
                        <Nav.Link href='/Community' style={{ color: '#52796f', fontWeight: '500' }}>Community</Nav.Link>
                        <Nav.Link href='/Support' style={{ color: '#52796f', fontWeight: '500' }}>Support</Nav.Link>
                        <Nav.Link href='/cart' style={{ color: '#52796f', fontWeight: '500' }}>
                            <ShoppingCart />
                        </Nav.Link>

                        {user ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    id="user-dropdown"
                                    style={{
                                        color: '#52796f',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <User size={20} />
                                    <span>{user.name}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    style={{
                                        borderRadius: '12px',
                                        padding: '8px',
                                        minWidth: '200px',
                                        boxShadow: '0 4px 12px rgba(82, 121, 111, 0.15)'
                                    }}
                                >
                                    <Dropdown.Item
                                        href="/profile"
                                        style={{
                                            borderRadius: '8px',
                                            padding: '10px 16px',
                                            color: '#52796f'
                                        }}
                                    >
                                        <User size={16} style={{ marginRight: '8px' }} />
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        onClick={handleLogout}
                                        style={{
                                            borderRadius: '8px',
                                            padding: '10px 16px',
                                            color: '#e63946'
                                        }}
                                    >
                                        <LogOut size={16} style={{ marginRight: '8px' }} />
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Link href='/login' style={{ color: '#52796f', fontWeight: '500' }}>
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}