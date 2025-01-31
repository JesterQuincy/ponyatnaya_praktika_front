'use client'

import { surveySchema } from '@/models/pollSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { IQuestionnaireRequest, IQuestionnaireResult } from '@/types/questionnaire'
import { useSaveQuestionnaire } from '@/api/hooks/therapistQuestionnaires/useSaveQuestionnaire'
import { Wrapper } from '@/components/layout/poll-page/Wrapper'

interface ISurveyProps {
  data: IQuestionnaireRequest
  token: string
}

export const Survey: FC<ISurveyProps> = ({ data, token }) => {
  const { mutateAsync, isSuccess } = useSaveQuestionnaire()

  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    mode: 'onChange',
    defaultValues: {
      clientChoices: data.questions.map((q) => ({
        answerOptionId: q.type === 'Развернутый ответ' ? String(q.answerOptions[0]?.id) : undefined,
        type: q.type === 'Развернутый ответ' ? 'Развернутый ответ' : undefined,
      })),
    },
  })

  const onSubmit = async (formData: z.infer<typeof surveySchema>) => {
    if (!data.id) return

    const result: IQuestionnaireResult = {
      questionnaireId: data.id,
      clientChoices: formData.clientChoices.flatMap((choice, index) => {
        const question = data.questions[index]

        if (question.type === 'Развернутый ответ') {
          return {
            text: choice.text || '', // добавляем текст, если это развернутый ответ
            answerOptionId: Number(choice.answerOptionId), // для развернутого ответа может быть answerOptionId == 0 или другое значение по умолчанию
          }
        } else {
          if (Array.isArray(choice.answerOptionId)) {
            return choice.answerOptionId.map((opt) => ({
              answerOptionId: Number(opt), // Преобразуем в число
            }))
          } else {
            return [
              {
                answerOptionId: Number(choice.answerOptionId), // Преобразуем в число
              },
            ]
          }
        }
      }),
    }

    try {
      await mutateAsync({ data: result, token })
    } catch {}
  }

  return (
    <Wrapper title={data.title} isSuccess={isSuccess}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {data.questions.map((q, i) => {
            if (q.type === 'Один из списка') {
              return (
                <FormField
                  key={q.id}
                  control={form.control}
                  name={`clientChoices.${i}.answerOptionId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-[18px]">
                        {i + 1}. {q.text}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value as string} // Явное приведение к типу string
                        >
                          {q.answerOptions.map((o) => (
                            <div key={o.id} className="flex items-center space-x-2 mt-2">
                              <RadioGroupItem value={String(o.id)} id={`option-${o.id}`} />
                              <label htmlFor={`option-${o.id}`}>{o.text}</label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              )
            }

            if (q.type === 'Несколько из списка') {
              return (
                <FormField
                  key={q.id}
                  control={form.control}
                  name={`clientChoices.${i}.answerOptionId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-[18px]">
                        {i + 1}. {q.text}
                      </FormLabel>
                      <div className="mt-2">
                        {q.answerOptions.map((o) => (
                          <FormField
                            key={o.id}
                            control={form.control}
                            name={`clientChoices.${i}.answerOptionId`}
                            render={({ field: checkboxField }) => (
                              <FormItem key={o.id} className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    id={String(o.id)}
                                    checked={((field.value as string[]) || []).includes(String(o.id))}
                                    onCheckedChange={(checked) => {
                                      const currentValues = (field.value as string[]) || []
                                      return checked
                                        ? field.onChange([...currentValues, String(o.id)])
                                        : field.onChange(currentValues.filter((v) => v !== String(o.id)))
                                    }}
                                    className="mt-2"
                                  />
                                </FormControl>
                                <label htmlFor={String(o.id)}>{o.text}</label>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              )
            }

            if (q.type === 'Развернутый ответ') {
              return (
                <FormField
                  key={q.id}
                  control={form.control}
                  name={`clientChoices.${i}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-[18px]">
                        {i + 1}. {q.text}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите ответ"
                          value={field.value || ''}
                          onChange={(val) => {
                            field.onChange(val)

                            form.setValue(`clientChoices.${i}.type`, 'Развернутый ответ', { shouldDirty: true })
                          }}
                          className="bg-white w-[20%] rounded-[6px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              )
            }

            return null
          })}

          <Button
            type="submit"
            className="mt-4 bg-taupe w-[15%] text-white hover:bg-taupe/80 rounded-[6px]"
            disabled={!form.formState.isValid || form.formState.isSubmitting}>
            Отправить
          </Button>
        </form>
      </Form>
    </Wrapper>
  )
}
