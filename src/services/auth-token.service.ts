import Cookies from 'js-cookie';

export enum EnumTokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken'
}

export const getTokens = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
    const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN);

    return {
        accessToken: accessToken || null,
        refreshToken: refreshToken || null
    };
}

export const saveTokenStorage = (accessToken: string, refreshToken:string) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
        domain: 'localhost',
        sameSite: 'strict',
        expires: 1
    });
    Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
        domain: 'localhost',
        sameSite: 'strict',
        expires: 7,
    });
}

export const removeTokenStorage = () => {
    Cookies.remove('access_token');
}