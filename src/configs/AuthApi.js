import privateApi from "./PrivateApi";
import publicApi from "./PublicApi"

const authApi = {
    login: async (email, password) => {
        const res = await publicApi.post("auth/login", { email, password });
        return res.data;
    },
    loginWithGoogle: async (googleToken) => {
        const res = await publicApi.post("/auth/google", {
            token: googleToken
        });
        return res.data;
    },
    logout: async () => {
        const res = await privateApi.post("auth/logout", {}, { withCredentials: true });
        return res.data;
    }
};
export default authApi;