import privateApi from "./PrivateApi"

const orderApi = {
     createOrder: async(data) => {
        const res = await privateApi.post("/order/create",data);
        return res.data;
    }
}
export default orderApi;