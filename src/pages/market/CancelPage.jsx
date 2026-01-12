import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CancelPage(){
    const navigate = useNavigate();

    useEffect(() => {
        toast.warn("Payment was cancelled. You can try again or choose COD")
        navigate("/checkout");
    },[]);
}