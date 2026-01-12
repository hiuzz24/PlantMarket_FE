import publicApi from '../configs/PublicApi'

const categoryApi = {
     getAllCategories: async() => {
        const res = await publicApi.get('/categories');
        console.log(res.data);
        
        return res.data;
    }
}
export default categoryApi;