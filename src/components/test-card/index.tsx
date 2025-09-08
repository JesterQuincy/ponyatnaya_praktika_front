import React, { FC, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { PopoverButton } from '@/components/popover-button'
import { ITestCardProps } from '@/helpers/types/tests'
import { useDeleteQuestionnaire } from '@/api/hooks/therapistQuestionnaires/useDeleteQuestionnaire'
import { CopyLinkModal } from '@/components/test-card/CopyLinkModal'
import dayjs from 'dayjs'

export const TestCard: FC<ITestCardProps> = ({ test, title, dateCreated, id }) => {
  const type = test ? 'test' : 'survey'

  const { mutate } = useDeleteQuestionnaire()

  const handleDelete = () => {
    mutate(id)
  }

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Card className="bg-white border-none rounded-[6px] p-[10px]">
      <CardContent className="p-0 flex flex-col gap-y-[12px]">
        <div className="flex gap-[25px]">
          <Badge variant={type}>{test ? 'Тест' : 'Опросник'}</Badge>
          <Link
            href={`/tests/${type}-${title}?id=${id}`}
            className="text-[18px] text-[#EA660C] underline font-semibold">
            {title}
          </Link>
          <PopoverButton className="ml-auto">
            <CopyLinkModal id={id} modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <div className="w-full" onClick={handleDelete}>
              Удалить
            </div>
          </PopoverButton>
        </div>
        <p className="font-medium text-[#7E7E7E] text-[12px]">
          Дата: <span className="text-black">{dayjs(dateCreated).format('DD-MM-YYYY')}</span>
        </p>
      </CardContent>
    </Card>
  )
}
