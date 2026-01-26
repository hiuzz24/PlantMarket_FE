import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./AuthRouter";
import marketRouter from "./MarketRouter";
import adminRouter from "./AdminRouter";
import failRouter from "./FailRouter"

const router = createBrowserRouter(
    [
        ...authRoutes,
        ...marketRouter,
        ...adminRouter,
        ...failRouter
    ]
);
export default router;
