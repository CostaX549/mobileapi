import axiosLib from "axios"
import { getToken } from "../services/TokenService";

const axios = axiosLib.create({
    baseURL: "http://192.168.0.72:80/api",
    headers: {
        Accept: "application/json"
    }
})

axios.interceptors.request.use(async (req) => {
    const token = await getToken()
    
    if(token !== null) {
        req.headers["Authorization"] = `Bearer ${token}`
    }

    return req;
})

export default axios;