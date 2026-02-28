import LoginForm from "../pages/auth/Login";
import LogoutHandler from "../pages/auth/LogoutHandler";

const authRoutes = [
    {
        path: "/login",
        element: <LoginForm />
    },
    {
        path: "/logout",
        element: <LogoutHandler />
    }
]
export default authRoutes;