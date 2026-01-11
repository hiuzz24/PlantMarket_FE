import privateApi from "./PrivateApi";
import publicApi from "./PublicApi"

const authApi = {
    login: async (email, password) => {
        const res = await publicApi.post("/login",{
            email,password
        });
        return res.data;
    },
    logout: async() => {
        const res = await privateApi.post("/logout",
            {},
            {withCredentials: true}
        );
        return res.data;
    }
}
export default authApi;