import { Trash2, Plus, Minus } from "lucide-react";
import { Row, Col, Button } from "react-bootstrap";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    return (
        <div className="bg-white rounded-5 p-3 mb-3 shadow-sm border-0 d-flex align-items-center">
            <Row className="w-100 align-items-center">
                <Col md={2} className="text-center">
                    <div className="rounded-4 p-2" style={{ backgroundColor: '#F8FAF6' }}>
                        <img
                            src={`${item.imageUrl}`}
                            alt={item.name}
                            style={{ width: '100px', height: '100px', objectFit: 'contain',borderRadius: '30px' }}
                        />
                    </div>
                </Col>

                <Col md={3}>
                    <h5 className="fw-bold mb-0" style={{ color: '#2F3E46' }}>{item.productName}</h5>
                    <medium className="text-muted">Category: {item.categoryName}</medium>
                    <div className="fw-bold mt-1" style={{ color: '#5d8066' }}>
                        {item.price.toLocaleString('vi-VN')}
                        <span style={{ fontSize: '0.6em', verticalAlign: 'top', marginLeft: '4px' }}>đ</span>
                    </div>
                </Col>

                <Col md={3} className="d-flex justify-content-center">
                    <div className="d-flex align-items-center border rounded-pill px-2 py-1">
                        <Button variant="link" className="p-0 px-2 text-success text-decoration-none" disabled={item.quantity <= 1}
                            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}>
                            <Minus size={16} />
                        </Button>
                        <span className="px-2 fw-bold">{item.quantity}</span>
                        <Button variant="link" className="p-0 px-2 text-success text-decoration-none" disabled={item.quantity >= item.stockQuantity }
                            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}>
                            <Plus size={16} />
                        </Button>
                    </div>
                </Col>

                <Col md={3} className="text-center">
                    <span className="fw-bold fs-5" style={{ color: '#2F3E46' }}>
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </span>
                </Col>

                <Col md={1} className="text-end">
                    <Button variant="link" className="text-danger p-0" onClick={() => onRemove(item.productId)}>
                        <Trash2 size={20} />
                    </Button>
                </Col>
            </Row>
        </div>
    );
}