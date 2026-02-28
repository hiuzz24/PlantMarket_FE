import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import adminApi from "../../configs/AdminApi";
import uploadImage from "../../configs/CloudinaryApi";


const productSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự").max(50),
  description: z.string().max(255, "Mô tả không quá 255 ký tự").optional(),
  price: z.coerce.number().positive("Giá phải lớn hơn 0"),
  stockQuantity: z.coerce.number().int().min(0, "Số lượng không được âm"),
  imageUrl: z.string().url("Định dạng link ảnh không hợp lệ").max(500),
  difficultyLevel: z.enum(["EASY", "MEDIUM", "HARD"]),
  isBestSeller: z.boolean().default(false),
  categoryId: z.coerce.number().min(1, "Vui lòng chọn dang mục"),
});

export default function UpdateProduct({ show, onHide, product, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        imageUrl: product.imageUrl,
        difficultyLevel: product.difficultyLevel,
        isBestSeller: product.isBestSeller === 1 || product.isBestSeller === true,
        categoryId: product.categoryId
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await adminApi.updateProduct(product.productId, data);
      onUpdate(product.productId, res);
      onHide();
      toast.success("Update Successful! 🌿")
    } catch (error) {
      console.log(error);
      toast.error(error?.response.message || "error");
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const uploadUrl = await uploadImage(file);
      setValue('imageUrl', uploadUrl, { shouldValidate: true });
    } catch (error) {
      console.log("UploadError", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onHide();
    reset(product);
  };

  const [categories,setCategories] = useState(null);

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
  }, []);

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered className="rounded-4">
      <Modal.Header closeButton>
        <Modal.Title>Update Plant: {product?.name}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formName">
              <Form.Label className="fw-bold">Tên cây</Form.Label>
              <Form.Control
                type="text"
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formDifficulty">
              <Form.Label className="fw-bold">Độ khó chăm sóc</Form.Label>
              <Form.Select {...register("difficultyLevel")} isInvalid={!!errors.difficultyLevel}>
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="fw-bold">Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              {...register("description")}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPrice">
              <Form.Label className="fw-bold">Giá (Decimal)</Form.Label>
              <Form.Control type="number" step="0.01" {...register("price")} isInvalid={!!errors.price} />
              <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formStock">
              <Form.Label className="fw-bold">Số lượng tồn</Form.Label>
              <Form.Control type="number" {...register("stockQuantity")} isInvalid={!!errors.stockQuantity} />
              <Form.Control.Feedback type="invalid">{errors.stockQuantity?.message}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group controlId="category">
            <Form.Label className="fw-bold">Danh mục</Form.Label>
            <Form.Select
              {...register('categoryId')}
              isInvalid={!!errors.categoryId}
            >
              {categories?.map(c => 
                <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label className="fw-bold">Ảnh sản phẩm</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={uploadFile}
              className="mb-2"
            />

            {isLoading && <div className="text-primary small mb-2">⏳ Đang tải ảnh...</div>}
          </Form.Group>

          <div className="mt-2 text-center">
            <img src={watch('imageUrl')} alt="preview"
              style={{ maxWidth: '200px', borderRadius: '8px' }}
              onError={(e) => e.target.value = 'none'}
              onLoad={(e) => e.target.value = 'inline_block'}
            />
          </div>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Sản phẩm bán chạy (Best Seller)"
              {...register("isBestSeller")}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} className="rounded-3">Hủy</Button>
          <Button type="submit" variant="success" className="rounded-3 px-4">Lưu thay đổi</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}