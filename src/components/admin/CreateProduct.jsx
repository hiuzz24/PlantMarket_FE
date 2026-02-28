import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import z from "zod";
import categoryApi from '../../configs/CategoryApi';
import { toast } from "react-toastify";
import adminApi from "../../configs/AdminApi";
import uploadImage from "../../configs/CloudinaryApi";

const productSchema = z.object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự").max(50),
    description: z.string().max(255, "Mô tả không quá 255 ký tự").optional(),
    price: z.coerce.number().positive("Giá phải lớn hơn 0"),
    stockQuantity: z.coerce.number().int().min(0, "Số lượng không được âm"),
    imageUrl: z.string().url("Vui lòng tải ảnh lên").max(500),
    difficultyLevel: z.enum(["EASY", "MEDIUM", "HARD"]),
    isBestSeller: z.boolean().default(false),
    categoryId: z.coerce.number().min(1, "Vui lòng chọn danh mục"),
});

export default function CreateProduct({ show, onHide, onCreateSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            stockQuantity: 1,
            difficultyLevel: 'EASY',
            isBestSeller: false,
            imageUrl: '',
        }
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await categoryApi.getAllCategories();
                setCategories(res);
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || 'fetch category error');
            }
        };

        if (show) {
            fetchCategory();
            reset();
        }
    }, [show, reset]);

    const onSubmit = async (data) => {
        try {
            const res = await adminApi.createProduct(data);
            onCreateSuccess();
            onHide();
            toast.success("Tạo mới thành công 🌿");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Lỗi khi tạo sản phẩm");
        }
    };

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsLoading(true);
        try {
            const uploadUrl = await uploadImage(file);
            setValue('imageUrl', uploadUrl, { shouldValidate: true });
        } catch (error) {
            console.log(error);
            toast.error('Lỗi khi upload ảnh lên Cloudinary');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg" className="rounded-4">
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Thêm Cây Cảnh Mới</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={8}>
                            <Form.Label className="fw-bold">Tên cây</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên cây..."
                                {...register("name")}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md={4}>
                            <Form.Label className="fw-bold">Độ khó</Form.Label>
                            <Form.Select {...register("difficultyLevel")}>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Mô tả đặc điểm, cách chăm sóc..."
                            {...register("description")}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="fw-bold">Giá bán (VNĐ)</Form.Label>
                            <Form.Control type="number" {...register("price")} isInvalid={!!errors.price} />
                            <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className="fw-bold">Số lượng kho</Form.Label>
                            <Form.Control type="number" {...register("stockQuantity")} isInvalid={!!errors.stockQuantity} />
                            <Form.Control.Feedback type="invalid">{errors.stockQuantity?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Danh mục</Form.Label>
                        <Form.Select {...register("categoryId")} isInvalid={!!errors.categoryId}>
                            <option value="">-- Chọn danh mục --</option>
                            {categories?.map(c => (
                                <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.categoryId?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Ảnh sản phẩm</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={uploadFile}
                            isInvalid={!!errors.imageUrl}
                        />
                        <Form.Control.Feedback type="invalid">{errors.imageUrl?.message}</Form.Control.Feedback>

                        {isLoading && <div className="text-success small mt-1">⏳ Đang tải ảnh...</div>}

                        {watch('imageUrl') && (
                            <div className="mt-2 text-center">
                                <img src={watch('imageUrl')} alt="preview"
                                    style={{ maxWidth: '200px', borderRadius: '8px' }}
                                    onError={(e) => e.target.value = 'none'}
                                    onLoad={(e) => e.target.value = 'inline_block'}
                                />
                            </div>
                        )}
                    </Form.Group>

                    <Form.Check
                        type="checkbox"
                        label="Sản phẩm bán chạy"
                        {...register("isBestSeller")}
                        className="fw-bold text-success"
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} className="rounded-3">
                        Hủy
                    </Button>
                    <Button type="submit" variant="success" className="px-4 rounded-3" disabled={isLoading}>
                        {isLoading ? "Đang xử lý..." : "Tạo ngay"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}