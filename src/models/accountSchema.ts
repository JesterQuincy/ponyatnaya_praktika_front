import { z } from 'zod'

const diplomSchema = z.object({
  userId: z.number().optional(),
  photoDiploma: z.string(),
})

export const accountSchema = z.object({
  firstName: z.string().refine((val) => !!val.trim(), 'Имя обязательно'),
  secondName: z.string().optional().nullable(),
  lastName: z.string().refine((val) => !!val.trim(), 'Фамилия обязательна'),
  city: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  mail: z.string().email('Некорректный адрес электронной почты').optional().nullable(),
  specialization: z.string().optional().nullable(),
  professionalActivityDescription: z.string().optional().nullable(),
  education: z.string().optional().nullable(),
  userImage: z.string().optional().nullable(),
  userDiplomasList: z.array(diplomSchema).optional().nullable(),
})
