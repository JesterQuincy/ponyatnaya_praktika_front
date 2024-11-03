import React from 'react'
import { SelectQuestion, InputQuestion, DatePickerQuestion } from './QuestionComponents'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { questionnaireSchema } from '@/models/questionnaireSchema'

interface QuestionsProps {
  form: UseFormReturn<z.infer<typeof questionnaireSchema>>
}

export function Questions({ form }: QuestionsProps) {
  return (
    <>
      <SelectQuestion form={form} name="type" label="Тип" options={['Взрослый', 'Детский']} />
      <InputQuestion form={form} name="lastName" label="Фамилия" />
      <InputQuestion form={form} name="firstName" label="Имя" />
      <InputQuestion form={form} name="patronymic" label="Отчество" />
      <InputQuestion form={form} name="phone" label="Телефон" />
      <InputQuestion form={form} name="email" label="Почта" />
      <SelectQuestion form={form} name="gender" label="Пол" options={['Мужчина', 'Женщина']} />
      <SelectQuestion form={form} name="status" label="Статус" options={['По запросу', 'Активный']} />
      <SelectQuestion form={form} name="contactMethod" label="Как обратился" options={['Мессенджер', 'Звонок']} />
      <DatePickerQuestion form={form} name="firstContactDate" label="Дата первого обращения" />
      <DatePickerQuestion form={form} name="firstConsultationDate" label="Дата первой консультации" />
      <SelectQuestion
        form={form}
        name="meetingFormat"
        label="Предпочтительный формат встречи"
        options={['Онлайн', 'Офлайн']}
      />
      <InputQuestion form={form} name="initialRequest" label="Первичный запрос" textarea />
      <InputQuestion form={form} name="preferredTime" label="Фиксированное время встречи" />
      <InputQuestion form={form} name="financialTerms" label="Финансовые условия" />
    </>
  )
}
