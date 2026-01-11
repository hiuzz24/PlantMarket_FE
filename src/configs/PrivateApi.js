import axios from "axios";
import publicApi from '../configs/PublicApi';

const privateApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true

});

privateApi.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
}
);

privateApi.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await publicApi.post("/refreshToken",
                    {},
                    { withCredentials: true }
                );
                const newToken = res.data?.accessToken;
                localStorage.setItem('token', newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return privateApi(originalRequest);
            } catch (error) {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default privateApi;