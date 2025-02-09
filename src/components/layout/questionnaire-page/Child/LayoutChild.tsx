'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/buttons/Button'
import { Form } from '@/components/ui/form'
import { QuestionsChild } from '@/components/layout/questionnaire-page/Child/QuestionsChild'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IQuestionnaireChildSchema, questionnaireChildSchema } from '@/models/questionnaireChildSchema'
import { IQuestionnaireLayoutProps } from '@/components/layout/questionnaire-page/types'
import { useGetFormChild } from '@/api/hooks/profile-link/useGetFormChild'
import { useUpdateChildLink } from '@/api/hooks/profile-link/useUpdateChildLink'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { toast } from 'react-toastify'
import { Wrapper } from '@/components/layout/questionnaire-page/wrapper'

export function LayoutChild({ token }: IQuestionnaireLayoutProps) {
  const { data: child, isLoading: isChildLoading, isError } = useGetFormChild(token || '')
  const { mutateAsync, isPending: isUpdateLoading, isSuccess } = useUpdateChildLink()

  const form = useForm<IQuestionnaireChildSchema>({
    resolver: zodResolver(questionnaireChildSchema),
  })

  const onSubmit = async (data: IQuestionnaireChildSchema) => {
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
    if (child) {
      setTimeout(() => {
        reset({ ...removeEmptyValues(child) })
      }, 0)
    }
  }, [child, reset])

  return (
    <Wrapper isError={isError} isResponseLoading={isChildLoading} data={child} isSuccess={isSuccess}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <QuestionsChild form={form} />
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
