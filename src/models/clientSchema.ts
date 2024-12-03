import { z } from 'zod'

export const clientSchema = z.object({
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  secondName: z.string().min(1, 'Отчество обязательно'),
  phoneNumber: z.string().min(1, 'Телефон обязателен'),
  mail: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  gender: z.string().min(1, 'Пол обязателен'),
  contactMethod: z.string().min(1, 'Поле обязательно для заполнения'),
  birth: z.string().min(1, 'Дата рождения обязательна'),
  residenceAddress: z.string().min(1, 'Адрес проживания обязателен'),
  priorityCommunicationChannel: z.string().min(1, 'Поле обязательно для заполнения'),
  peerRecommendation: z.string().min(1, 'Рекомендации обязательны'),
  familyStatus: z.string().min(1, 'Семейное положение обязательно'),
  meetingTimeDay: z.string().min(1, 'Время встречи обязательно'),
  onlinePlatform: z.string().min(1, 'Поле обязательно для заполнения'),
  clientTherapyRequest: z.string().min(1, 'Поле обязательно для заполнения'),
})

export type IClientSchema = z.infer<typeof clientSchema>
