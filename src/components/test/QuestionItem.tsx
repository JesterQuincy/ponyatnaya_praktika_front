'use client'

import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Grip, Trash2, PlusCircle } from 'lucide-react'
import { QuestionItemProps } from '@/helpers/types/testPoll'
import { TestSchemaType } from '@/models/testSchema'
import { Button } from '@/components/ui/button'

export function QuestionItem({ index, removeQuestion, dragHandleProps }: QuestionItemProps) {
  const { control, setValue, watch } = useFormContext<TestSchemaType>()

  const answerOptions = watch(`questions.${index}.answerOptions`)

  // Устанавливаем один вариант как правильный
  const setCorrectAnswer = (answerIndex: number) => {
    const updatedOptions = answerOptions.map((option, i) => ({
      ...option,
      correct: i === answerIndex, // Только этот вариант становится правильным
    }))

    setValue(`questions.${index}.answerOptions`, updatedOptions)
  }

  // Добавление нового варианта ответа
  const addAnswerOption = () => {
    const newOption = { id: 0, text: '', correct: false } // По умолчанию неправильный
    setValue(`questions.${index}.answerOptions`, [...answerOptions, newOption])
  }

  // Удаление варианта ответа (минимум 2 варианта, 1 правильный)
  const removeAnswerOption = (answerIndex: number) => {
    if (answerOptions.length <= 2) return // Запрещаем удалять, если их всего 2

    const updatedOptions = answerOptions.filter((_, i) => i !== answerIndex)

    // Если удаляемый вариант был правильным, делаем первый оставшийся правильным
    if (!updatedOptions.some((option) => option.correct)) {
      updatedOptions[0].correct = true
    }

    setValue(`questions.${index}.answerOptions`, updatedOptions)
  }

  return (
    <div className="space-y-2 p-4 border-none rounded-[6px] bg-white">
      <Grip color="gray" width={20} height={20} className="mx-auto cursor-grab outline-none" {...dragHandleProps} />
      <div className="flex items-center">
        <FormField
          control={control}
          name={`questions.${index}.text`}
          render={({ field }) => (
            <FormItem className="w-full border-b border-gray pb-4 flex items-center justify-between">
              <FormControl>
                <Input {...field} placeholder="Вопрос" className="w-[40vw]" />
              </FormControl>
              <Button type="button" variant="ghost" onClick={() => removeQuestion(index)}>
                <Trash2 width={22} height={22} color="gray" className="mb-2" />
              </Button>
            </FormItem>
          )}
        />
      </div>
      <div className="mt-4">
        <span className="font-medium text-[14px]">Варианты ответа:</span>
        <div className="space-y-2 mt-2">
          {answerOptions.map((option, i) => (
            <div key={option.id} className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  option.correct ? 'bg-green-500' : 'bg-red-500'
                }`}
                onClick={() => setCorrectAnswer(i)}
              />
              <FormField
                control={control}
                name={`questions.${index}.answerOptions.${i}.text`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 w-full">
                    <FormLabel className="w-[20%]">
                      {option.correct ? 'Правильный ответ' : 'Неправильный ответ'}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Текст" className="w-full" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {answerOptions.length > 2 && (
                <Button type="button" variant="ghost" onClick={() => removeAnswerOption(i)}>
                  <Trash2 width={18} height={18} color="gray" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="button" variant="ghost" className="mt-3 flex items-center gap-2" onClick={addAnswerOption}>
          <PlusCircle width={18} height={18} />
          Добавить вариант
        </Button>
      </div>
    </div>
  )
}
