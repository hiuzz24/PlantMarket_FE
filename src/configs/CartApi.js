import privateApi from '../configs/PrivateApi'

const cartApi = {
    getCartByUser: async() => {
        const res = await privateApi.get('/cart');
        console.log(res.data);
        return res.data;
    },
    addToCart: async(data) => {
        const res = await privateApi.post('/cart/add',data);
        return res.data;
    },
    updateCart: async(data) => {
        const res = await privateApi.patch('/cart/update',data);
        return res.data;
    },
    removeItem: async(productId) => {
        const res = await privateApi.delete(`/cart/remove/${productId}`);
        return res.data;
    }
}
export default cartApi;