import axios from 'axios';
import {API_BASE_URL} from "./ApiConfig.ts";

export const validateJwt = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/validate-jwt`, { withCredentials: true });
        return response.data.user;
    } catch (error) {
        console.error('JWT validation failed:', error);
        throw error;
    }
};