import { useEffect, useState } from "react";
import { Col, Container, Row, ListGroup, Pagination } from "react-bootstrap";
import categoryApi from '../../configs/CategoryApi';
import productApi from '../../configs/ProductApi';
import ProductCard from '../../components/market/ProductCard';
import { Leaf, Star } from "lucide-react";
import ProductDetailModal from "../../components/market/ProductDetailModal";

export default function ShopKit() {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    const [activeCat, setActiveCat] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [selectedPro, setSelectedPro] = useState(null);

    const currentPage = page + 1;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await categoryApi.getAllCategories();
                setCategories(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productApi.getAllProduct(page, size);
                setProduct(res);
                setTotalPages(res.totalPages);
                setTotalElements(res.totalElements);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [page, size])

    const handleShowProduct = (product) => {
        setModalShow(true);
        setSelectedPro(product);
    }

    const handlePageChange = (page) => {
        setPage(page - 1);
    }

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Pagination.Item
                    active={currentPage === i}
                    onClick={() => handlePageChange(i)}
                    style={{ cursor: 'pointer' }}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages;
    }

    return (
        <Container fluid className="py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Row className="gx-4">
                <Col md={3}>
                    <div className="bg-white rounded-5 p-4 shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
                        <h4 className="fw-bold mb-4" style={{ color: '#2F3E46' }}>Categories</h4>

                        <ListGroup className="gap-2 mb-5">
                            {categories.map((cat) => (
                                <ListGroup.Item
                                    key={cat.categoryId}
                                    action
                                    active={activeCat === cat.categoryName}
                                    onClick={() => setActiveCat(prev => prev === cat.categoryName ? "" : cat.categoryName)}
                                    className="border-0 rounded-5 p-3 d-flex align-items-center gap-3"
                                    style={{
                                        backgroundColor: activeCat === cat.categoryName ? '#bef1d0ff' : 'transparent',
                                        color: '#2F3E46',
                                        fontWeight: activeCat === cat.categoryName ? 'bold' : 'normal',
                                        outline: 'none',
                                        boxShadow: activeCat === cat.categoryName ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                                    }}
                                >
                                    <span style={{ fontSize: '1.2rem' }}>🌿</span>
                                    {cat.categoryName}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <h4 className="fw-bold mb-4" style={{ color: '#2F3E46' }}>Difficulty Level</h4>
                        <ListGroup variant="flush" className="gap-2">
                            <ListGroup.Item action className="border-0 p-2 d-flex align-items-center gap-2" style={{ color: '#2F3E46' }}>
                                <Star size={18} fill="#FFD700" color="#FFD700" /> Beginner
                            </ListGroup.Item>
                            <ListGroup.Item action className="border-0 p-2 d-flex align-items-center gap-2" style={{ color: '#2F3E46' }}>
                                <div className="d-flex"><Star size={18} fill="#FFD700" color="#FFD700" /><Star size={18} fill="#FFD700" color="#FFD700" /></div> Intermediate
                            </ListGroup.Item>
                            <ListGroup.Item action className="border-0 p-2 d-flex align-items-center gap-2" style={{ color: '#2F3E46' }}>
                                <div className="d-flex"><Star size={18} fill="#FFD700" color="#FFD700" /><Star size={18} fill="#FFD700" color="#FFD700" /><Star size={18} fill="#FFD700" color="#FFD700" /></div> Advanced
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>

                <Col md={9}>
                    <div className="p-4 bg-white rounded-5 shadow-sm min-vh-100">
                        <h6 style={{color: '#62B895'}}>Showing {size} of {totalElements} products</h6>
                        <Row className="justify-content-start">
                            {product.content
                                ?.map(p => (
                                    <Col md={4} key={p.productId} className="mb-4" style={{ cursor: 'pointer' }} onClick={() => handleShowProduct(p)}>
                                        <ProductCard product={p} />
                                    </Col>
                                ))}
                        </Row>
                        <ProductDetailModal onHide={() => setModalShow(false)} show={modalShow} product={selectedPro} />
                    </div>
                    <Pagination className="mt-5 justify-content-center">
                        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0}>
                        </Pagination.Prev>
                        {renderPagination()}
                        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>
                        </Pagination.Next>
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
}