'use client'

import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import {
  answerOptions,
  appealOptions,
  channelOptions,
  communicationFormatOptions,
  familyStatusOptions,
  genderOptions,
  serviceOptions,
  statusOptions,
} from '@/components/ui/forms/constants/selectOptions'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { zodResolver } from '@hookform/resolvers/zod'
import { ICouple } from '@/types/couple'
import { SelectCouple, InputCouple, TextareaCouple } from '@/components/layout/card-page/Couple'
import { coupleSchema, ICoupleSchema } from '@/models/coupleSchema'
import { useUpdateCouple } from '@/api/hooks/couple/useUpdateCouple'
import { useGetLink } from '@/api/hooks/profile-link/useGetLink'
import { FormPrompt } from '@/components/form-prompt'
import { isEmpty } from '@/helpers/utils/isEmpty'
import { CardButtons } from '@/components/layout/card-page/CardButtons'

interface ICardFormProps {
  user: ICouple
}

export const CardFormCouple = ({ user }: ICardFormProps) => {
  const [isMore, setIsMore] = useState(false)

  const { mutate, isPending } = useUpdateCouple()
  // const { mutateAsync: linkData, isPending: isPendingLink } = useGetLink()

  const {
    lastName,
    firstName,
    secondName,
    phoneNumber,
    mail,
    gender,
    birth,
    id,
    clientFirstRequestTherapyReason,
    clientFirstRequestTherapyDesiredOutcome,
    secondClientRequestTherapyReason,
    clientSecondRequestTherapyDesiredOutcome,
    familyStatus,
    secondPerson,
    meetingFormat,
    onlinePlatform,
    meetingTimeDay,
    residenceAddress,
    dateFirstRequest,
    dateFirstConsultation,
    financialCondition,
    specialTermsContact,
    supervisionStatusThisClient,
    contactSupervisor,
    supervisionMaterial,
    fullNameCotherapy,
    phoneNumberCotherapy,
    mailCotherapy,
    financialTermsCotherapists,
    notes,
    clientStatus,
    contactMethod,
    priorityCommunicationChannel,
    peerRecommendation,
    takingMedic,
    prevExperience,
  } = {
    ...removeEmptyValues(user),
  }

  const secondClientData = useMemo(() => {
    return {
      lastName: secondPerson?.lastName,
      firstName: secondPerson?.firstName,
      secondName: secondPerson?.secondName,
      phoneNumber: secondPerson?.phoneNumber,
      mail: secondPerson?.mail,
      gender: secondPerson?.gender,
      birth: secondPerson?.birth,
      familyStatus: secondPerson?.familyStatus,
    }
  }, [secondPerson])

  const form = useForm<ICoupleSchema>({
    mode: 'onBlur',
    resolver: zodResolver(coupleSchema),
    defaultValues: {
      lastName,
      firstName,
      secondName,
      phoneNumber,
      mail,
      gender,
      birth,
      clientFirstRequestTherapyReason,
      clientFirstRequestTherapyDesiredOutcome,
      secondClientRequestTherapyReason,
      clientSecondRequestTherapyDesiredOutcome,
      familyStatus,
      secondPerson: secondClientData,
      meetingFormat,
      onlinePlatform,
      meetingTimeDay,
      residenceAddress,
      dateFirstRequest,
      dateFirstConsultation,
      financialCondition: String(financialCondition),
      specialTermsContact,
      supervisionStatusThisClient,
      contactSupervisor,
      supervisionMaterial,
      fullNameCotherapy,
      phoneNumberCotherapy,
      mailCotherapy,
      financialTermsCotherapists,
      notes,
      clientStatus,
      contactMethod,
      priorityCommunicationChannel,
      peerRecommendation,
      takingMedic,
      prevExperience,
    },
  })

  const handleSubmit = (data: ICoupleSchema) => {
    try {
      mutate({ ...data, financialCondition: Number(data.financialCondition), id })

      form.reset(data)
    } catch {}
  }

  const {
    formState: { isSubmitting, dirtyFields },
    handleSubmit: onSubmit,
  } = form

  const isSubmitLoading = isPending || isSubmitting || isEmpty(dirtyFields)

  return (
    <>
      <div className="bg-[#F1F1F1] px-[16px] py-[25px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px]">
        <FormPrompt hasUnsavedChanges={!isEmpty(dirtyFields)} />
        <Form {...form}>
          <form onSubmit={onSubmit(handleSubmit)} className="w-full flex justify-between">
            <div className="grid grid-cols-[auto_1fr] gap-y-[10px] gap-x-[49px]">
              {/*region: first client*/}
              <SelectCouple form={form} options={statusOptions} name={'clientStatus'} label={'Статус'} />
              <InputCouple form={form} name={'lastName'} label={'Фамилия первого клиента'} />
              <InputCouple form={form} name={'firstName'} label={'Имя первого клиента'} />
              <InputCouple form={form} name={'secondName'} label={'Отчество первого клиента'} />
              <InputCouple isPhone form={form} name={'phoneNumber'} label={'Телефон первого клиента'} />
              <InputCouple form={form} name={'mail'} label={'Почта первого клиента'} />
              <SelectCouple form={form} options={genderOptions} name={'gender'} label={'Пол первого клиента'} />
              <TextareaCouple
                form={form}
                name={'clientFirstRequestTherapyReason'}
                label={'Причина обращения первого клиента'}
              />
              <TextareaCouple
                form={form}
                name={'clientFirstRequestTherapyDesiredOutcome'}
                label={'Желаемый результат от прохождения терапии первого клиента'}
              />
              {/*endregion*/}

              {/*region: second client*/}
              <InputCouple form={form} name={'secondPerson.lastName'} label={'Фамилия второго клиента'} />
              <InputCouple form={form} name={'secondPerson.firstName'} label={'Имя второго клиента'} />
              <InputCouple form={form} name={'secondPerson.secondName'} label={'Отчество второго клиента'} />
              <InputCouple isPhone form={form} name={'secondPerson.phoneNumber'} label={'Телефон второго клиента'} />
              <InputCouple form={form} name={'secondPerson.mail'} label={'Почта второго клиента'} />
              <SelectCouple
                form={form}
                options={genderOptions}
                name={'secondPerson.gender'}
                label={'Пол второго клиента'}
              />
              <TextareaCouple
                form={form}
                name={'secondClientRequestTherapyReason'}
                label={'Причина обращения второго клиента'}
              />
              <TextareaCouple
                form={form}
                name={'clientSecondRequestTherapyDesiredOutcome'}
                label={'Желаемый результат от прохождения терапии второго клиента'}
              />
              {/*endregion*/}

              {/*region common*/}
              <InputCouple form={form} name={'payerFullName'} label={'ФИО плательщика'} />
              <SelectCouple form={form} options={appealOptions} name={'contactMethod'} label={'Откуда обратились'} />
              <SelectCouple form={form} options={serviceOptions} name={'onlinePlatform'} label={'Площадка'} />
              <SelectCouple
                form={form}
                options={communicationFormatOptions}
                name={'meetingFormat'}
                label={'Предпочтительный формат встречи'}
              />
              <InputCouple form={form} name={'meetingTimeDay'} label={'Фиксированное время встречи'} />
              <InputCouple form={form} name={'dateFirstRequest'} label={'Дата первого обращения'} type={'date'} />
              <InputCouple
                form={form}
                name={'dateFirstConsultation'}
                label={'Дата первой консультации'}
                type={'date'}
              />
              <InputCouple form={form} name={'financialCondition'} label={'Финансовые условия'} type={'number'} />
              {/*endregion*/}

              {isMore && (
                <>
                  <InputCouple form={form} name={'birth'} label={'Дата рождения'} type="date" />
                  <TextareaCouple form={form} name={'residenceAddress'} label={'Адрес проживания'} />
                  <SelectCouple
                    form={form}
                    options={channelOptions}
                    name={'priorityCommunicationChannel'}
                    label={'Приоритетный канал коммуникации'}
                  />
                  <TextareaCouple form={form} name={'peerRecommendation'} label={'Коллегиальные рекомендации'} />
                  <SelectCouple
                    form={form}
                    options={familyStatusOptions}
                    name={'familyStatus'}
                    label={'Семейное положение'}
                  />
                  <TextareaCouple
                    form={form}
                    name={'takingMedic'}
                    label={
                      'Прием медицинских препаратов оказывающих влияние на сознание/эмоциональное состояние клиента'
                    }
                  />
                  <TextareaCouple
                    form={form}
                    name={'prevExperience'}
                    label={'Предыдущий опыт получения психологической помощи'}
                  />
                  <TextareaCouple form={form} name={'specialTermsContact'} label={'Особые условия контракта'} />
                  <SelectCouple
                    form={form}
                    options={answerOptions}
                    name={'supervisionStatusThisClient'}
                    label={'Берется ли супервизия на данного клиента'}
                  />
                  <TextareaCouple form={form} name={'contactSupervisor'} label={'ФИО и контакты супервизора'} />
                  <TextareaCouple
                    form={form}
                    name={'supervisionMaterial'}
                    label={'Материал для следующих сеансов из супервизии'}
                  />
                  <InputCouple form={form} name={'fullNameCotherapy'} label={'ФИО ко-терапевта'} />
                  <InputCouple form={form} name={'phoneNumberCotherapy'} label={'Телефон ко-терапевта'} isPhone />
                  <InputCouple form={form} name={'mailCotherapy'} label={'Почта ко-терапевта'} type={'email'} />
                  <TextareaCouple
                    form={form}
                    name={'financialTermsCotherapists'}
                    label={'Условия распределения гонорара между ко-терапевтами'}
                  />
                  <TextareaCouple form={form} name={'notes'} label={'Заметки'} />
                </>
              )}
            </div>
            <CardButtons id={String(id)} isLoading={isSubmitLoading} />
          </form>
        </Form>
        {!isMore && (
          <button
            onClick={() => {
              setIsMore(true)
            }}
            className="mt-[11px] text-[#EA660C] underline underline-offset-[2.5px]">
            Подробнее
          </button>
        )}
      </div>
    </>
  )
}
