import { z } from 'zod'

export const questionnaireSchema = z.object({
  type: z.enum(['Взрослый', 'Детский'], {
    required_error: 'Выберите тип',
  }),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  patronymic: z.string().optional(),
  phone: z.string().min(1, 'Номер телефона обязателен'),
  email: z.string().email('Введите корректный адрес электронной почты'),
  gender: z.enum(['Мужчина', 'Женщина'], {
    required_error: 'Выберите пол',
  }),
  status: z.enum(['По запросу', 'Активный'], {
    required_error: 'Выберите статус',
  }),
  contactMethod: z.enum(['Мессенджер', 'Звонок', 'Email'], {
    required_error: 'Выберите способ обращения',
  }),
  firstContactDate: z
    .string()
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Введите дату в формате дд.мм.гггг')
    .optional(),
  firstConsultationDate: z
    .string()
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Введите дату в формате дд.мм.гггг')
    .optional(),
  meetingFormat: z.enum(['Онлайн', 'Офлайн'], {
    required_error: 'Выберите формат встречи',
  }),
  platform: z.enum(['Zoom', 'Skype', 'Google Meet'], {
    required_error: 'Выберите площадку',
  }),
  initialRequest: z.string().optional(),
  preferredTime: z.string().optional(),
  financialTerms: z.string().optional(),
})
