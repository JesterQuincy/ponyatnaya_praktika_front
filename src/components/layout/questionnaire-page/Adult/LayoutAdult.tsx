'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/buttons/Button'
import { Form } from '@/components/ui/form'
import { QuestionsAdult } from '@/components/layout/questionnaire-page/Adult'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { questionnaireAdultSchema } from '@/models/questionnaireAdultSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IQuestionnaireLayoutProps } from '@/components/layout/questionnaire-page/types'
import { useGetFormCustomer } from '@/api/hooks/profile-link/useGetFormCustomer'
import { removeEmptyValues } from '@/helpers/utils/removeEmptyValues'
import { useUpdateCustomerLink } from '@/api/hooks/profile-link/useUpdateCustomerLink'
import { toast } from 'react-toastify'
import { Wrapper } from '@/components/layout/questionnaire-page/wrapper'

export function LayoutAdult({ token }: IQuestionnaireLayoutProps) {
  const { data: customer, isLoading: isLoadingCustomer, isError: isCustomerErr } = useGetFormCustomer(token || '')
  const { mutateAsync: updateCustomer, isPending: isUpdateLoading, isSuccess } = useUpdateCustomerLink()

  const form = useForm<z.infer<typeof questionnaireAdultSchema>>({
    resolver: zodResolver(questionnaireAdultSchema),
  })

  const {
    reset,
    formState: { isValid, isValidating },
    handleSubmit,
  } = form

  useEffect(() => {
    if (customer && !isLoadingCustomer) {
      setTimeout(() => {
        reset({ ...removeEmptyValues(customer) })
      }, 0)
    }
  }, [customer, isLoadingCustomer, reset])

  const onSubmit = async (data: z.infer<typeof questionnaireAdultSchema>) => {
    if (!token) return

    try {
      await updateCustomer({ data, token })

      toast.success('Анкета отправлена!')
    } catch {}
  }

  return (
    <Wrapper isError={isCustomerErr} isResponseLoading={isLoadingCustomer} isSuccess={isSuccess} data={customer}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <QuestionsAdult form={form} />
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
