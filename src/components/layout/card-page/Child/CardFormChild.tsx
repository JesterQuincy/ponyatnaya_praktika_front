'use client'

import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { IChild } from '@/types/child'
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
import { SelectChild, InputChild } from '@/components/layout/card-page/Child'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { childSchema, IChildSchema } from '@/models/childSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateChild } from '@/api/hooks/child/useUpdateChild'
import { useGetLink } from '@/api/hooks/profile-link/useGetLink'
import { FormPrompt } from '@/components/form-prompt'
import { isEmpty } from '@/helpers/utils/isEmpty'
import { TextareaChild } from '@/components/layout/card-page/Child/TextareaChild'
import { CardButtons } from '@/components/layout/card-page/CardButtons'

type TParent = Pick<IChild['firstParent'], 'gender' | 'mail' | 'phoneNumber' | 'secondName' | 'firstName' | 'lastName'>

interface ICardFormProps {
  user: IChild
}

export const CardFormChild = ({ user }: ICardFormProps) => {
  const [isMore, setIsMore] = useState(false)

  const { mutate, isPending } = useUpdateChild()
  const { mutateAsync: linkData, isPending: isPendingLink } = useGetLink()

  const {
    lastName,
    firstName,
    secondName,
    phoneNumber,
    mail,
    gender,
    birth,
    id,
    clientStatus,
    adultRequestForTherapyReason,
    adultRequestForTherapyDesiredOutcome,
    childDesiredChanges,
    childExplanationForSeeingPsychologist,
    firstParent,
    secondParent,
    payerFullName,
    meetingFormat,
    onlinePlatform,
    meetingTimeDay,
    residenceAddress,
    priorityCommunicationChannel,
    familyStatus,
    takingMedic,
    prevExperience,
    peerRecommendation,
    contactMethod,
    financialCondition,
    specialTermsContact,
    supervisionStatusThisClient,
    contactSupervisor,
    supervisionMaterial,
    notes,
    dateFirstRequest,
    dateFirstConsultation,
  } = { ...removeEmptyValues(user) }

  const getParentValues = useCallback((parent: IChild['firstParent'] | IChild['secondParent']): TParent => {
    return {
      gender: parent?.gender,
      mail: parent?.mail,
      phoneNumber: parent?.phoneNumber,
      secondName: parent?.secondName,
      firstName: parent?.firstName,
      lastName: parent?.lastName,
    }
  }, [])

  const form = useForm<IChildSchema>({
    mode: 'onBlur',
    resolver: zodResolver(childSchema),
    defaultValues: {
      lastName,
      firstName,
      secondName,
      phoneNumber,
      mail,
      gender,
      birth,
      clientStatus,
      adultRequestForTherapyReason,
      adultRequestForTherapyDesiredOutcome,
      childDesiredChanges,
      childExplanationForSeeingPsychologist,
      firstParent: getParentValues(firstParent),
      secondParent: getParentValues(secondParent),
      payerFullName,
      meetingFormat,
      onlinePlatform,
      meetingTimeDay,
      residenceAddress,
      priorityCommunicationChannel,
      familyStatus,
      takingMedic,
      prevExperience,
      peerRecommendation,
      contactMethod,
      financialCondition: String(financialCondition),
      specialTermsContact,
      supervisionStatusThisClient,
      contactSupervisor,
      supervisionMaterial,
      notes,
      dateFirstRequest,
      dateFirstConsultation,
    },
  })

  const {
    formState: { isSubmitting, dirtyFields },
    handleSubmit: onSubmit,
  } = form

  const handleSubmit = (data: IChildSchema) => {
    try {
      mutate({ ...data, financialCondition: Number(data.financialCondition), id })

      form.reset(data)
    } catch {}
  }

  const isSubmitLoading = isPending || isSubmitting || isEmpty(dirtyFields)

  return (
    <>
      <div className="bg-[#F1F1F1] px-[16px] py-[25px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px]">
        <FormPrompt hasUnsavedChanges={!isEmpty(dirtyFields)} />
        <Form {...form}>
          <form onSubmit={onSubmit(handleSubmit)} className="w-full flex justify-between">
            <div className="grid grid-cols-[auto_1fr] gap-y-[10px] gap-x-[49px]">
              {/*region: child*/}
              <InputChild form={form} name={'lastName'} label={'Фамилия ребенка'} />
              <InputChild form={form} name={'firstName'} label={'Имя ребенка'} />
              <InputChild form={form} name={'secondName'} label={'Отчество ребенка'} />
              <InputChild isPhone form={form} name={'phoneNumber'} label={'Телефон ребенка'} />
              <InputChild form={form} name={'mail'} label={'Почта ребенка'} />
              <SelectChild form={form} options={genderOptions} name={'gender'} label={'Пол ребенка'} />
              <SelectChild form={form} options={statusOptions} name={'clientStatus'} label={'Статус'} />
              <TextareaChild
                form={form}
                name={'adultRequestForTherapyDesiredOutcome'}
                label={'Желаемый результат от прохождения терапии от взрослого'}
              />
              <TextareaChild
                form={form}
                name={'childExplanationForSeeingPsychologist'}
                label={'Как ребенок объясняет причину своего посещения психолога?'}
              />
              <TextareaChild
                form={form}
                name={'childDesiredChanges'}
                label={'Что сам ребенок хотел изменить, если хотел?'}
              />
              {/*endregion*/}
              {/*region: parent 1*/}
              <InputChild form={form} name={'firstParent.lastName'} label={'Фамилия первого родителя'} />
              <InputChild form={form} name={'firstParent.firstName'} label={'Имя первого родителя'} />
              <InputChild form={form} name={'firstParent.secondName'} label={'Отчество первого родителя'} />
              <InputChild
                type={'number'}
                form={form}
                name={'firstParent.phoneNumber'}
                label={'Телефон первого родителя'}
              />
              <InputChild form={form} name={'firstParent.mail'} label={'Почта первого родителя'} />
              <SelectChild
                form={form}
                options={genderOptions}
                name={'firstParent.gender'}
                label={'Пол первого родителя'}
              />
              {/*endregion*/}
              {/*region: parent 2*/}
              <InputChild form={form} name={'secondParent.lastName'} label={'Фамилия второго родителя'} />
              <InputChild form={form} name={'secondParent.firstName'} label={'Имя второго родителя'} />
              <InputChild form={form} name={'secondParent.secondName'} label={'Отчество второго родителя'} />
              <InputChild
                type={'number'}
                form={form}
                name={'secondParent.phoneNumber'}
                label={'Телефон второго родителя'}
              />
              <InputChild form={form} name={'secondParent.mail'} label={'Почта  второго родителя'} />
              <SelectChild
                form={form}
                options={genderOptions}
                name={'secondParent.gender'}
                label={'Пол второго родителя'}
              />
              {/*endregion*/}
              <InputChild form={form} name={'payerFullName'} label={'ФИО плательщика'} />
              <SelectChild form={form} options={appealOptions} name={'contactMethod'} label={'Откуда обратился'} />
              <SelectChild form={form} options={serviceOptions} name={'onlinePlatform'} label={'Площадка'} />
              <SelectChild
                form={form}
                options={communicationFormatOptions}
                name={'meetingFormat'}
                label={'Предпочтительный формат встречи'}
              />
              <InputChild form={form} name={'meetingTimeDay'} label={'Фиксированное время встречи'} />
              <InputChild form={form} name={'dateFirstRequest'} label={'Дата первого обращения'} type={'date'} />
              <InputChild form={form} name={'dateFirstConsultation'} label={'Дата первой консультации'} type={'date'} />
              <InputChild form={form} name={'financialCondition'} label={'Финансовые условия'} type={'number'} />
              {isMore && (
                <>
                  <InputChild form={form} name={'birth'} label={'Дата рождения'} type="date" />
                  <TextareaChild form={form} name={'residenceAddress'} label={'Адрес проживания'} />
                  <SelectChild
                    form={form}
                    options={channelOptions}
                    name={'priorityCommunicationChannel'}
                    label={'Приоритетный канал коммуникации'}
                  />
                  <TextareaChild form={form} name={'peerRecommendation'} label={'Коллегиальные рекомендации'} />
                  <SelectChild
                    form={form}
                    options={familyStatusOptions}
                    name={'familyStatus'}
                    label={'Семейное положение'}
                  />
                  <TextareaChild
                    form={form}
                    name={'takingMedic'}
                    label={
                      'Прием медицинских препаратов оказывающих влияние на сознание/эмоциональное состояние клиента'
                    }
                  />
                  <TextareaChild
                    form={form}
                    name={'prevExperience'}
                    label={'Предыдущий опыт получения психологической помощи'}
                  />
                  <InputChild form={form} name={'specialTermsContact'} label={'Особые условия контракта'} />
                  <SelectChild
                    form={form}
                    options={answerOptions}
                    name={'supervisionStatusThisClient'}
                    label={'Берется ли супервизия на данного клиента'}
                  />
                  <TextareaChild form={form} name={'contactSupervisor'} label={'ФИО и контакты супервизора'} />
                  <TextareaChild
                    form={form}
                    name={'supervisionMaterial'}
                    label={'Материал для следующих сеансов из супервизии'}
                  />
                  <TextareaChild form={form} name={'notes'} label={'Заметки'} />
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
