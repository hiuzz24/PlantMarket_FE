import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import adminApi from "../../configs/AdminApi";

export default function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedValue,setSelectedValue] = useState(null);
    const [status,setStatus] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const currentPage = page + 1;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRes = await adminApi.getAllProduct(page, size,selectedValue);
                setProducts(productRes.content);
                setTotalPage(productRes.totalPages);
                setTotalElements(productRes.totalElements);
            } catch (error) {
                console.log(error);
                const message = 'error to get data';
                toast.error(error.response.data?.message || message);
            }
        }
        fetchProduct();
    }, [page, size,selectedValue]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryRes = await adminApi.getAllCategories();
                setCategories(categoryRes);
            } catch (error) {
                console.log(error);
                const message = 'error to get data';
                toast.error(error.response.data?.message || message);
            }
        }
        fetchCategory();
    },[]);

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPage; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
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

    const handlePageChange = (page) => {
        setPage(page - 1);
    }

    return (
        <Container fluid>
            <div className="d-flex justify-content-between align-item-center mb-4">
                <div>
                    <h1>Manage Products</h1>
                    <h6 style={{
                        color: '#aaa7a7ff',
                        fontSize: '20px'
                    }}>Add,edit and manage your plant inventory</h6>
                </div>
                <Button className="rounded-4 p-3" style={{
                    fontWeight: 'bolder',
                    fontSize: '20px',
                    height: 'fit-content',
                    backgroundColor: '#62B895'
                }}>
                    + Add New Product
                </Button>
            </div>

            <div className="d-flex justify-content-between align-items-center rounded-4 border p-3 mb-4" style={{
                backgroundColor: 'white',
                zIndex: '100',
                boxShadow: '0px 2px 15px rgba(216, 212, 212, 0.3)'
            }}>
                <div className="d-flex gap-4 align-items-center">
                    <h5 className="mb-1">Filter by: </h5>

                    {/* filter by categories */}
                    <Form.Select className="rounded-4" style={{
                        width: '190px'
                    }}
                    onChange={e => {setSelectedValue(e.target.value),setPage(0)}}
                    >
                        <option value={""}>All Categories</option>
                        {categories.map(m => (
                            <option key={m.categoryId} value={m.categoryId}>{m.categoryName}</option>
                        ))}
                    </Form.Select>
                    {/* filter by status */}
                    <Form.Select className="rounded-4" style={{
                        width: '190px'
                    }}
                    onChange={e => setStatus(e.target.value)}
                    >
                        <option value={""}>All Status</option>
                        <option value={"In_Stock"}>In Stock</option>
                        <option value={"Low_Stock"}>Low Stock</option>
                        <option value={"Out_Of_Stock"}>Out Of Stock</option>
                    </Form.Select>
                </div>
                <h6 className="mb-0">Total Products: {totalElements}</h6>
            </div>

            <div className="table-responsive rounded-4" style={{ fontSize: '17px', boxShadow: '0px 2px 10px rgba(187, 183, 183, 0.3)' }}>
                <Table className="striped mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.productId}>
                                <td>{p.name}</td>
                                <td>{p.categoryName}</td>
                                <td>{p.price.toLocaleString('vi-VN')}</td>
                                <td>{p.stockQuantity}</td>
                                <td>{p.isDeleted ? 'DeActive' : 'Active'}</td>
                                <td className="d-flex gap-3 justify-content-center">
                                    <Button size="sm">Update</Button>
                                    <Button size="sm" variant="danger">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Row className='mt-4'>
                <Col>
                    <Pagination className='justify-content-center'>
                        <Pagination.Prev onClick={() => {
                            setPage(page - 1);
                        }
                        }
                            disabled={page === 0} />
                        {renderPagination()}
                        <Pagination.Next onClick={() => {
                            setPage(page + 1);
                        }}
                            disabled={page + 1 === totalPage} />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    )
}