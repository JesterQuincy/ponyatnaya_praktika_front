import React, { Dispatch, FC, SetStateAction } from 'react'
import { ISort } from '@/app/tests/page'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { dateOption, typeOption } from '@/components/ui/forms/constants/selectOptions'

interface IFiltersProps {
  sort: ISort | undefined
  setSort: Dispatch<SetStateAction<ISort | undefined>>
}

export const Filters: FC<IFiltersProps> = ({ sort, setSort }) => {
  const handleSortChange = <K extends keyof ISort>(key: K, value: ISort[K]) => {
    setSort((prev) => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  return (
    <div className="flex gap-[28px]">
      <div className="flex gap-[8px] items-center">
        <p className="flex-none">Сортировать по типу</p>
        <Select
          value={sort?.type}
          onValueChange={(value: string) => {
            handleSortChange('type', value as ISort['type'])
          }}>
          <SelectTrigger className="rounded-[6px] border-[#D9D9D9]">
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
      <div className="flex gap-[8px] items-center">
        <p className={'flex-none'}>По дате создания</p>
        <Select
          value={sort?.date}
          onValueChange={(value: string) => {
            handleSortChange('date', value as ISort['date'])
          }}>
          <SelectTrigger className="rounded-[6px] border-[#D9D9D9]">
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
    </div>
  )
}
