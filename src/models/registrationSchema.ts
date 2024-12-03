import { z } from 'zod'

export const registrationSchema = z
  .object({
    lastName: z.string().min(1, 'Фамилия не должна быть пустой'),
    name: z.string().min(1, 'Имя не должно быть пустым'),
    patronymic: z.string().optional(),
    username: z.string().min(1, 'Логин не должен быть пустым'),
    email: z.string().email('Некорректный адрес электронной почты'),
    password: z.string().min(3, 'Пароль должен быть не менее 3 символов'),
    confirmPassword: z.string().min(3, 'Подтверждение пароля обязательно'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли должны совпадать',
  })
