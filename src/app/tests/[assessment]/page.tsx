'use client'

import { componentMap } from '@/helpers/constants/tests'
import { ETestType } from '@/helpers/types/tests'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  params: { assessment: string }
}

export default function Page({ params }: Props) {
  const { assessment } = params

  const decodedAssessment = decodeURIComponent(assessment)
  const [typeKey, ...nameParts] = decodedAssessment.split('-')
  const name = nameParts.join(' ')

  const type = ETestType[typeKey as keyof typeof ETestType]
  const router = useRouter()

  if (!type) {
    router.push('/tests')
    return null
  }

  const { Form } = componentMap[typeKey as keyof typeof componentMap]

  return (
    <>
      <Link href="/tests" className="group flex items-center gap-2 text-taupe mb-4 w-fit">
        <ArrowLeft width={12} height={12} />
        <p className="text-xs group-hover:underline">Все материалы</p>
      </Link>
      <Form type={typeKey} name={name} />
    </>
  )
}
