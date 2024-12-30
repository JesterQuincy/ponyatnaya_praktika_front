'use client'

import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/ui/Heading'
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

  const [typeKey, ...nameParts] = assessment.split('-')
  const name = nameParts.join(' ')

  const type = ETestType[typeKey as keyof typeof ETestType]
  if (!type) {
    const router = useRouter()
    router.push('/tests')
    return null
  }

  const { Form, ActionsPanel } = componentMap[typeKey as keyof typeof componentMap]

  return (
    <>
      <Link href="/tests" className="flex items-center gap-2 text-taupe">
        <ArrowLeft width={12} height={12} />
        <p className="text-xs underline">Все материалы</p>
      </Link>
      <Heading title={`${type} по завершению терапии`} />
      <Form type={typeKey} name={name} />
    </>
  )
}
