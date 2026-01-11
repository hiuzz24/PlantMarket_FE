import Cart from "../pages/market/Cart";
import CheckOut from "../pages/market/CheckOut";
import HomePage from "../pages/market/HomePage";
import MainLayout from "../pages/market/MainLayout"
import ShopKit from "../pages/market/ShopKit";
import SuccessPage from "../pages/market/SuccesPage";
import CancelPage from "../pages/market/CancelPage";
import PrivateRouter from "./PrivateRouter";


const marketRouter = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: 'true', element: <HomePage /> },
            { path: 'HomePage', element: <HomePage /> },
            { path: 'ShopKit', element: <ShopKit /> }
        ]
    },

    {
        path: '/cart',
        element: (
            <PrivateRouter roles={["ROLE_ADMIN", "ROLE_USER"]}>
                <Cart />
            </PrivateRouter>
        )
    },
    {
        path: '/checkout',
        element: (
            <PrivateRouter roles={["ROLE_ADMIN", "ROLE_USER"]}>
                <CheckOut />
            </PrivateRouter>
        )
    },
    {
        path: '/success',
        element: <SuccessPage />
    },
    {
        path: '/cancel',
        element: <CancelPage/>
    }


]
export default marketRouter;