import React from 'react'
import { SelectQuestion, InputQuestion, DatePickerQuestion } from './ComponentsAdult'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { questionnaireAdultSchema } from '@/models/questionnaireAdultSchema'
import {
  appealOptions,
  channelOptions,
  familyStatusOptions,
  genderOptions,
  serviceOptions,
} from '@/components/ui/forms/constants/selectOptions'

interface QuestionsProps {
  form: UseFormReturn<z.infer<typeof questionnaireAdultSchema>>
}

export function QuestionsAdult({ form }: QuestionsProps) {
  return (
    <>
      <InputQuestion form={form} name="lastName" label="Фамилия" />
      <InputQuestion form={form} name="firstName" label="Имя" />
      <InputQuestion form={form} name="secondName" label="Отчество" />
      <InputQuestion form={form} name="phoneNumber" label="Телефон" isPhone />
      <InputQuestion form={form} name="mail" label="Почта" />
      <SelectQuestion form={form} name="gender" label="Пол" options={genderOptions} />
      <SelectQuestion form={form} name="contactMethod" label="Откуда обратился" options={appealOptions} />
      <SelectQuestion form={form} name="onlinePlatform" label="Площадка" options={serviceOptions} />
      <InputQuestion form={form} name="clientTherapyRequest" label="Первичный запрос" textarea />
      <InputQuestion form={form} name="meetingTimeDay" label="Фиксированное время встречи" />
      <DatePickerQuestion form={form} name="birth" label="Дата рождения" />
      <InputQuestion form={form} name="residenceAddress" label="Адрес проживания" />
      <SelectQuestion
        form={form}
        name="priorityCommunicationChannel"
        label="Приоритетный канал коммуникации"
        options={channelOptions}
      />
      <InputQuestion form={form} name="peerRecommendation" label="Коллегиальные рекомендации" />
      <SelectQuestion form={form} name="familyStatus" label="Семейное положение" options={familyStatusOptions} />
      <InputQuestion
        form={form}
        name="takingMedic"
        label="Прием медицинских препаратов оказывающих влияние на сознание/эмоциональное состояние клиента"
      />
      <InputQuestion form={form} name="prevExperience" label="Предыдущий опыт получения психологической помощи" />
    </>
  )
}
