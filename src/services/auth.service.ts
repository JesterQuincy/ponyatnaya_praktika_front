import {AuthForm, AuthResponse} from "@/types/auth.types";
import {axiosClassic} from "@/api/interceptors";
import {removeTokenStorage, saveTokenStorage} from "@/services/auth-token.service";

export const authService = {
    async main(type: 'login' | 'register', data: AuthForm){
        const response = await axiosClassic.post<AuthResponse>(
            `/auth/${type}`,
            data
        )
        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
        return response

    },

    async getNewToken() {
        const response = await axiosClassic.post<AuthResponse>(
            '/auth/login/access_token'
        )
        if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
        return response
    },

    async logout() {
        const response = await axiosClassic.post<boolean>(
            '/auth/logout',
        )
        if (response.data) removeTokenStorage()
        return response
    }
}