import React, { ReactNode } from 'react'

interface QuestionnaireCardProps {
  title: string
  children: ReactNode
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white px-10 rounded-xl shadow-md w-full max-w-screen-2xl py-4">
      <h1 className="text-[35px] font-bold mb-3 font-ebgaramond">{title}</h1>
      <div className="bg-grey px-8 py-3 rounded-[4px]">{children}</div>
    </div>
  )
}

export default QuestionnaireCard
