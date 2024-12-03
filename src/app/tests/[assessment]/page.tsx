'use client'

import { Badge } from '@/components/ui/badge'
import { Heading } from '@/components/ui/Heading'
import { componentMap } from '@/helpers/constants/tests'
import { ETestType } from '@/helpers/types/tests'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: { assessment: 'test' | 'survey' | 'form' }
}

export default function Page({ params }: Props) {
  const { assessment } = params
  const type = ETestType[assessment]

  const { Form, ActionsPanel } = componentMap[assessment]

  return (
    <>
      <Link href="/tests" className="flex items-center gap-2 text-taupe">
        <ArrowLeft width={12} height={12} />
        <p className="text-xs underline">Все материалы</p>
      </Link>
      <Badge variant={assessment} className="font-medium mt-7 mb-2">
        {type}
      </Badge>
      <Heading title={`${type} по завершении терапии`} />
      <div className="flex justify-between items-start mt-5 gap-5">
        <div className="w-2/3 bg-grey rounded-[5px] py-3 px-4">
          <Form />
        </div>
        <div className="w-1/3 bg-grey rounded-[5px] py-3 px-4">
          <ActionsPanel />
        </div>
      </div>
    </>
  )
}
