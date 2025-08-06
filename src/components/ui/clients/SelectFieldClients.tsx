'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export interface Option<T extends string> {
  label: string
  value: T
}

interface IFilterSelectProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: Option<T>[]
  placeholder?: string
}

export const FilterSelect = <T extends string>({
  value,
  onChange,
  options,
  placeholder = 'Выберите',
}: IFilterSelectProps<T>) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as T)}>
      <SelectTrigger className="border-gray rounded-xl bg-white w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border-gray bg-white rounded-[6px]">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
