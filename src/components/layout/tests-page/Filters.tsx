import { FC } from 'react'
import Image from 'next/image'
import { ISort } from '@/app/tests/page'
import { Dispatch, SetStateAction } from 'react'
import { FilterSelect } from '@/components/ui/clients/SelectFieldClients'
import IconFilter from '@/public/icon/filterIcon.svg'
import { dateOption, typeOption } from '@/components/ui/forms/constants/selectOptions'

interface IFiltersProps {
  sort: ISort | undefined
  setSort: Dispatch<SetStateAction<ISort | undefined>>
}

const generateOptions = <T extends { label: string; value: string }>(
  options: T[],
  defaultLabel: string,
  defaultValue: string,
) => [
  { label: defaultLabel, value: defaultValue },
  ...options.map((el) => ({
    label: el.label,
    value: el.value,
  })),
]

export const Filters: FC<IFiltersProps> = ({ sort, setSort }) => {
  const handleSortChange = <K extends keyof ISort>(key: K, value: ISort[K] | 'all' | 'none') => {
    setSort((prev) => {
      if (value === 'all' || value === 'none') {
        return { ...prev, [key]: undefined }
      }
      return { ...prev, [key]: value }
    })
  }

  const typeOpts = generateOptions(typeOption, 'Все типы', 'all')
  const dateOpts = generateOptions(dateOption, 'Не выбрано', 'none')

  return (
    <div className="flex flex-col gap-[12px] mt-[12px] mb-[25px]">
      <div className="flex gap-[12px] items-center">
        <Image src={IconFilter} alt="filter" />
        <span className="text-sm">Фильтры:</span>

        <FilterSelect
          value={sort?.type ?? 'all'}
          onChange={(val) => handleSortChange('type', val as ISort['type'])}
          options={typeOpts}
        />

        <FilterSelect
          value={sort?.date ?? 'none'}
          onChange={(val) => handleSortChange('date', val as ISort['date'])}
          options={dateOpts}
        />
      </div>
    </div>
  )
}
