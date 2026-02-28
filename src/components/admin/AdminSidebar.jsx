import Sider from "antd/es/layout/Sider";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/logo.png"
import { BaggageClaim, LayoutDashboard, LayoutList, Settings } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSiderbar() {
    const navigate = useNavigate();
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex py-4 border-bottom" onClick={() => navigate('/HomePage')} style={{cursor: 'pointer'}}>
                <img src={logo}
                    style={{
                        width: '60px',
                        height: '60px'
                    }}
                />
                <div>
                    <h4 style={{ fontWeight: 'bold', fontSize: '22px' }}>Mộc Mơ Admin</h4>
                    <p>plant market</p>
                </div>
            </div>
            <div className="mt-3">
                <Navbar expand="lg" >
                    <Nav className="d-flex flex-column gap-4">
                        <Nav.Link as={NavLink} to="/admin/dashboard"
                         className="d-flex align-items-center" style={{fontSize: '23px',fontWeight: 'bolder'}}>
                            <LayoutDashboard size={25} className="me-3"/>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/ManageProduct"
                        className="d-flex align-items-center" style={{fontSize: '23px',fontWeight: 'bolder'}}>
                            <LayoutList size={25} className="me-3"/>
                            Manage Product
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/orders"
                        className="d-flex align-items-center" style={{fontSize: '23px',fontWeight: 'bolder'}}>
                            <BaggageClaim size={25} className="me-3"/>
                            Orders
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/setting"
                        className="d-flex align-items-center" style={{fontSize: '23px',fontWeight: 'bolder'}}>
                            <Settings size={25} className="me-3"/>
                            Setting
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        </div>
    )
}