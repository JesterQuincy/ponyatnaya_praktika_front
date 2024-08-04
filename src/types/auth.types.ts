export interface AuthForm {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name?: string;
    email: string;
    //Если надо чето-то в юзера
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}