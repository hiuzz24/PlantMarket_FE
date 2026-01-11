import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SuccessPage(){
    const navigate = useNavigate();

    useEffect(() => {
        toast.success("Payment Successful! Your plants are on the way")
        navigate("/HomePage");
    },[]);
}