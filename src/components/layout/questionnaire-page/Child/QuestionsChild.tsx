import React from 'react'
import { SelectQuestion, InputQuestion, DatePickerQuestion } from './ComponentsChild'
import { UseFormReturn } from 'react-hook-form'
import {
  appealOptions,
  channelOptions,
  communicationFormatOptions,
  familyStatusOptions,
  genderOptions,
  serviceOptions,
} from '@/components/ui/forms/constants/selectOptions'
import { IQuestionnaireChildSchema } from '@/models/questionnaireChildSchema'

interface QuestionsProps {
  form: UseFormReturn<IQuestionnaireChildSchema>
}

export function QuestionsChild({ form }: QuestionsProps) {
  return (
    <>
      {/*#region ребенок*/}
      <InputQuestion form={form} name="lastName" label="Фамилия ребенка" />
      <InputQuestion form={form} name="firstName" label="Имя ребенка" />
      <InputQuestion form={form} name="secondName" label="Отчество ребенка" />
      <InputQuestion form={form} name="phoneNumber" label="Телефон ребенка" type="number" />
      <InputQuestion form={form} name="mail" label="Почта ребенка" />
      <SelectQuestion form={form} name="gender" label="Пол ребенка" options={genderOptions} />
      <InputQuestion
        form={form}
        name="adultRequestForTherapyDesiredOutcome"
        label="Желаемый результат от прохождения терапии от взрослого"
      />
      <InputQuestion
        form={form}
        name="childExplanationForSeeingPsychologist"
        label="Как ребенок объясняет причину своего посещения психолога?"
      />
      <InputQuestion form={form} name="childDesiredChanges" label="Что сам ребенок хотел изменить, если хотел?" />
      {/*#endregion*/}

      {/*#region 1 родитель*/}
      <InputQuestion form={form} name="firstParent.lastName" label="Фамилия первого родителя" />
      <InputQuestion form={form} name="firstParent.firstName" label="Имя первого родителя" />
      <InputQuestion form={form} name="firstParent.secondName" label="Отчество первого родителя" />
      <InputQuestion form={form} type={'number'} name="firstParent.phoneNumber" label="Телефон первого родителя" />
      <InputQuestion form={form} name="firstParent.mail" label="Почта первого родителя" />
      <SelectQuestion form={form} name="firstParent.gender" label="Пол первого родителя" options={genderOptions} />
      {/*#endregion*/}

      {/*#region 2 родитель*/}
      <InputQuestion form={form} name="secondParent.lastName" label="Фамилия второго родителя" />
      <InputQuestion form={form} name="secondParent.firstName" label="Имя второго родителя" />
      <InputQuestion form={form} name="secondParent.secondName" label="Отчество второго родителя" />
      <InputQuestion form={form} type={'number'} name="secondParent.phoneNumber" label="Телефон второго родителя" />
      <InputQuestion form={form} name="secondParent.mail" label="Почта второго родителя" />
      <SelectQuestion form={form} name="secondParent.gender" label="Пол второго родителя" options={genderOptions} />
      {/*#endregion*/}

      {/*#region прочее*/}
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
