import QuestionnaireCard from '@/components/QuestionnaireCard'
import React, { FC, PropsWithChildren } from 'react'

interface IWrapperProps extends PropsWithChildren {
  isSuccess: boolean
  title: string
}

export const Wrapper: FC<IWrapperProps> = ({ title, children, isSuccess }) => {
  return (
    <div className="flex justify-center items-center my-auto py-5 min-h-screen h-full">
      {!isSuccess && <QuestionnaireCard title={title}>{children}</QuestionnaireCard>}
      {isSuccess && <h2 className="text-2xl font-bold flex items-center">Спасибо за заполнение материала!</h2>}
    </div>
  )
}
