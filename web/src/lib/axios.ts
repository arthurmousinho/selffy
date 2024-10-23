import { getToken } from "@/hooks/use-token";
import Axios from "axios";

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Authorization': 'Bearer ' + getToken()
    }
});