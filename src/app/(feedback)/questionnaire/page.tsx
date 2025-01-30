'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LayoutAdult } from '@/components/layout/questionnaire-page/Adult'
import { LayoutChild } from '@/components/layout/questionnaire-page/Child'
import { LayoutCouple } from '@/components/layout/questionnaire-page/Couple'

const types = ['CUSTOMER', 'CHILD', 'PAIR']

export default function QuestionnairePage() {
  const searchParams = useSearchParams()

  const router = useRouter()

  const type = searchParams.get('type')
  const token = searchParams.get('token')

  if (!type || !token || !types.includes(type)) {
    router.push('/')

    return null
  }

  return (
    <>
      {type === 'CUSTOMER' && <LayoutAdult token={token} />}
      {type === 'CHILD' && <LayoutChild token={token} />}
      {type === 'PAIR' && <LayoutCouple token={token} />}
    </>
  )
}
