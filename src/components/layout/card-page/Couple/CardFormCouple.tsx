'use client'

import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  appealOptions,
  channelOptions,
  communicationFormatOptions,
  familyStatusOptions,
  genderOptions,
  serviceOptions,
} from '@/components/ui/forms/constants/selectOptions'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { zodResolver } from '@hookform/resolvers/zod'
import { ICouple } from '@/types/couple'
import { InputCouple } from '@/components/layout/card-page/Couple/InputCouple'
import { SelectCouple } from '@/components/layout/card-page/Couple/SelectCouple'
import { coupleSchema, ICoupleSchema } from '@/models/coupleSchema'
import { useUpdateCouple } from '@/api/hooks/couple/useUpdateCouple'
import { useGetLink } from '@/api/hooks/profile-link/useGetLink'
import { getLink } from '@/helpers/utils/getLink'

interface ICardFormProps {
  user: ICouple
}

export const CardFormCouple = ({ user }: ICardFormProps) => {
  const [isMore, setIsMore] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false) // Состояние для отслеживания изменений
  const { mutate, isPending } = useUpdateCouple()
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
      secondCustomer: secondClientData,
      meetingFormat,
      onlinePlatform,
      meetingTimeDay,
      residenceAddress,
    },
  })

  const handleSubmit = (data: ICoupleSchema) => {
    try {
      mutate({ ...data, id })

      setIsFormDirty(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormChange = () => {
    setIsFormDirty(true) // Отмечаем, что были изменения в форме
  }

  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isFormDirty) {
        e.preventDefault()
      }
    },
    [isFormDirty],
  )

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [handleBeforeUnload, isFormDirty])

  return (
    <>
      <div className="bg-[#F1F1F1] px-[16px] py-[25px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px]">
        <Form {...form}>
          <form
            onChange={handleFormChange}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex justify-between">
            <div className="grid grid-cols-[auto_1fr] gap-y-[10px] gap-x-[49px]">
              {/*region: first client*/}
              <InputCouple form={form} name={'lastName'} label={'Фамилия первого клиента'} />
              <InputCouple form={form} name={'firstName'} label={'Имя первого клиента'} />
              <InputCouple form={form} name={'secondName'} label={'Отчество первого клиента'} />
              <InputCouple type={'number'} form={form} name={'phoneNumber'} label={'Телефон первого клиента'} />
              <InputCouple form={form} name={'mail'} label={'Почта первого клиента'} />
              <SelectCouple form={form} options={genderOptions} name={'gender'} label={'Пол первого клиента'} />
              <InputCouple
                form={form}
                name={'clientFirstRequestTherapyReason'}
                label={'Причина обращения первого клиента'}
              />
              <InputCouple
                form={form}
                name={'clientFirstRequestTherapyDesiredOutcome'}
                label={'Желаемый результат от прохождения терапии первого клиента'}
              />
              {/*endregion*/}

              {/*region: second client*/}
              <InputCouple form={form} name={'secondCustomer.lastName'} label={'Фамилия второго клиента'} />
              <InputCouple form={form} name={'secondCustomer.firstName'} label={'Имя второго клиента'} />
              <InputCouple form={form} name={'secondCustomer.secondName'} label={'Отчество второго клиента'} />
              <InputCouple
                type={'number'}
                form={form}
                name={'secondCustomer.phoneNumber'}
                label={'Телефон второго клиента'}
              />
              <InputCouple form={form} name={'secondCustomer.mail'} label={'Почта второго клиента'} />
              <SelectCouple
                form={form}
                options={genderOptions}
                name={'secondCustomer.gender'}
                label={'Пол второго клиента'}
              />
              <InputCouple
                form={form}
                name={'secondClientRequestTherapyReason'}
                label={'Причина обращения второго клиента'}
              />
              <InputCouple
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
              {/*endregion*/}

              {isMore && (
                <>
                  <InputCouple form={form} name={'birth'} label={'Дата рождения'} type="date" />
                  <InputCouple form={form} name={'residenceAddress'} label={'Адрес проживания'} />
                  <SelectCouple
                    form={form}
                    options={channelOptions}
                    name={'priorityCommunicationChannel'}
                    label={'Приоритетный канал коммуникации'}
                  />
                  <InputCouple form={form} name={'peerRecommendation'} label={'Коллегиальные рекомендации'} />
                  <SelectCouple
                    form={form}
                    options={familyStatusOptions}
                    name={'familyStatus'}
                    label={'Семейное положение'}
                  />
                  <InputCouple
                    form={form}
                    name={'residenceAddress'}
                    label={
                      'Прием медицинских препаратов оказывающих влияние на сознание/эмоциональное состояние клиента'
                    }
                  />
                  <InputCouple
                    form={form}
                    name={'residenceAddress'}
                    label={'Предыдущий опыт получения психологической помощи'}
                  />
                </>
              )}
            </div>
            <div className="ml-auto">
              <div className="w-full flex-col items-end px-4 flex">
                <button
                  type={'submit'}
                  className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px] mb-3 disabled:cursor-not-allowed disabled:bg-[#8E8E8E]"
                  disabled={
                    isPending || form.formState.isSubmitting || !form.formState.isValid || form.formState.isValidating
                  }>
                  Сохранить
                </button>
                <button
                  disabled={isPendingLink}
                  onClick={() => {
                    return getLink(linkData, id)
                  }}
                  type={'button'}
                  className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px]  disabled:cursor-not-allowed disabled:bg-[#8E8E8E]">
                  Ссылка на анкету
                </button>
              </div>
            </div>
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
