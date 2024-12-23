import { z } from 'zod'

export const clientSchema = z.object({
  // #region Основное
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  secondName: z.string().min(1, 'Отчество обязательно'),
  phoneNumber: z.string().min(1, 'Телефон обязателен'),
  mail: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  gender: z.string().min(1, 'Пол обязателен'),
  clientStatus: z.string().min(1, 'Статус обязателен'),
  dateFirstRequest: z.string().optional(),
  dateFirstConsultation: z.string().optional(),
  meetingFormat: z.string().optional(),
  financialCondition: z.number().optional(),
  contactMethod: z.string().optional(),
  onlinePlatform: z.string().optional(),
  clientTherapyRequest: z.string().optional(),
  meetingTimeDay: z.string().optional(),
  // #endregion
  birth: z.string().optional(),
  residenceAddress: z.string().optional(),
  priorityCommunicationChannel: z.string().optional(),
  peerRecommendation: z.string().optional(),
  familyStatus: z.string().optional(),
  takingMedic: z.string().optional(),
  prevExperience: z.string().optional(),
  specialTermsContact: z.string().optional(),
  supervisionStatusThisClient: z.string().optional(),
  contactSupervisor: z.string().optional(),
  supervisionMaterial: z.string().optional(),
  notes: z.string().optional(),
})

export type IClientSchema = z.infer<typeof clientSchema>
