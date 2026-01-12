import { jwtDecode } from "jwt-decode";
import { Children } from "react"
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children, roles }) {

    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to={"/login"} replace />;
    }

    let userRole;
    let decode;
    try {
         decode = jwtDecode(token);
        userRole = decode.role;
    }catch{
        return <Navigate to={"/login"} replace></Navigate>
    }

    if(!roles.includes(userRole)){
        return <Navigate to={"/fail403"} replace></Navigate>
    }

    return children;
}