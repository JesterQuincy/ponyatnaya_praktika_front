import React, { FC } from 'react'
import { Wrapper } from '@/components/layout/poll-page/Wrapper'
import { IQuestionnaireRequest, IQuestionnaireResult } from '@/types/questionnaire'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { testSchema } from '@/models/pollSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useSaveQuestionnaire } from '@/api/hooks/therapistQuestionnaires/useSaveQuestionnaire'

interface ITestProps {
  token: string
  data: IQuestionnaireRequest
}

export const Test: FC<ITestProps> = ({ data, token }) => {
  const { mutateAsync, isSuccess } = useSaveQuestionnaire()

  const form = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
    mode: 'onChange',
  })

  const onSubmit = async (formData: z.infer<typeof testSchema>) => {
    if (!data.id) return

    const result: IQuestionnaireResult = {
      questionnaireId: data.id,
      dateResult: new Date().toISOString(),
      clientChoices: formData.clientChoices.map((c) => ({
        answerOptionId: Number(c.answerOptionId),
      })),
    }

    try {
      await mutateAsync({ data: result, token })
    } catch {}
  }

  return (
    <Wrapper isSuccess={isSuccess} title={data.title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {data.questions.map((q, i) => {
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
