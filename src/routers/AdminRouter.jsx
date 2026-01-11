import { Children } from "react";
import AdminLayout from "../pages/admin/AdminLayout";
import PrivateRouter from "./PrivateRouter";
import ManageProduct from "../pages/admin/ManageProduct";

const adminRouter = [
    {
        path: "/Admin",
        element: (
            <PrivateRouter roles={"ROLE_ADMIN"}>
                <AdminLayout />
            </PrivateRouter>
        ),
        children:[
            {path:'ManageProduct',element: <ManageProduct/>}
        ]
    }
];
export default adminRouter;