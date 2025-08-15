import { z } from 'zod'

export const createNonWorkingDaySchema = z
  .object({
    title: z.string().refine((val) => !!val.trim(), 'Название обязательно'),
    dateStart: z
      .string({ error: 'Дата не может быть пустой' })
      .refine((val) => !isNaN(new Date(val).getTime()), 'Некорректная дата'),
    dateEnd: z
      .string({ error: 'Дата не может быть пустой' })
      .refine((val) => !isNaN(new Date(val).getTime()), 'Некорректная дата'),
  })
  .refine(
    (data) => {
      const start = new Date(data.dateStart)
      const end = new Date(data.dateEnd)
      return end >= start
    },
    {
      message: 'Дата окончания должна быть после даты начала',
      path: ['dateEnd'],
    },
  )
  .refine(
    (data) => {
      const start = new Date(data.dateStart)
      return start >= new Date(new Date().setHours(0, 0, 0, 0))
    },
    {
      message: 'Дата не может быть в прошлом',
      path: ['dateStart'],
    },
  )
  .refine(
    (data) => {
      const end = new Date(data.dateEnd)
      return end >= new Date(new Date().setHours(0, 0, 0, 0))
    },
    {
      message: 'Дата не может быть в прошлом',
      path: ['dateEnd'],
    },
  )
