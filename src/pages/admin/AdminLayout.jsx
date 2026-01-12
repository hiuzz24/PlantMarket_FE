import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Layout } from "antd";

const { Content } = Layout;

export default function AdminLayout() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <div
                style={{
                    width: 250,
                    background: "#fff",
                    borderRight: "1px solid #e5e5e5",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 100,
                }}
            >
                <AdminSidebar />
            </div>

            <Layout style={{ marginLeft: 250, background: "#f5f6f8" }}>
                <div
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 99,
                        background: "white",
                        height: 80,
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #e5e5e5"
                    }}
                >
                    <AdminHeader />
                </div>

                <Content style={{ padding: "25px" }}>
                    <Outlet/>
                </Content>

            </Layout>
        </Layout>
    );
}
