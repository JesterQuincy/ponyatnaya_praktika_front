import { Spinner } from '@/components/Spinner'
import QuestionnaireCard from '@/components/QuestionnaireCard'
import React, { PropsWithChildren } from 'react'

interface IWrapperProps<T> extends PropsWithChildren {
  isError: boolean
  isResponseLoading: boolean
  data: T
  isSuccess: boolean
}

export const Wrapper = <T,>({ isError, isResponseLoading, data, children, isSuccess }: IWrapperProps<T>) => {
  return (
    <div className="flex justify-center items-center py-4">
      {isError && <h2 className="text-2xl font-bold h-screen flex items-center">Произошла ошибка!</h2>}
      {isResponseLoading && <Spinner classname="h-screen" />}
      {!isSuccess && !isResponseLoading && data && (
        <QuestionnaireCard title="Анкета клиента">{children}</QuestionnaireCard>
      )}
      {isSuccess && <h2 className="text-2xl font-bold h-screen flex items-center">Спасибо за заполнение анкеты!</h2>}
    </div>
  )
}
