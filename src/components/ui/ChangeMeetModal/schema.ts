import z from 'zod'
import { EPaymentType } from '../AddMeetModal/types'
import dayjs from 'dayjs'
import { EMeetingFormat } from '@/types/clients'

export const baseSchema = z.object({
  paymentType: z.enum(EPaymentType).optional(),
  dateMeet: z
    .string({ error: 'Дата встречи обязательна' })
    .trim()
    .min(1, 'Дата встречи обязательна')
    .refine(
      (v) => {
        const d = dayjs(v, 'YYYY-MM-DD', true) // строгий парс из <input type="date">
        if (!d.isValid()) return false // на всякий случай
        return !d.isBefore(dayjs(), 'day') // не раньше сегодняшнего дня
      },
      { message: 'Дата встречи не может быть раньше текущей' },
    ),
  time: z.string({ error: 'Время встречи обязательно' }).trim().min(1, 'Время встречи обязательно'),
  duration: z
    .string()
    .min(1, 'Длительность обязательна')
    .transform((val, ctx) => {
      const num = Number(val)
      if (!Number.isInteger(num) || num <= 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Введите корректную длительность (целое число больше 0)',
        })
        return z.NEVER
      }
      return num
    }),
  formatMeet: z.enum(EMeetingFormat, { error: () => ({ message: 'Формат встречи обязателен' }) }),
  place: z.string({ error: 'Место встречи обязательно' }).trim().min(1, 'Место встречи обязательно'),
})
