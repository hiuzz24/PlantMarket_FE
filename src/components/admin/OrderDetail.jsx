import { Modal, Button, Row, Col, Badge, Table } from 'react-bootstrap';
import { FaUser, FaPhone, FaMapMarkerAlt, FaMoneyBillWave, FaBoxOpen, FaCalendarDay } from 'react-icons/fa';

export default function OrderDetailModal({ show, onHide, order, getStatusBadge }) {
    if (!order) return null;

    

    return (
        <Modal show={show} onHide={onHide} size="lg" centered className="moc-mo-modal">
            <style dangerouslySetInnerHTML={{ __html: `
                .moc-mo-modal .modal-content { border-radius: 1.8rem; border: none; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
                .moc-mo-modal .modal-header { border-bottom: 1px solid #f0f9f4; padding: 1.5rem 2rem; background: #fff; border-radius: 1.8rem 1.8rem 0 0; }
                .info-box { background: #f8fbf9; padding: 1.2rem; border-radius: 1.2rem; height: 100%; border: 1px solid #edf5f0; }
                .detail-label { font-size: 0.65rem; color: #95a5a6; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 6px; }
                .detail-value { font-weight: 600; color: #2d3436; font-size: 0.95rem; }
                .product-table thead th { background: none; color: #62B895; font-size: 0.7rem; border-bottom: 1px solid #eee; padding-bottom: 10px; }
                .product-table tbody td { padding: 12px 0; border-bottom: 1px dotted #eee; font-size: 0.9rem; }
                .total-section { background: #62B895; color: white; padding: 1.5rem; border-radius: 1.2rem; }
            `}} />
            
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold d-flex align-items-center gap-2">
                    <div style={{ backgroundColor: '#62B895', width: '8px', height: '24px', borderRadius: '4px' }}></div>
                    Chi tiết đơn hàng <span className="text-muted">#{order.orderId}</span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-4">
                <Row className="g-3 mb-4">
                    <Col md={7}>
                        <div className="info-box">
                            <div className="detail-label"><FaUser /> Khách hàng</div>
                            <div className="detail-value text-uppercase">{order.fullName}</div>
                            <div className="d-flex gap-3 mt-2">
                                <span className="small text-muted"><FaPhone className="me-1"/> {order.phone}</span>
                                <span className="small text-muted"><FaCalendarDay className="me-1"/> {new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <hr className="my-2 opacity-25" />
                            <div className="detail-label"><FaMapMarkerAlt /> Địa chỉ nhận hàng</div>
                            <div className="detail-value small" style={{ fontWeight: 400 }}>{order.shippingAddress}</div>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="info-box d-flex flex-column justify-content-center align-items-center text-center">
                            <div className="detail-label mb-2">Trạng thái hiện tại</div>
                            {getStatusBadge(order.status)}
                            <div className="mt-3 detail-label"><FaMoneyBillWave /> Hình thức thanh toán</div>
                            <Badge bg="secondary" className="px-3 py-2 text-uppercase" style={{ fontSize: '0.7rem' }}>
                                {order.paymentMethod || 'Thanh toán qua QR'}
                            </Badge>
                        </div>
                    </Col>
                </Row>

                {/* Danh sách sản phẩm */}
                <div className="px-2">
                    <div className="detail-label mb-3"><FaBoxOpen size={14} /> Danh mục sản phẩm</div>
                    <Table responsive className="product-table border-0">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th className="text-center">Số lượng</th>
                                <th className="text-end">Đơn giá</th>
                                <th className="text-end">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.orderDetails?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="fw-bold">{item.productName}</td>
                                    <td className="text-center">x{item.quantity}</td>
                                    <td className="text-end">{item.price?.toLocaleString('vi-VN')} đ</td>
                                    <td className="text-end fw-bold">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Tổng kết tiền */}
                <div className="total-section mt-4 d-flex justify-content-between align-items-center shadow-sm">
                    <div>
                        <div className="small opacity-75 fw-bold text-uppercase">Tổng giá trị đơn hàng</div>
                        <div className="small fs-7">Đã bao gồm phí vận chuyển và VAT</div>
                    </div>
                    <div className="fs-3 fw-bold">
                        {order.totalAmount?.toLocaleString('vi-VN')} <small>đ</small>
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    );
}