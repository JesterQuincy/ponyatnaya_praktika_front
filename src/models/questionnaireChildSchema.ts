import { z } from 'zod'

export const questionnaireChildSchema = z.object({
  lastName: z.string().min(1, 'Фамилия обязательна'),
  firstName: z.string().min(1, 'Имя обязательно'),
  secondName: z.string().min(1, 'Отчество обязательно'),
  phoneNumber: z.string().min(1, 'Номер телефона обязателен'),
  mail: z.string().email('Введите корректный адрес электронной почты'),
  gender: z.string().min(1, 'Пол обязателен'),
  clientTherapyRequest: z.string().optional(),
  adultRequestForTherapyReason: z.string().optional(),
  adultRequestForTherapyDesiredOutcome: z.string().optional(),
  childExplanationForSeeingPsychologist: z.string().optional(),
  childDesiredChanges: z.string().optional(),
  firstParent: z.object({
    lastName: z.string().min(1, 'Фамилия первого родителя обязательна'),
    firstName: z.string().min(1, 'Имя первого родителя обязательно'),
    secondName: z.string().min(1, 'Отчество первого родителя обязательно'),
    phoneNumber: z.string().min(1, 'Телефон первого родителя обязателен'),
    mail: z.string().email('Некорректный email первого родителя').min(1, 'Email первого родителя обязателен'),
    gender: z.string().min(1, 'Пол первого родителя обязателен'),
  }),
  secondParent: z
    .object({
      lastName: z.string().optional(),
      firstName: z.string().optional(),
      secondName: z.string().optional(),
      phoneNumber: z.string().optional(),
      mail: z.string().email('Некорректный email второго родителя').optional(),
      gender: z.string().optional(),
    })
    .optional(),
  payerFullName: z.string().optional(),
  contactMethod: z.string().optional(),
  onlinePlatform: z.string().optional(),
  meetingFormat: z.string().optional(),
  meetingTimeDay: z.string().optional(),
  residenceAddress: z.string().optional(),
  priorityCommunicationChannel: z.string().optional(),
  peerRecommendation: z.string().optional(),
  familyStatus: z.string().optional(),
  takingMedic: z.string().optional(),
  prevExperience: z.string().optional(),
  birth: z.string().optional(),
})

export type IQuestionnaireChildSchema = z.infer<typeof questionnaireChildSchema>
