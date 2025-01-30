import { z } from 'zod'

export const questionnaireCoupleSchema = z.object({
  // #region Валидация для первого клиента
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  secondName: z.string().min(1, 'Отчество обязательно'),
  phoneNumber: z.string().min(1, 'Телефон ребенка обязателен'),
  mail: z.string().email('Некорректный email'),
  gender: z.string().min(1, 'Пол обязателен'),
  clientFirstRequestTherapyReason: z.string().optional(),
  clientFirstRequestTherapyDesiredOutcome: z.string().optional(),
  // #endregion

  // #region Валидация для второго клиента
  secondPerson: z.object({
    lastName: z.string().min(1, 'Фамилия второго клиента обязательна'),
    firstName: z.string().min(1, 'Имя второго клиента обязательно'),
    secondName: z.string().min(1, 'Отчество второго клиента обязательно'),
    phoneNumber: z.string().min(1, 'Телефон ребенка обязателен'),
    mail: z.string().email('Некорректный email'),
    gender: z.string().min(1, 'Пол обязателен'),
  }),
  secondClientRequestTherapyReason: z.string().optional(),
  clientSecondRequestTherapyDesiredOutcome: z.string().optional(),
  // #endregion

  payerFullName: z.string().optional(),
  contactMethod: z.string().optional(),
  onlinePlatform: z.string().optional(),
  meetingFormat: z.string().optional(),
  meetingTimeDay: z.string().optional(),

  // #region Подробнее
  birth: z.string().optional(),
  residenceAddress: z.string().optional(),
  priorityCommunicationChannel: z.string().optional(),
  peerRecommendation: z.string().optional(),
  familyStatus: z.string().min(1, 'Семейное положение обязательно'),
  takingMedic: z.string().optional(),
  prevExperience: z.string().optional(),
  // #endregion
})

export type IQuestionnaireCoupleSchema = z.infer<typeof questionnaireCoupleSchema>
