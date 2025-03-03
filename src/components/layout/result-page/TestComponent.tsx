import { Separator } from '@/components/ui/separator'
import React from 'react'
import { IQuestions } from '@/types/questionnaire'
import { Checkbox } from '@/components/ui/checkbox'

export const TestComponent = ({ q }: { q: IQuestions }) => {
  const correctAnswer = q.answerOptions.filter((o) => o.correct)
  const incorrectAnswer = q.answerOptions.filter((o) => !o.correct)

  return (
    <div className="p-4 border-none rounded-[6px] bg-white">
      <h3>Вопрос: {q.text}</h3>
      <Separator className="h-[1px] bg-[#CACACA] my-4" />
      <span>Ответы:</span>
      <div className="space-y-2 mt-2">
        {correctAnswer.map((ans) => (
          <div key={ans.id} className="flex items-center gap-2">
            <Checkbox checked={ans?.choice} />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex items-center gap-2 w-full">
              <span className="w-[20%]">Вариант правильный</span>
              <span>{ans?.text}</span>
            </div>
          </div>
        ))}
        {incorrectAnswer.map((ans) => (
          <div key={ans.id} className="flex items-center gap-2">
            <Checkbox checked={ans?.choice} />
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <div className="flex items-center gap-2 w-full">
              <span className="w-[20%]">Вариант неправильный</span>
              <span>{ans?.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
