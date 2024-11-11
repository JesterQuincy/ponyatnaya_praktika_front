'use client'

import { SelectAdult } from './SelectAdult'

import {
  appealOptions,
  familyStatusOptions,
  genderOptions,
  serviceOptions,
} from '../../../ui/forms/constants/selectOptions'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IClient } from '@/types/clients'
import { InputAdult } from '@/components/layout/card-page/Adult/InputAdult'
import { useCallback, useEffect, useState } from 'react'
import { useClientUpdate } from '@/api/hooks/card/useClientUpdate'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { clientSchema, IClientSchema } from '@/models/clientSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetLink } from '@/api/hooks/profile-link/useGetLink'
import { getLink } from '@/helpers/utils/getLink'

interface ICardFormProps {
  user: IClient
}

export function CardFormAdult({ user }: ICardFormProps) {
  const [isMore, setIsMore] = useState(false)
  const [isFormDirty, setIsFormDirty] = useState(false) // Состояние для отслеживания изменений
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
    },
  })

  const handleSubmit = (data: IClientSchema) => {
    try {
      mutate({ ...removeEmptyValues(data), id })

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
              <InputAdult form={form} name={'lastName'} label={'Фамилия'} />
              <InputAdult form={form} name={'firstName'} label={'Имя'} />
              <InputAdult form={form} name={'secondName'} label={'Отчество'} />
              <InputAdult type={'number'} form={form} name={'phoneNumber'} label={'Телефон'} />
              <InputAdult form={form} name={'mail'} label={'Почта'} />
              <SelectAdult form={form} options={genderOptions} name={'gender'} label={'Пол'} />
              <SelectAdult form={form} options={appealOptions} name={'contactMethod'} label={'Откуда обратился'} />
              {/*<InputCustom form={form} name={'clientTherapyRequest'} label={'Город'} />*/}
              <SelectAdult form={form} options={serviceOptions} name={'onlinePlatform'} label={'Площадка'} />
              <InputAdult form={form} name={'clientTherapyRequest'} label={'Первичный запрос'} />
              <InputAdult form={form} name={'meetingTimeDay'} label={'Фиксированное время встречи'} />
              {isMore && (
                <>
                  <InputAdult form={form} name={'birth'} label={'Дата рождения'} type="date" />
                  <InputAdult form={form} name={'residenceAddress'} label={'Адрес проживания'} />
                  <SelectAdult
                    form={form}
                    options={appealOptions}
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
                  {/*<InputCustom*/}
                  {/*  form={form}*/}
                  {/*  name={'offlineAddress'}*/}
                  {/*  label={*/}
                  {/*    'Прием медицинских препаратов оказывающих влияние на сознание/эмоциональное состояние клиента'*/}
                  {/*  }*/}
                  {/*/>*/}
                  {/*<InputCustom*/}
                  {/*  form={form}*/}
                  {/*  name={'offlineAddress'}*/}
                  {/*  label={'Предыдущий опыт получения психологической помощи'}*/}
                  {/*/>*/}
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
                  type={'button'}
                  onClick={() => {
                    return getLink(linkData, id)
                  }}
                  disabled={isPendingLink}
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
