export interface AuthForm {
  username: string
  password: string
}

export interface User {
  id: number
  name?: string
  email: string
  //Если надо чето-то в юзера
}

export interface AuthResponse {
  access: string
  user: User
  refresh: string
}
