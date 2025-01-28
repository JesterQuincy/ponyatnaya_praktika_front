'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/buttons/Button'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IQuestionnaireCoupleSchema, questionnaireCoupleSchema } from '@/models/questionnaireCoupleSchema'
import { QuestionsCouple } from '@/components/layout/questionnaire-page/Couple/QuestionsCouple'
import { IQuestionnaireLayoutProps } from '@/components/layout/questionnaire-page/types'
import { useGetFormCouple } from '@/api/hooks/profile-link/useGetFormCouple'
import { useUpdateCoupleLink } from '@/api/hooks/profile-link/useUpdateCoupleLink'
import { toast } from 'react-toastify'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { Wrapper } from '@/components/layout/questionnaire-page/wrapper'

export function LayoutCouple({ token }: IQuestionnaireLayoutProps) {
  const { data: couple, isLoading: isCoupleLoading, isError } = useGetFormCouple(token || '')
  const { mutateAsync, isPending: isUpdateLoading, isSuccess } = useUpdateCoupleLink()

  const form = useForm<IQuestionnaireCoupleSchema>({
    resolver: zodResolver(questionnaireCoupleSchema),
  })

  const onSubmit = async (data: IQuestionnaireCoupleSchema) => {
    if (!token) return

    try {
      await mutateAsync({ data, token })

      toast.success('Анкета отправлена!')
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  const {
    reset,
    formState: { isValid, isValidating },
    handleSubmit,
  } = form

  useEffect(() => {
    if (couple) {
      reset({ ...removeEmptyValues(couple) })
    }
  }, [couple, reset])

  return (
    <Wrapper isError={isError} isResponseLoading={isCoupleLoading} data={couple} isSuccess={isSuccess}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <QuestionsCouple form={form} />
          <Button
            type="submit"
            className="bg-taupe w-[15%] py-1.5 text-white hover:bg-taupe/80 disabled:bg-taupe/80 rounded-[6px]"
            disabled={!isValid || isValidating || isUpdateLoading}>
            Отправить
          </Button>
        </form>
      </Form>
    </Wrapper>
  )
}
