import { z } from 'zod'

export const coupleSchema = z.object({
  // Валидация для первого клиента
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  secondName: z.string().min(1, 'Отчество обязательно'),
  phoneNumber: z.string().min(1, 'Телефон ребенка обязателен'),
  mail: z.string().email('Некорректный email'),
  gender: z.string().min(1, 'Пол обязателен'),
  birth: z.string().min(1, 'Дата рождения обязательна'),
  clientFirstRequestTherapyReason: z.string().min(1, 'Причина обращения обязательна'),
  clientFirstRequestTherapyDesiredOutcome: z.string().min(1, 'Желаемый результат обязателен'),

  secondClientRequestTherapyReason: z.string().min(1, 'Причина обращения обязательна'),
  clientSecondRequestTherapyDesiredOutcome: z.string().min(1, 'Желаемый результат обязателен'),

  // Валидация для второго клиента
  secondCustomer: z.object({
    lastName: z.string().min(1, 'Фамилия второго клиента обязательна'),
    firstName: z.string().min(1, 'Имя второго клиента обязательно'),
    secondName: z.string().min(1, 'Отчество второго клиента обязательно'),
    phoneNumber: z.string().min(1, 'Телефон ребенка обязателен'),
    mail: z.string().email('Некорректный email'),
    gender: z.string().min(1, 'Пол обязателен'),
    // birth: z.string().min(1, 'Дата рождения второго клиента обязательна'),
    // familyStatus: z.string().min(1, 'Семейное положение второго клиента обязательно'),
  }),
  familyStatus: z.string().min(1, 'Семейное положение обязательно'),
  payerFullName: z.string().min(1, 'ФИО плательщика обязательное'),
  // contactMethod: z.enum(['phone', 'email', 'inPerson'], 'Метод связи обязателен'),
  // onlinePlatform: z.enum(['zoom', 'skype', 'googleMeet'], 'Площадка обязательна'),
  meetingFormat: z.string().min(1, 'Формат встречи обязателен'),
})

export type ICoupleSchema = z.infer<typeof coupleSchema>
