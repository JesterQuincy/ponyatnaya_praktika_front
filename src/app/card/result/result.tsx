'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Heading } from '@/components/ui/Heading'
import Image from 'next/image'
import TaskIcon from '@/public/icon/task.svg'
import React from 'react'
import { useGetClientQuestionnaireResult } from '@/api/hooks/therapistQuestionnaires/useGetClientQuestionnaireResult'
import { TestComponent } from '@/components/layout/result-page/TestComponent'
import { Spinner } from '@/components/Spinner'
import { SurveyComponent } from '@/components/layout/result-page/SurveyComponent'

export const Result = () => {
  const params = useSearchParams()

  const id = params.get('id')
  const type = params.get('type')

  const router = useRouter()

  const { data, isLoading } = useGetClientQuestionnaireResult(Number(id))

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={data?.questionnaire.title} />
        <div
          className="flex items-center"
          onClick={() => {
            router.push('/tests')
          }}>
          <Image src={TaskIcon} alt="TaskIcon" className="mr-2" />
          <span className="text-[#EA660C] underline underline-offset-[3.5px] hover:cursor-pointer">
            К моим материалам
          </span>
        </div>
      </div>
      <div className="bg-grey rounded-[5px] py-3 px-4 space-y-2 mt-7">
        {data?.questionnaire.questions.map((q) => {
          if (type === 'test') {
            return <TestComponent key={q.id} q={q} />
          }

          return <SurveyComponent key={q.id} q={q} />
        })}
      </div>
    </>
  )
}

export const ResultWithSuspense = () => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Result />
    </React.Suspense>
  )
}
