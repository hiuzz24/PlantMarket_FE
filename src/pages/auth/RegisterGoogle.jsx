import { GoogleLogin } from '@react-oauth/google';
import authApi from "../../configs/AuthApi";
import privateApi from "../../configs/PrivateApi"; // Nếu privateApi xử lý refreshToken

// Nhận 2 props: onLoginSuccess và onLoginError
export default function RegisterGoogle({ onLoginSuccess, onLoginError }) {
    
    const handleSuccess = async (response) => {
        try {
            // Gọi api login with Google đã tích hợp trong file configs
            // Bạn cần cập nhật AuthApi.js để có hàm loginWithGoogle
            const data = await authApi.loginWithGoogle(response.credential);
            
            // Gọi hàm xử lý thành công ở LoginForm truyền sang
            onLoginSuccess(data.accessToken);

        } catch (error) {
            console.error("Lỗi Google Auth:", error);
            // Gọi hàm xử lý lỗi ở LoginForm truyền sang
            onLoginError(error);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => onLoginError(new Error("Đăng nhập Google thất bại"))}
                theme="outline"
                size="large"
                shape="pill"
                text="continue_with"
                width="100%"
                useOneTap
            />
        </div>
    );
}