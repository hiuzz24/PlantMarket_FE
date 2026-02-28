import { size } from "zod";
import privateApi from "./PrivateApi";


const adminApi = {
    getAllProduct: async (page = 0, size = 5, selectedValue, status) => {
        const res = await privateApi.get(`/admin/product`, {
            params: { page, size, selectedValue, status }
        });
        console.log(res.data);
        return res.data;
    },

    getAllCategories: async () => {
        const res = await privateApi.get('/admin/categories');
        return res.data;
    },

    getAllOrders: async (page = 0, size = 5, searchTerm, statusFilter, startDate, endDate) => {
        const res = await privateApi.get('/admin/orders',
            { params: { page, size, searchTerm, statusFilter, startDate, endDate } }
        );
        console.log(res.data);
        return res.data;
    },

    updateProduct: async (productId, data) => {
        const res = await privateApi.put(`/admin/product/update/${productId}`, data);
        return res.data;
    },

    toggleDeleteStatus: async (productId) => {
        const res = await privateApi.patch(`/admin/product/toggleDeleteStatus/${productId}`);
        return res.data;
    },

    createProduct: async (data) => {
        const res = await privateApi.post(`/admin/product/newProduct`, data);
        return res.data;
    },

    updateOrderStatus: async (orderId, newStatus) => {
        const res = await privateApi.patch(`/admin/orders/changeStatus/${orderId}`,null,{
            params: {newStatus: newStatus}
        });
        return res.data;
    },

    getOrderById: async (orderId) => {
        const res = await privateApi.get(`/admin/orders/getOrderById/${orderId}`);
        return res.data;
    }
}
export default adminApi;