import { toast } from "react-toastify";
import adminApi from "../../configs/AdminApi";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export default function DeleteProduct({ show, onHide, product, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await adminApi.toggleDeleteStatus(product.productId);
            setIsDeleting(true);
            onDelete(product.productId, res);
            onHide();
            !product.isDeleted ? toast.success('Xóa thành công!') : toast.success('Khôi phục thành công!');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.message || 'Something error when delete');
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                {product?.isDeleted
                    ? <Modal.Title>Xác nhận xóa</Modal.Title>
                    : <Modal.Title>Xác nhận khôi phục</Modal.Title>
                }

            </Modal.Header>
            <Modal.Body>
                {product?.isDeleted
                    ?
                    <>
                        <p>Bạn có muốn khôi phục sản phẩm ?</p>
                        <h5>{product?.productName}</h5>
                    </>
                    :
                    <>
                        <p>Bạn có muốn xóa sản phẩm ?</p>
                        <h5>{product?.productName}</h5>
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Hủy Bỏ</Button>
                <Button variant="danger"
                    onClick={() => handleDelete()}
                    disabled={isDeleting === true}>
                    {product?.isDeleted === false
                        ? isDeleting === true ? 'Đang xóa...' : 'Xác nhận xóa'
                        : isDeleting === true ? 'Đang khôi phục...' : 'Xác nhận khôi phục'
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}