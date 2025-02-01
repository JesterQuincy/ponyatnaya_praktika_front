import { Separator } from '@/components/ui/separator'
import React from 'react'
import { IQuestions } from '@/types/questionnaire'
import { Checkbox } from '@/components/ui/checkbox'

export const SurveyComponent = ({ q }: { q: IQuestions }) => {
  return (
    <div className="p-4 border-none rounded-[6px] bg-white">
      <h3>Вопрос: {q.text}</h3>
      <Separator className="h-[1px] bg-[#CACACA] my-4" />
      <p className="mb-4">Ответ:</p>
      {q.answerOptions.map((o) => {
        if (q.type === 'Развернутый ответ') {
          return (
            <div key={o.id} className="flex items-center gap-2 mt-2">
              <span>{o.text}</span>
            </div>
          )
        }

        return (
          <div key={o.id} className="flex items-center gap-2 mt-2">
            <Checkbox checked={o.choice} />
            <span>{o.text}</span>
          </div>
        )
      })}
    </div>
  )
}
