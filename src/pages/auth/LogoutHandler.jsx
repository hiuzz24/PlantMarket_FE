import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "../../configs/AuthApi";

export default function LogoutHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await authApi.logout();
                localStorage.removeItem("token");
                localStorage.setItem("user", null);
                
                toast.success("Đã đăng xuất khỏi Vườn Mộc Mơ");
                
                navigate("/HomePage");
            } catch (error) {
                console.error("Logout error:", error);
                localStorage.clear();
                navigate("/login");
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="text-center">
                <div className="spinner-border text-success mb-3" role="status"></div>
                <p className="text-muted">Đang đăng xuất...</p>
            </div>
        </div>
    );
}