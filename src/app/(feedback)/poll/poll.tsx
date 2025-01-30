'use client'

import { Suspense } from 'react'
import { Survey } from '@/components/layout/poll-page/Survey'
import { Spinner } from '@/components/Spinner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetQuestionnaire } from '@/api/hooks/therapistQuestionnaires/useGetQuestionnaire'

export function Poll() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get('id')
  const token = searchParams.get('token')

  const { data, isLoading, isError } = useGetQuestionnaire(id, token)

  if (!id || !token) {
    router.push('/')
    return null
  }

  if (isLoading) {
    return <Spinner classname={'h-screen'} />
  }

  if (!data && isError) {
    return <h2 className="text-2xl font-bold h-screen flex items-center">Произошла ошибка!</h2>
  }

  if (data?.test) {
    return null
  }

  if (data) {
    return <Survey data={data} />
  }
}

export function PollWithSuspense() {
  return (
    <Suspense fallback={<Spinner />}>
      <Poll />
    </Suspense>
  )
}
