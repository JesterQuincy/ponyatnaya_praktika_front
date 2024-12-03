'use client'

import React from 'react'
import QuestionnaireCard from '@/components/QuestionnaireCard'
import { Button } from '@/components/ui/buttons/Button'
import { Form } from '@/components/ui/form'
import { Questions } from '@/components/layout/questionnaire-page/Questions'
import { useQuestionnaireForm } from '@/helpers/hooks/forms/useQuestionnaireForm'

export default function QuestionnairePage() {
  const { form, onSubmit } = useQuestionnaireForm()

  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <QuestionnaireCard title="Опрос по завершении терапии">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <Questions form={form} />
            <Button
              type="submit"
              className="bg-taupe w-[15%] py-1.5 text-white hover:bg-taupe/80 disabled:bg-taupe/80 rounded-[6px]"
              disabled={!form.formState.isValid}>
              Отправить
            </Button>
          </form>
        </Form>
      </QuestionnaireCard>
    </div>
  )
}
