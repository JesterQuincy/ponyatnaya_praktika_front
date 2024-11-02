import React, { ReactNode } from 'react'

interface QuestionnaireCardProps {
  title: string
  children: ReactNode
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white py-[30px] px-10 rounded-xl shadow-md w-full max-w-screen-2xl">
      <h1 className="text-[35px] font-bold mb-8 font-ebgaramond">{title}</h1>
      <div className="bg-grey p-8">{children}</div>
    </div>
  )
}

export default QuestionnaireCard
