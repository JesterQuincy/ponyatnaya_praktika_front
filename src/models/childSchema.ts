import { z } from 'zod'

export const childSchema = z.object({
  lastName: z.string().min(1, 'Фамилия ребенка обязательна'),
  firstName: z.string().min(1, 'Имя ребенка обязательно'),
  secondName: z.string().min(1, 'Отчество ребенка обязательно'),
  phoneNumber: z.string().min(1, 'Телефон ребенка обязателен'),
  mail: z.string().email('Некорректный email'),
  gender: z.string().min(1, 'Пол ребенка обязателен'),
  clientStatus: z.string().min(1, 'Статус ребенка обязателен'),
  adultRequestForTherapyReason: z.string().min(1, 'Запрос на терапию обязателен'),
  adultRequestForTherapyDesiredOutcome: z.string().min(1, 'Желаемый результат обязателен'),
  childExplanationForSeeingPsychologist: z.string().min(1, 'Причина посещения обязана быть заполнена'),
  childDesiredChanges: z.string().min(1, 'Желаемые изменения обязаны быть заполнены'),
  firstParent: z.object({
    lastName: z.string().min(1, 'Фамилия первого родителя обязательна'),
    firstName: z.string().min(1, 'Имя первого родителя обязательно'),
    secondName: z.string().min(1, 'Отчество первого родителя обязательно'),
    phoneNumber: z.string().min(1, 'Телефон первого родителя обязателен'),
    mail: z.string().email('Некорректный email первого родителя'),
    gender: z.string().min(1, 'Пол первого родителя обязателен'),
  }),
  secondParent: z.object({
    lastName: z.string().min(1, 'Фамилия второго родителя обязательна'),
    firstName: z.string().min(1, 'Имя второго родителя обязательно'),
    secondName: z.string().min(1, 'Отчество второго родителя обязательно'),
    phoneNumber: z.string().min(1, 'Телефон второго родителя обязателен'),
    mail: z.string().email('Некорректный email второго родителя'),
    gender: z.string().min(1, 'Пол второго родителя обязателен'),
  }),
  payerFullName: z.string().min(1, 'ФИО плательщика обязательно'),
  birth: z.string().min(1, 'Дата рождения обязательна'),
})

export type IChildSchema = z.infer<typeof childSchema>
