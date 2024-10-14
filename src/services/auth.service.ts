import {AuthForm, AuthResponse} from "@/types/auth.types";
import {axiosClassic} from "@/api/interceptors";
import {removeTokenStorage, saveTokenStorage} from "@/services/auth-token.service";

export const authService = {
    async main( data: AuthForm){
        const response = await axiosClassic.post<AuthResponse>(
            `/auth/sign-in`,
            data
        )
        if (response.data.access) saveTokenStorage(response.data.access, response.data.refresh)
        return response

    },

    async getNewToken(refreshToken:string) {
        const response = await axiosClassic.post<AuthResponse>(
            '/auth/refresh',refreshToken
        )
        if (response.data.access) saveTokenStorage(response.data.access,response.data.refresh)
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