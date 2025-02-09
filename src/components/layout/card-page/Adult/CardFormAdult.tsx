'use client'

import {
  answerOptions,
  appealOptions,
  channelOptions,
  communicationFormatOptions,
  familyStatusOptions,
  genderOptions,
  serviceOptions,
  statusOptions,
} from '../../../ui/forms/constants/selectOptions'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IClient } from '@/types/clients'
import { useState } from 'react'
import { useClientUpdate } from '@/api/hooks/card/useClientUpdate'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { clientSchema, IClientSchema } from '@/models/clientSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetLink } from '@/api/hooks/profile-link/useGetLink'
import { FormPrompt } from '@/components/form-prompt'
import { isEmpty } from '@/helpers/utils/isEmpty'
import { InputAdult, SelectAdult } from '@/components/layout/card-page/Adult'
import { TextareaAdult } from '@/components/layout/card-page/Adult/TextareaAdult'
import { CardButtons } from '@/components/layout/card-page/CardButtons'

interface ICardFormProps {
  user: IClient
}

export function CardFormAdult({ user }: ICardFormProps) {
  const [isMore, setIsMore] = useState(false)

  const { mutate, isPending } = useClientUpdate()
  const { mutateAsync: linkData, isPending: isPendingLink } = useGetLink()

  const {
    lastName,
    firstName,
    secondName,
    phoneNumber,
    mail,
    gender,
    contactMethod,
    birth,
    residenceAddress,
    priorityCommunicationChannel,
    peerRecommendation,
    familyStatus,
    id,
    meetingTimeDay,
    takingMedic,
    prevExperience,
    clientStatus,
    dateFirstRequest,
    dateFirstConsultation,
    meetingFormat,
    financialCondition,
    specialTermsContact,
    supervisionStatusThisClient,
    contactSupervisor,
    supervisionMaterial,
    notes,
    onlinePlatform,
    clientTherapyRequest,
  } = { ...removeEmptyValues(user) }

  const form = useForm<IClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      lastName,
      firstName,
      secondName,
      phoneNumber,
      mail,
      gender,
      contactMethod,
      birth,
      residenceAddress,
      priorityCommunicationChannel,
      peerRecommendation,
      familyStatus,
      meetingTimeDay,
      takingMedic,
      prevExperience,
      clientStatus,
      dateFirstRequest,
      dateFirstConsultation,
      meetingFormat,
      financialCondition: String(financialCondition),
      specialTermsContact,
      supervisionStatusThisClient,
      contactSupervisor,
      supervisionMaterial,
      notes,
      onlinePlatform,
      clientTherapyRequest,
    },
  })

  const {
    formState: { isSubmitting, isValid, isValidating, dirtyFields },
    handleSubmit,
  } = form

  const onSubmit = (data: IClientSchema) => {
    try {
      mutate({ ...removeEmptyValues(data), financialCondition: Number(data.financialCondition), id })

      form.reset(data)
    } catch {}
  }

  const isSubmitLoading = isPending || isSubmitting || !isValid || isValidating || isEmpty(dirtyFields)

  return (
    <>
      <div className="bg-[#F1F1F1] px-[16px] py-[25px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px]">
        <FormPrompt hasUnsavedChanges={!isEmpty(dirtyFields)} />
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-between">
            <div className="grid grid-cols-[auto_1fr] gap-y-[10px] gap-x-[49px]">
              <InputAdult form={form} name={'lastName'} label={'Фамилия'} />
              <InputAdult form={form} name={'firstName'} label={'Имя'} />
              <InputAdult form={form} name={'secondName'} label={'Отчество'} />
              <InputAdult isPhone form={form} name={'phoneNumber'} label={'Телефон'} />
              <InputAdult form={form} name={'mail'} label={'Почта'} />
              <SelectAdult form={form} options={genderOptions} name={'gender'} label={'Пол'} />

              <SelectAdult form={form} options={statusOptions} name={'clientStatus'} label={'Статус'} />
              <InputAdult form={form} name={'dateFirstRequest'} label={'Дата первого обращения'} type={'date'} />
              <InputAdult form={form} name={'dateFirstConsultation'} label={'Дата первой консультации'} type={'date'} />
              <SelectAdult
                form={form}
                options={communicationFormatOptions}
                name={'meetingFormat'}
                label={'Предпочтительный формат встречи'}
              />
              <InputAdult form={form} name={'financialCondition'} label={'Финансовые условия'} type={'number'} />

              <SelectAdult form={form} options={appealOptions} name={'contactMethod'} label={'Откуда обратился'} />
              <SelectAdult form={form} options={serviceOptions} name={'onlinePlatform'} label={'Площадка'} />
              <InputAdult form={form} name={'clientTherapyRequest'} label={'Первичный запрос'} />
              <InputAdult form={form} name={'meetingTimeDay'} label={'Фиксированное время встречи'} />
              {isMore && (
                <>
                  <InputAdult form={form} name={'birth'} label={'Дата рождения'} type="date" />
                  <InputAdult form={form} name={'residenceAddress'} label={'Адрес проживания'} />
                  <SelectAdult
                    form={form}
                    options={channelOptions}
                    name={'priorityCommunicationChannel'}
                    label={'Приоритетный канал коммуникации'}
                  />
                  <SelectAdult
                    form={form}
                    options={familyStatusOptions}
                    name={'familyStatus'}
                    label={'Семейное положение'}
                  />
                  <InputAdult form={form} name={'peerRecommendation'} label={'Коллегиальные рекомендации'} />
                  <InputAdult
                    form={form}
                    name={'takingMedic'}
                    label={
                      'Прием медицинских препаратов оказывающих влияние на сознание/эмоциональное состояние клиента'
                    }
                  />
                  <InputAdult
                    form={form}
                    name={'prevExperience'}
                    label={'Предыдущий опыт получения психологической помощи'}
                  />

                  <InputAdult form={form} name={'specialTermsContact'} label={'Особые условия контракта'} />
                  <SelectAdult
                    form={form}
                    options={answerOptions}
                    name={'supervisionStatusThisClient'}
                    label={'Берется ли супервизия на данного клиента'}
                  />
                  <InputAdult form={form} name={'contactSupervisor'} label={'ФИО и контакты супервизора'} />
                  <InputAdult
                    form={form}
                    name={'supervisionMaterial'}
                    label={'Материал для следующих сеансов из супервизии'}
                  />
                  <TextareaAdult form={form} name={'notes'} label={'Заметки'} />
                </>
              )}
            </div>
            <CardButtons id={id} linkData={linkData} isPendingLink={isPendingLink} isLoading={isSubmitLoading} />
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
