import publicApi from '../configs/PublicApi'

 const productApi = {
    getAllProduct:  async(page = 1,size = 5) => {
        const res = await publicApi.get(`/products`,{
        params: {page,size}
        });
        console.log(res.data);
        return res.data;
    }
}
    export default productApi;