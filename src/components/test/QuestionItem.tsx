'use client'

import React, { useRef } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Grip, Trash2, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

import type { QuestionItemProps } from '@/helpers/types/testPoll'
import type { TestSchemaType } from '@/models/testSchema'

export function QuestionItem({ index, removeQuestion, dragHandleProps }: QuestionItemProps) {
  const { control, setValue, getValues, watch } = useFormContext<TestSchemaType>()

  // Массив вариантов для текущего вопроса
  const arrayName = `questions.${index}.answerOptions` as const

  // RHF создаёт стабильные ключи для рендера
  const { fields } = useFieldArray({
    control,
    name: arrayName,
    keyName: 'key',
  })

  // Наблюдаем текущее значение массива (для длины/лейблов)
  const answerOptions = watch(arrayName) ?? []

  // Временные id для новых вариантов (не конфликтуют с БД)
  const tmpIdRef = useRef(-1)

  const setCorrectAnswer = (answerIndex: number) => {
    const current = [...(getValues(arrayName) ?? [])]
    const updated = current.map((o, i) => ({ ...o, correct: i === answerIndex }))
    setValue(arrayName, updated, { shouldDirty: true, shouldValidate: true })
  }

  const addAnswerOption = () => {
    const current = [...(getValues(arrayName) ?? [])]
    const newOption = { id: tmpIdRef.current--, text: '', correct: false }
    setValue(arrayName, [...current, newOption], { shouldDirty: true })
  }

  // минимум 2 варианта, гарантируем что всегда есть хотя бы один correct
  const removeAnswerOption = (answerIndex: number) => {
    const current = [...(getValues(arrayName) ?? [])]
    if (current.length <= 2) return

    const updated = current.filter((_, i) => i !== answerIndex)
    if (!updated.some((o) => o.correct) && updated.length) {
      updated[0].correct = true
    }
    setValue(arrayName, updated, { shouldDirty: true, shouldValidate: true })
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
          {fields.map((field, i) => {
            const isCorrect = watch(`questions.${index}.answerOptions.${i}.correct`)
            return (
              <div key={field.key} className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full cursor-pointer transition ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  onClick={() => setCorrectAnswer(i)}
                />

                <FormField
                  control={control}
                  name={`questions.${index}.answerOptions.${i}.text`}
                  render={({ field: textField }) => (
                    <FormItem className="flex items-center gap-2 w-full">
                      <FormLabel className="w-[20%]">{isCorrect ? 'Правильный ответ' : 'Неправильный ответ'}</FormLabel>
                      <FormControl>
                        <Input {...textField} placeholder="Текст" className="w-full" />
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
            )
          })}
        </div>

        <Button type="button" variant="ghost" className="mt-3 flex items-center gap-2" onClick={addAnswerOption}>
          <PlusCircle width={18} height={18} />
          Добавить вариант
        </Button>
      </div>
    </div>
  )
}
