import { Children } from "react";
import AdminLayout from "../pages/admin/AdminLayout";
import PrivateRouter from "./PrivateRouter";
import ManageProduct from "../pages/admin/ManageProduct";
import Orders from "../pages/admin/Orders";

const adminRouter = [
    {
        path: "/Admin",
        element: (
            <PrivateRouter roles={"ROLE_ADMIN"}>
                <AdminLayout />
            </PrivateRouter>
        ),
        children: [
            { path: 'ManageProduct', element: <ManageProduct /> },
            { path: 'Orders', element: <Orders /> }
        ]
    }
];
export default adminRouter;