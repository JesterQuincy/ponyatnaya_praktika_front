import { z } from 'zod'

export const questionnaireAdultSchema = z.object({
  lastName: z.string().optional(),
  firstName: z.string().min(1, 'Имя обязательно'),
  secondName: z.string().optional(),
  phoneNumber: z.string().min(1, 'Номер телефона обязателен'),
  mail: z.string().email('Введите корректный адрес электронной почты').or(z.literal('')).optional(),
  gender: z.string().min(1, 'Пол обязателен'),
  contactMethod: z.string().optional(),
  onlinePlatform: z.string().optional(),
  clientTherapyRequest: z.string().optional(),
  meetingTimeDay: z.string().optional(),
  birth: z.string().optional(),
  residenceAddress: z.string().optional(),
  priorityCommunicationChannel: z.string().optional(),
  peerRecommendation: z.string().optional(),
  familyStatus: z.string().optional(),
  takingMedic: z.string().optional(),
  prevExperience: z.string().optional(),
})
