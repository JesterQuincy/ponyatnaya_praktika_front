'use client'

import React, { useState } from 'react'
import { Calendar } from '@/app/calendar/Calendar'
import { Heading } from '@/components/ui/Heading'
import { Wrapper } from '@/components/wrapper'
import Select, { SingleValue } from 'react-select'
import { ITestCardProps, TestCard } from '@/components/test-card'
import { DropdownIndicator } from '@/components/drop-down-indicator'

interface ISort {
  type: IValueLabelModel
  date: IValueLabelModel
}

interface IValueLabelModel {
  value: string
  label: string
}

const initialSortValue: ISort = {
  type: { value: 'Тест', label: 'Тест' },
  date: { value: 'Раньше', label: 'Раньше' },
}

const typeOption = [
  {
    value: 'Тест',
    label: 'Тест',
  },
  {
    value: 'Опрос',
    label: 'Опрос',
  },
]

const dateOption = [
  {
    value: 'Раньше',
    label: 'Раньше',
  },
  {
    value: 'Позже',
    label: 'Позже',
  },
]

const cardData = [
  {
    id: 1,
    title: 'Тест по завершению терапии',
    type: 'test',
    date: '20.12.2024',
  },
  {
    id: 2,
    title: 'Опрос по завершению терапии',
    type: 'survey',
    date: '20.12.2024',
  },
  {
    id: 3,
    title: 'Тест промежуточный результат',
    type: 'test',
    date: '20.12.2024',
  },
  {
    id: 4,
    title: 'Опрос промежуточный результат',
    type: 'survey',
    date: '20.12.2024',
  },
  {
    id: 5,
    title: 'Анкета определения мотивации',
    type: 'form',
    date: '20.12.2024',
  },
]
const TestsPage = () => {
  const [sort, setSort] = useState<ISort>(initialSortValue)

  const handleSortChange = (key: keyof ISort, value: SingleValue<IValueLabelModel>) => {
    setSort((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Calendar>
      <Wrapper>
        <Heading title="Опросники и тесты" />
        <div className="flex gap-[28px] mt-[31px] mb-[8px]">
          <div className="flex gap-[8px] items-center">
            <p>Сортировать по типу</p>{' '}
            <Select
              value={sort.type}
              onChange={(value) => {
                handleSortChange('type', value)
              }}
              options={typeOption}
              styles={{
                indicatorSeparator: () => ({ display: 'none' }),
              }}
              components={{ DropdownIndicator }}
            />
          </div>
          <div className="flex gap-[8px] items-center">
            <p>По дате создания</p>{' '}
            <Select
              value={sort.date}
              onChange={(value) => {
                handleSortChange('date', value)
              }}
              options={dateOption}
              styles={{
                indicatorSeparator: () => ({ display: 'none' }),
              }}
              components={{ DropdownIndicator }}
            />
          </div>
        </div>
        <div className="main_content bg-[#F1F1F1] rounded-[5px] py-[12px] px-[16px] flex flex-col gap-y-[12px]">
          {cardData.map((el) => (
            <TestCard key={el.id} type={el.type as ITestCardProps['type']} title={el.title} date={el.date} />
          ))}
        </div>
      </Wrapper>
    </Calendar>
  )
}

export default TestsPage
