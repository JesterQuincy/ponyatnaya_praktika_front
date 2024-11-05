import React, { FC } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { PopoverButton } from '@/components/popover-button'

enum ETestType {
  test = 'Тест',
  survey = 'Опрос',
  form = 'Анкета',
}

export interface ITestCardProps {
  type: 'test' | 'survey' | 'form'
  title: string
  date: string
}

export const TestCard: FC<ITestCardProps> = ({ type, title, date }) => {
  return (
    <Card className="bg-white border-none rounded-[6px] p-[10px]">
      <CardContent className="p-0 flex flex-col gap-y-[12px]">
        <div className="flex gap-[25px]">
          <Badge variant={type}>{ETestType[type]}</Badge>
          <Link href={''} className="text-[18px] text-[#EA660C] underline font-semibold">
            {title}
          </Link>
          <PopoverButton className="ml-auto">
            <div>Получить ссылку</div>
            <div>Просмотреть</div>
            <div>Редактировать</div>
            <div>Создать копию</div>
            <div>Архивировать</div>
          </PopoverButton>
        </div>
        <p className="font-medium text-[#7E7E7E] text-[12px]">
          Дата: <span className="text-black">{date}</span>
        </p>
      </CardContent>
    </Card>
  )
}
