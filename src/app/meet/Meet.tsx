'use client'

import { Heading } from '@/components/ui/Heading'
import { MeetForm } from '@/components/ui/forms/MeetForm/MeetForm'
import styles from '@/styles/card.module.css'
import { useGetMeeting } from '@/api/hooks/meet/useGetMeeting'
import { useSearchParams } from 'next/navigation'
import { Spinner } from '@/components/Spinner'
import { Suspense } from 'react'

export function Meet() {
  const id = useSearchParams().get('id')

  const { data, isPending } = useGetMeeting(id ?? '')

  const meet = data?.data

  return (
    <div className={styles.card}>
      {isPending && <Spinner />}
      {!isPending && meet && (
        <>
          <Heading title={meet?.nameMeet} />
          <MeetForm meetData={meet} />
        </>
      )}
    </div>
  )
}

// для того чтобы useSearchParams корректно отрабатывал
export function MeetWithSuspense() {
  return (
    <Suspense fallback={<Spinner />}>
      <Meet />
    </Suspense>
  )
}
