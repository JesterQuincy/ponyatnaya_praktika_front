'use client'

import QuestionnaireCard from '@/components/QuestionnaireCard'
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

interface ISurveyProps {
  data: IQuestionnaireRequest
}

export const Survey: FC<ISurveyProps> = ({ data }) => {
  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      clientChoices: data.questions.map(() => ({ answerOptionId: '' })),
    },
  })

  const onSubmit = (formData: z.infer<typeof surveySchema>) => {
    if (!data.id) return

    const result: IQuestionnaireResult = {
      questionnaireId: data.id,
      clientChoices: formData.clientChoices.map((choice) => ({
        answerOptionId: Number(choice.answerOptionId),
      })),
    }

    console.log(result)
  }

  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <QuestionnaireCard title={data.title}>
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
                          <RadioGroup onValueChange={field.onChange} value={field.value}>
                            {q.answerOptions.map((o) => (
                              <div key={o.id} className="flex items-center space-x-2 mt-2">
                                <RadioGroupItem value={String(o.id)} id="priorityYes" />
                                <label htmlFor="priorityYes">{o.text}</label>
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
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-bold text-[18px]">
                          {i + 1}. {q.text}
                        </FormLabel>
                        <div className="mt-2">
                          {q.answerOptions.map((o) => (
                            <FormField
                              key={o.id}
                              control={form.control}
                              name="favoriteColors"
                              render={({ field }) => (
                                <FormItem key={o.id} className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      id={String(o.id)}
                                      checked={(field.value || []).includes(String(o.id))}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), String(o.id)])
                                          : field.onChange((field.value || []).filter((v) => v !== String(o.id)))
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
                    name="support"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-[18px]">
                          {i + 1}. {q.text}
                        </FormLabel>
                        <FormItem className="mt-2">
                          <FormControl>
                            <Input
                              placeholder="Введите ответ"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="bg-white w-[20%] rounded-[6px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      </FormItem>
                    )}
                  />
                )
              }
            })}

            <Button
              type="submit"
              className="mt-4 bg-taupe w-[15%] text-white hover:bg-taupe/80 rounded-[6px]"
              disabled={!form.formState.isValid}>
              Отправить
            </Button>
          </form>
        </Form>
      </QuestionnaireCard>
    </div>
  )
}
