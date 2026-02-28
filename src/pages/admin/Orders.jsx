import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import adminApi from "../../configs/AdminApi";
import { FaFilter, FaShoppingBag, FaEye, FaTruck, FaCheckCircle, FaTimesCircle, FaSearch, FaCalendarAlt } from "react-icons/fa";
import OrderDetailModal from "../../components/admin/OrderDetail";

export default function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const [showDetail, setShowDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const currentPage = page + 1;

    const fetchOrders = async () => {
        try {
            const res = await adminApi.getAllOrders(page, size, searchTerm, statusFilter, startDate, endDate);
            setOrders(res.content);
            setTotalPage(res.totalPages);
            setTotalElements(res.totalElements);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Không thể tải danh sách đơn hàng");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, size, searchTerm, statusFilter, startDate, endDate]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await adminApi.updateOrderStatus(orderId, newStatus);
            toast.success(`Cập nhật đơn hàng #${orderId} thành công!`);
            fetchOrders();
        } catch (error) {
            toast.error("Lỗi khi cập nhật trạng thái");
        }
    };

    const handleShowDetail = async (orderId) => {
        try {
            const res = await adminApi.getOrderById(orderId);
            setSelectedOrder(res);
            setShowDetail(true);
        } catch (error) {
            toast.error("Không thể lấy chi tiết đơn hàng!");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "PENDING": return <Badge bg="warning" className="rounded-pill px-3 py-2">Chờ xác nhận</Badge>;
            case "PAID": return <Badge bg="info" className="rounded-pill px-3 py-2 text-white">Đã thanh toán (QR)</Badge>;
            case "SHIPPING": return <Badge bg="primary" className="rounded-pill px-3 py-2">Đang giao</Badge>;
            case "DELIVERED": return <Badge bg="success" className="rounded-pill px-3 py-2">Hoàn thành</Badge>;
            case "CANCELLED": return <Badge bg="danger" className="rounded-pill px-3 py-2">Đã hủy</Badge>;
            default: return <Badge bg="secondary" className="rounded-pill px-3 py-2">{status}</Badge>;
        }
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPage; i++) {
            pages.push(
                <Pagination.Item key={i} active={currentPage === i} onClick={() => setPage(i - 1)}>
                    {i}
                </Pagination.Item>
            );
        }
        return pages;
    };

    return (
        <Container fluid className="manage-product-wrapper py-4 px-lg-5">
            <style dangerouslySetInnerHTML={{
                __html: `
                .manage-product-wrapper { background-color: #f8fbf9; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
                .moc-mo-card { border: none; border-radius: 2rem; box-shadow: 0 10px 30px rgba(98, 184, 149, 0.05); background-color: #ffffff; }
                .moc-mo-table thead th { background-color: #ffffff; color: #62B895; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; padding: 1.5rem 1rem; border-bottom: 2px solid #f0f9f4; }
                .moc-mo-table tbody td { padding: 1.25rem 1rem; color: #2d3436; border-bottom: 1px solid #f8f9fa; font-size: 0.9rem; }
                .form-label-custom { font-size: 0.7rem; font-weight: 800; color: #adb5bd; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 5px; }
                .filter-input { background-color: #f8f9fa !important; border: none !important; padding: 0.6rem 1rem !important; font-size: 0.9rem !important; }
                .total-badge { background-color: #f1f3f5; color: #6c757d; font-weight: 600; padding: 0.8rem 1.5rem; border-radius: 50px; }
                .btn-action { width: 35px; height: 35px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 50% !important; margin: 0 2px; border: none; }
                /* Container cố định độ rộng cho các nút thao tác */
                .action-wrapper { display: flex; justify-content: center; gap: 4px; min-width: 120px; }
            `}} />

            <div className="mb-4">
                <h2 className="fw-bold mb-1" style={{ color: '#2d3436' }}>Quản lý đơn hàng</h2>
                <p className="text-muted small">Hệ thống theo dõi và xử lý đơn hàng vườn Mộc Mơ</p>
            </div>

            <Card className="moc-mo-card mb-4">
                <Card.Body className="p-4">
                    <Row className="g-3 align-items-end">
                        <Col xl={3} lg={3} md={6}>
                            <Form.Group>
                                <label className="form-label-custom"><FaSearch /> Tìm khách hàng</label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tên hoặc số điện thoại..."
                                    className="filter-input rounded-3 shadow-none"
                                    value={searchTerm}
                                    onChange={e => { setSearchTerm(e.target.value); setPage(0); }}
                                />
                            </Form.Group>
                        </Col>

                        <Col xl={2} lg={2} md={6}>
                            <Form.Group>
                                <label className="form-label-custom"><FaFilter /> Trạng thái</label>
                                <Form.Select
                                    className="filter-input rounded-3 shadow-none"
                                    value={statusFilter}
                                    onChange={e => { setStatusFilter(e.target.value); setPage(0); }}
                                >
                                    <option value={""}>Tất cả</option>
                                    <option value={"PENDING"}>Chờ xác nhận</option>
                                    <option value={"PAID"}>Đã thanh toán</option>
                                    <option value={"SHIPPING"}>Đang giao</option>
                                    <option value={"DELIVERED"}>Hoàn thành</option>
                                    <option value={"CANCELLED"}>Đã hủy</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xl={2} lg={2} md={6}>
                            <Form.Group>
                                <label className="form-label-custom"><FaCalendarAlt /> Từ ngày</label>
                                <Form.Control
                                    type="date"
                                    className="filter-input rounded-3 shadow-none text-muted"
                                    value={startDate}
                                    onChange={e => { setStartDate(e.target.value); setPage(0); }}
                                />
                            </Form.Group>
                        </Col>

                        <Col xl={2} lg={2} md={6}>
                            <Form.Group>
                                <label className="form-label-custom"><FaCalendarAlt /> Đến ngày</label>
                                <Form.Control
                                    type="date"
                                    className="filter-input rounded-3 shadow-none text-muted"
                                    value={endDate}
                                    onChange={e => { setEndDate(e.target.value); setPage(0); }}
                                />
                            </Form.Group>
                        </Col>

                        <Col xl={1} lg={1} md={6}>
                            <Button
                                variant="success"
                                className="w-100 rounded-3 py-2 border-0 fw-bold shadow-sm"
                                style={{ backgroundColor: '#62B895' }}
                                onClick={fetchOrders}
                            >
                                Lọc
                            </Button>
                        </Col>

                        <Col xl={2} lg={2} md={6} className="text-end">
                            <div className="total-badge d-inline-block">
                                Tổng đơn: <span className="text-dark">{totalElements}</span>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="moc-mo-card border-0">
                <Table hover responsive className="moc-mo-table mb-0 align-middle">
                    <thead>
                        <tr>
                            <th className="ps-4" style={{ width: '10%' }}>Mã đơn</th>
                            <th style={{ width: '20%' }}>Khách hàng</th>
                            <th style={{ width: '12%' }}>Thanh toán</th>
                            <th style={{ width: '15%' }}>Tổng tiền</th>
                            <th style={{ width: '15%' }}>Ngày đặt</th>
                            <th style={{ width: '15%' }}>Trạng thái</th>
                            <th className="text-center pe-4" style={{ width: '13%' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.orderId}>
                                <td className="ps-4 py-3 fw-bold text-dark">#{o.orderId}</td>
                                <td>
                                    <div className="fw-bold">{o.fullName}</div>
                                    <div className="small text-muted" style={{ fontSize: '0.75rem' }}>{o.phone}</div>
                                </td>
                                <td>
                                    <Badge bg="secondary" className="px-2 py-1 text-uppercase" style={{ fontSize: '0.65rem', backgroundColor: '#6c757d' }}>
                                        {o.paymentMethod || 'PAYOS'}
                                    </Badge>
                                </td>
                                <td className="fw-bold text-success" style={{ color: '#62B895 !important' }}>
                                    {o.totalAmount.toLocaleString('vi-VN')} đ
                                </td>
                                <td>{new Date(o.createdAt).toLocaleDateString('vi-VN')}</td>
                                <td>{getStatusBadge(o.status)}</td>
                                <td className="pe-4">
                                    <div className="action-wrapper mx-auto">
                                        <Button variant="success" className="btn-action shadow-sm text-white"
                                            title="Chi tiết" onClick={() => {handleShowDetail(o.orderId)}}>
                                            <FaEye size={12} />
                                        </Button>

                                        {(o.status === "PENDING" || o.status === "PAID") ? (
                                            <Button variant="primary" className="btn-action shadow-sm text-white"
                                                title="Giao hàng" onClick={() => handleUpdateStatus(o.orderId, "SHIPPED")}>
                                                <FaTruck size={12} />
                                            </Button>
                                        ) : o.status === "SHIPPED" ? (
                                            <Button variant="success" className="btn-action shadow-sm text-white"
                                                title="Hoàn thành" onClick={() => handleUpdateStatus(o.orderId, "DELIVERED")}>
                                                <FaCheckCircle size={12} />
                                            </Button>
                                        ) : (
                                            <div className="btn-action" style={{ visibility: 'hidden' }}></div>
                                        )}

                                        {(o.status === "PENDING" || o.status === "SHIPPED") ? (
                                            <Button variant="danger" className="btn-action shadow-sm text-white"
                                                title="Hủy đơn" onClick={() => handleUpdateStatus(o.orderId, "CANCELLED")}>
                                                <FaTimesCircle size={12} />
                                            </Button>
                                        ) : (
                                            <div className="btn-action" style={{ visibility: 'hidden' }}></div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="py-4 border-top">
                    <Pagination className="justify-content-center custom-pagination mb-0">
                        <Pagination.Prev disabled={page === 0} onClick={() => setPage(page - 1)} />
                        {renderPagination()}
                        <Pagination.Next disabled={page + 1 === totalPage} onClick={() => setPage(page + 1)} />
                    </Pagination>
                </div>
            </Card>
            <OrderDetailModal
                show={showDetail}
                onHide={() => setShowDetail(false)}
                order={selectedOrder}
                getStatusBadge={getStatusBadge}
            />
        </Container>
    );
}