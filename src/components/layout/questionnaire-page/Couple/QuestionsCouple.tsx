import React from 'react'
import { SelectQuestion, InputQuestion, DatePickerQuestion } from './ComponentsCouple'
import { UseFormReturn } from 'react-hook-form'
import {
  appealOptions,
  channelOptions,
  communicationFormatOptions,
  familyStatusOptions,
  genderOptions,
  serviceOptions,
} from '@/components/ui/forms/constants/selectOptions'
import { IQuestionnaireCoupleSchema } from '@/models/questionnaireCoupleSchema'

interface QuestionsProps {
  form: UseFormReturn<IQuestionnaireCoupleSchema>
}

export function QuestionsCouple({ form }: QuestionsProps) {
  return (
    <>
      {/*region: first client*/}
      <InputQuestion form={form} name="lastName" label="Фамилия первого клиента" />
      <InputQuestion form={form} name="firstName" label="Имя первого клиента" />
      <InputQuestion form={form} name="secondName" label="Отчество первого клиента" />
      <InputQuestion form={form} name="phoneNumber" label="Телефон первого клиента" type="number" />
      <InputQuestion form={form} name="mail" label="Почта первого клиента" />
      <SelectQuestion form={form} name="gender" label="Пол первого клиента" options={genderOptions} />
      <InputQuestion form={form} name="clientFirstRequestTherapyReason" label="Причина обращения первого клиента" />
      <InputQuestion
        form={form}
        name="clientFirstRequestTherapyDesiredOutcome"
        label="Желаемый результат от прохождения терапии первого клиента"
      />
      {/*#endregion*/}

      {/*#region: second client*/}
      <InputQuestion form={form} name="secondPerson.lastName" label="Фамилия второго клиента" />
      <InputQuestion form={form} name="secondPerson.firstName" label="Имя второго клиента" />
      <InputQuestion form={form} name="secondPerson.secondName" label="Отчество второго клиента" />
      <InputQuestion form={form} type={'number'} name="secondPerson.phoneNumber" label="Телефон второго клиента" />
      <InputQuestion form={form} name="secondPerson.mail" label="Почта второго клиента" />
      <SelectQuestion form={form} name="secondPerson.gender" label="Пол второго клиента" options={genderOptions} />
      <InputQuestion form={form} name="secondClientRequestTherapyReason" label="Причина обращения второго клиента" />
      <InputQuestion
        form={form}
        name="clientSecondRequestTherapyDesiredOutcome"
        label="Желаемый результат от прохождения терапии второго клиента"
      />
      {/*#endregion*/}

      {/*#region common*/}
      <InputQuestion form={form} name="payerFullName" label="ФИО плательщика" />
      <SelectQuestion form={form} name="contactMethod" label="Откуда обратился" options={appealOptions} />
      <SelectQuestion form={form} name="onlinePlatform" label="Площадка" options={serviceOptions} />
      <SelectQuestion
        form={form}
        name="meetingFormat"
        label="Предпочтительный формат встречи"
        options={communicationFormatOptions}
      />
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
      {/*#endregion*/}
    </>
  )
}
