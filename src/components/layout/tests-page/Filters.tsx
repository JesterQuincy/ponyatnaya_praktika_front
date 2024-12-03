import React, { Dispatch, FC, SetStateAction } from 'react'
import Select, { SingleValue } from 'react-select'
import { dateOption, typeOption } from '@/app/tests/constants'
import { DropdownIndicator } from '@/components/drop-down-indicator'
import { ISort, IValueLabelModel } from '@/app/tests/page'

interface IFiltersProps {
  sort: ISort
  setSort: Dispatch<SetStateAction<ISort>>
}

export const Filters: FC<IFiltersProps> = ({ sort, setSort }) => {
  const handleSortChange = (key: keyof ISort, value: SingleValue<IValueLabelModel>) => {
    setSort((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
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
  )
}
