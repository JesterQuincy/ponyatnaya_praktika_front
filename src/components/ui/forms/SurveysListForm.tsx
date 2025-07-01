'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'

import TaskIcon from '@/public/icon/task.svg'

import { Button } from '../buttons/Button'
import { Pagination } from '../Pagination'

import { dateOption, typeOption } from './constants/selectOptions'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/Spinner'
import { Badge } from '@/components/ui/badge'
import { useClientQuestionnaires } from '@/api/hooks/therapistQuestionnaires/useClientQuestionnaires'

interface ICardFormProps {
  user: any
}

interface ISortState {
  date?: 'desc' | 'asc' | ''
  type?: 'desc' | 'asc' | ''
}

const pageSize = 7

export function SurveysListForm({ user }: ICardFormProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState<ISortState>()

  const router = useRouter()

  const { data, isLoading } = useClientQuestionnaires({
    offset: currentPage - 1,
    limit: pageSize,
    orderIsTest: sort?.type,
    orderDate: sort?.date,
    id: user?.id,
  })

  const totalPages = useMemo(() => {
    if (!data) return 1
    return Math.ceil(data.total / pageSize)
  }, [data])

  // Функция для смены страницы
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleSortChange = <K extends keyof ISortState>(key: K, value: ISortState[K]) => {
    setSort((prev) => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  return (
    <div className="flex gap-[15px]">
      <div className="bg-[#F1F1F1] w-[70%] px-[16px] py-[25px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px] flex flex-col justify-between gap-[25px] relative">
        {isLoading && <Spinner />}
        {data?.data.map((item) => (
          <div key={item.resultId} className="bg-white rounded-[6px] flex gap-[10px] px-[10px] py-[11px] relative">
            <div className="flex flex-col gap-[10px]">
              <Badge variant={item.test ? 'test' : 'survey'}>{item.test ? 'Тест' : 'Опросник'}</Badge>
              <span className="text-[12px] text-[#7E7E7E]">Дата: {item.dateResult}</span>
            </div>
            <div className="flex flex-col gap-[10px]">
              <span
                className="text-[#EA660C] text-[18px] font-bold underline underline-offset-[3.5px] cursor-pointer"
                onClick={() => {
                  router.push(`result?type=${item.test ? 'test' : 'survey'}&id=${item.resultId}`)
                }}>
                {item.questionnaireTitle}
              </span>
            </div>
          </div>
        ))}
        {data?.data && (
          <div className="mt-[10px]">
            <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
          </div>
        )}
      </div>
      <div className="w-[30%]">
        <div className="bg-[#F1F1F1] rounded-[4px] py-[29px] px-[11px]">
          <h2 className="text-center text-lg font-semibold mb-4">Панель сортировки</h2>
          <div className="flex flex-col gap-4">
            {/* Тип */}
            <div className="flex items-center gap-2">
              <label className="text-sm min-w-[70px]">Тип</label>
              <Select
                value={sort?.type}
                onValueChange={(value: string) => {
                  handleSortChange('type', value as ISortState['type'])
                }}>
                <SelectTrigger className="rounded-[6px] border-[#D9D9D9] bg-white gap-7 w-fit">
                  <SelectValue placeholder={'Выберите'} />
                </SelectTrigger>
                <SelectContent className="bg-white border-none rounded-[6px]">
                  {typeOption.map((el) => (
                    <SelectItem value={el.value} key={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Дата */}
            <div className="flex items-center gap-2">
              <label className="text-sm min-w-[70px]">Дата</label>
              <Select
                value={sort?.date}
                onValueChange={(value: string) => {
                  handleSortChange('date', value as ISortState['date'])
                }}>
                <SelectTrigger className="rounded-[6px] border-[#D9D9D9] gap-7 w-fit bg-white">
                  <SelectValue placeholder={'Выберите'} />
                </SelectTrigger>
                <SelectContent className="bg-white border-none rounded-[6px]">
                  {dateOption.map((el) => (
                    <SelectItem value={el.value} key={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Кнопки */}
            <div className="flex gap-4 mt-4">
              <Button
                className="border border-[#5A5A5A] text-[#5A5A5A] py-2 px-4 rounded-[6px]"
                onClick={() => {
                  setSort({ type: '', date: '' })
                }}>
                Сбросить сортировку
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-[20px]">
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
      </div>
    </div>
  )
}
