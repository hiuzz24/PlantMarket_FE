import { Outlet } from "react-router-dom";
import Footer from "../../components/market/Footer";
import Header from "../../components/market/Header";

export default function MainLayout(){
    return(
        <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-grow-1">
            <Outlet/>
        </main>
        <Footer/>
        </div>
    )
}