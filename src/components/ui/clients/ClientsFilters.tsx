import Image from 'next/image'
import { FilterSelect } from '@/components/ui/clients/SelectFieldClients'
import IconFilter from '@/public/icon/filterIcon.svg'
import {
  EClientStatus,
  EGetClientBySearchClientType,
  EMeetingFormat,
  EOrderDate,
  EOrderMeetCount,
} from '@/types/clients'
import { IClientsState } from '@/components/ui/clients/types'
import { EMPTY_OPTS_KEY } from '@/components/ui/clients/consts'
import { FC } from 'react'

export interface IClientFiltersProps {
  filters: IClientsState['filters']
  onChange: (key: keyof IClientsState['filters'], value: string) => void
}

const generateOptions = <T extends string>(enumObj: Record<string, T>, label: string) => [
  { label, value: EMPTY_OPTS_KEY },
  ...Object.values(enumObj).map((val) => ({ label: val, value: val })),
]

const generateEnumOptions = <T extends string>(enumObj: Record<string, T>, label: string) => [
  { label, value: EMPTY_OPTS_KEY },
  ...Object.entries(enumObj).map(([key, value]) => ({
    label: value,
    value: key,
  })),
]

export const ClientFilters: FC<IClientFiltersProps> = ({ filters, onChange }) => {
  const meetingFormatOpts = generateOptions(EMeetingFormat, 'Все способы связи')
  const clientStatusOpts = generateOptions(EClientStatus, 'Все статусы клиентов')
  const clientTypeOpts = generateOptions(EGetClientBySearchClientType, 'Все типы клиентов')
  const orderDateOpts = generateEnumOptions(EOrderDate, 'Не выбрано')
  const orderMeetCountOpts = generateEnumOptions(EOrderMeetCount, 'Не выбрано')

  return (
    <div className="flex flex-col gap-[12px] mt-[12px] mb-[25px]">
      <div className="flex gap-[12px] items-center">
        {/*Поиск по клиентам*/}
        <input
          className="p-2 border rounded-xl border-[#D9D9D9] text-sm w-[300px]"
          placeholder="Введите"
          value={filters.customerName}
          onChange={(e) => onChange('customerName', e.target.value)}
        />
        <div className="flex gap-[8px] items-center">
          <Image src={IconFilter} alt="filter" />
          <span className="text-sm">Фильтры:</span>

          {/*Способы встречи*/}
          <FilterSelect
            value={filters.meetingFormat}
            onChange={(val) => onChange('meetingFormat', val)}
            options={meetingFormatOpts}
          />
          {/*Статусы клиентов*/}
          <FilterSelect
            value={filters.clientStatus}
            onChange={(val) => onChange('clientStatus', val)}
            options={clientStatusOpts}
          />
          {/* Типы клиентов */}
          <FilterSelect
            value={filters.clientType}
            onChange={(val) => onChange('clientType', val)}
            options={clientTypeOpts}
          />
        </div>
      </div>

      <div className="flex items-center gap-[24px] mt-[12px]">
        <div className="flex items-center gap-[12px]">
          <span className="text-sm">Сортировать по дате последней встречи</span>
          <FilterSelect
            value={filters.orderDate}
            onChange={(val) => onChange('orderDate', val)}
            options={orderDateOpts}
          />
        </div>
        <div className="flex items-center gap-[12px]">
          <span className="text-sm">По интенсивности встреч</span>
          <FilterSelect
            value={filters.orderMeetCount}
            onChange={(val) => onChange('orderMeetCount', val)}
            options={orderMeetCountOpts}
          />
        </div>
      </div>
    </div>
  )
}
