import { GoogleCallbackResponse } from "@/types/auth";
import { API_BASE_URL } from "../constant";
import { userService } from "./userService";
import axios from "axios";

const API_URL = 'https://servislahserver-production.up.railway.app/api/v1'

// const API_URL = 'http://localhost:7878/api/v1'
export const loginWithGoogle = async (): Promise<string> => {
    const frontendCallbackUrl = `${window.location.origin}/auth/callback`;
    const response = await axios.get(`${API_URL}/auth/google/initiate`, {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            redirect_uri: frontendCallbackUrl
        }
    });

    if (response.status === 200) {
        const data = response.data;
        const authUrl = data.data.auth_url;
        return authUrl;
    }
    return '';
}


export const handleGoogleCallback = async (code: string): Promise<GoogleCallbackResponse | null> => {
    try {
        const response = await axios.get(`${API_URL}/auth/google/callback`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                code: code
            }
        });

        if (response.status === 200 && response.data.status === 'success') {
            const responseData = response.data.data.data;

            localStorage.setItem('access_token', responseData.backend_tokens.access_token);
            localStorage.setItem('refresh_token', responseData.backend_tokens.refresh_token);
            localStorage.setItem('user_id', responseData.user_id);

            return responseData;
        }
        return null;
    } catch (error) {
        console.error('Google callback error:', error);
        return null;
    }
}