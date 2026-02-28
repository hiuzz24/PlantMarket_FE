import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import adminApi from "../../configs/AdminApi";
import UpdateProduct from "../../components/admin/UpdateProduct";
import { FaEdit, FaFilter, FaLeaf, FaPlus, FaTrashAlt, FaUndo, FaBoxes, FaTags } from "react-icons/fa";
import DeleteProduct from "../../components/admin/DeleteProduct";
import CreateProduct from "../../components/admin/CreateProduct";

export default function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [status, setStatus] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalNew, setShowModalNew] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const currentPage = page + 1;

    const fetchProduct = async () => {
        try {
            const productRes = await adminApi.getAllProduct(page, size, selectedValue, status);
            setProducts(productRes.content);
            setTotalPage(productRes.totalPages);
            setTotalElements(productRes.totalElements);
        } catch (error) {
            console.log(error);
            const message = 'error to get data';
            toast.error(error.response?.data?.message || message);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [page, size, selectedValue, status]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryRes = await adminApi.getAllCategories();
                setCategories(categoryRes);
            } catch (error) {
                console.log(error);
                const message = 'error to get data';
                toast.error(error.response?.data?.message || message);
            }
        }
        fetchCategory();
    }, []);

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPage; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={currentPage === i}
                    onClick={() => setPage(i - 1)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages;
    }

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModalUpdate(true);
    }

    const onUpdate = (productId, data) => {
        setProducts(prevPros =>
            prevPros.map(p => p.productId === productId ? data : p)
        )
        setSelectedProduct(null);
    }

    const handleToggleDeleteStatus = (product) => {
        setShowModalDelete(true);
        setSelectedProduct(product);
    }

    const onDelete = (productId, data) => {
        setProducts(prevPros =>
            prevPros.map(p => p.productId === productId ? data : p)
        )
        setSelectedProduct(null);
    }

    return (
        <Container fluid className="manage-product-wrapper py-4 px-lg-5">
            <style dangerouslySetInnerHTML={{ __html: `
                .manage-product-wrapper { background-color: #f8fbf9; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
                .moc-mo-card { border: none; border-radius: 2rem; box-shadow: 0 10px 30px rgba(98, 184, 149, 0.05); background-color: #ffffff; }
                .moc-mo-table thead th { background-color: #ffffff; color: #62B895; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; padding: 1.5rem 1rem; border-bottom: 2px solid #f0f9f4; }
                .moc-mo-table tbody td { padding: 1.25rem 1rem; color: #2d3436; border-bottom: 1px solid #f8f9fa; font-size: 0.9rem; }
                .form-label-custom { font-size: 0.7rem; font-weight: 800; color: #adb5bd; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 5px; }
                .filter-input { background-color: #f8f9fa !important; border: none !important; padding: 0.6rem 1rem !important; font-size: 0.9rem !important; }
                .total-badge { background-color: #f1f3f5; color: #6c757d; font-weight: 600; padding: 0.8rem 1.5rem; border-radius: 50px; }
                .btn-add-new { background-color: #62B895; border: none; padding: 0.8rem 1.5rem; border-radius: 50px; font-weight: 600; transition: all 0.3s ease; }
                .btn-add-new:hover { background-color: #4da382; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(98, 184, 149, 0.3); }
                .btn-action { width: 35px; height: 35px; padding: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 50% !important; margin: 0 2px; border: none; }
                .custom-pagination .page-item.active .page-link { background-color: #62B895; border-color: #62B895; }
                .custom-pagination .page-link { color: #62B895; border-radius: 8px; margin: 0 3px; border: none; background-color: #f0f9f4; }
            `}} />

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: '#2d3436' }}>
                        <FaLeaf className="me-2" style={{ color: '#62B895' }} /> Quản lý vườn cây
                    </h2>
                    <p className="text-muted small mb-0">Chăm sóc và điều chỉnh kho hàng vườn Mộc Mơ</p>
                </div>
                <Button onClick={() => setShowModalNew(true)} className="btn-add-new shadow-sm text-white">
                    <FaPlus className="me-2" /> Thêm cây mới
                </Button>
            </div>

            {/* Filters Section */}
            <Card className="moc-mo-card mb-4">
                <Card.Body className="p-4">
                    <Row className="g-3 align-items-end">
                        <Col lg={4} md={6}>
                            <Form.Group>
                                <label className="form-label-custom"><FaTags /> Danh mục cây</label>
                                <Form.Select
                                    className="filter-input rounded-3 shadow-none"
                                    onChange={e => { setSelectedValue(e.target.value); setPage(0) }}
                                >
                                    <option value={""}>Tất cả loại cây</option>
                                    {categories.map(m => (
                                        <option key={m.categoryId} value={m.categoryId}>{m.categoryName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col lg={4} md={6}>
                            <Form.Group>
                                <label className="form-label-custom"><FaBoxes /> Trạng thái kho</label>
                                <Form.Select
                                    className="filter-input rounded-3 shadow-none"
                                    onChange={e => { setStatus(e.target.value); setPage(0) }}
                                >
                                    <option value={""}>Tất cả trạng thái</option>
                                    <option value={"In_Stock"}>Còn hàng</option>
                                    <option value={"Low_Stock"}>Sắp hết</option>
                                    <option value={"Out_Of_Stock"}>Hết hàng</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col lg={4} className="text-end">
                            <div className="total-badge d-inline-block">
                                Tổng sản phẩm: <span className="text-dark">{totalElements}</span>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Table Section */}
            <Card className="moc-mo-card border-0 overflow-hidden">
                <Table hover responsive className="moc-mo-table mb-0 align-middle">
                    <thead>
                        <tr>
                            <th className="ps-4" style={{ width: '25%' }}>Tên cây cảnh</th>
                            <th style={{ width: '15%' }}>Phân loại</th>
                            <th style={{ width: '15%' }}>Giá niêm yết</th>
                            <th style={{ width: '10%' }}>Số lượng</th>
                            <th style={{ width: '15%' }}>Trạng thái</th>
                            <th className="text-center pe-4" style={{ width: '20%' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.productId}>
                                <td className="ps-4 py-3 fw-bold text-dark">{p.name}</td>
                                <td>
                                    <Badge className="px-3 py-2 rounded-pill" style={{ backgroundColor: '#f0f9f4', color: '#62B895', border: 'none' }}>
                                        {p.categoryName}
                                    </Badge>
                                </td>
                                <td className="fw-bold">{p.price.toLocaleString('vi-VN')} đ</td>
                                <td>
                                    <span className={`fw-bold ${p.stockQuantity < 10 ? 'text-danger' : 'text-success'}`}>
                                        {p.stockQuantity}
                                    </span>
                                </td>
                                <td>
                                    {p.isDeleted ?
                                        <Badge bg="secondary" className="rounded-pill px-3 py-2">Ngừng bán</Badge> :
                                        <Badge bg="success" className="rounded-pill px-3 py-2" style={{ backgroundColor: '#62B895' }}>Kinh doanh</Badge>
                                    }
                                </td>
                                <td className="pe-4 text-center">
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button variant="outline-success" className="btn-action shadow-sm"
                                            onClick={() => handleEdit(p)}>
                                            <FaEdit size={14} />
                                        </Button>
                                        
                                        <Button 
                                            onClick={() => handleToggleDeleteStatus(p)} 
                                            variant={p.isDeleted ? "outline-success" : "outline-danger"} 
                                            className="btn-action shadow-sm"
                                        >
                                            {p.isDeleted ? <FaUndo size={14} /> : <FaTrashAlt size={14} />}
                                        </Button>
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

            {/* Modals */}
            <UpdateProduct
                show={showModalUpdate}
                onHide={() => setShowModalUpdate(false)}
                product={selectedProduct}
                onUpdate={onUpdate}
            />
            <DeleteProduct
                show={showModalDelete}
                onDelete={onDelete}
                onHide={() => setShowModalDelete(false)}
                product={selectedProduct}
            />
            <CreateProduct
                show={showModalNew}
                onCreateSuccess={fetchProduct}
                onHide={() => setShowModalNew(false)}
            />
        </Container>
    );
}