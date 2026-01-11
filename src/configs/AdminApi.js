import privateApi from "./PrivateApi";


 const adminApi = {
    getAllProduct:  async(page = 1,size = 5,selectedValue) => {
        const res = await privateApi.get(`/admin/product`,{
        params: {page,size,selectedValue}
        });
        console.log(res.data);
        return res.data;
    },

    getAllCategories: async() => {
        const res = await privateApi.get('/admin/categories');
        return res.data;
    }
}
    export default adminApi;