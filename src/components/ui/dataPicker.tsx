'use client'

import * as React from 'react'
import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import CalendarIcon from '@/public/icon/calendar-icon.svg'
import Image from 'next/image'

interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
  className?: string
}

function DatePicker({ value, onChange, placeholder = 'Выберите дату', className }: DatePickerProps) {
  const selectedDate = value ? parse(value, 'dd.MM.yyyy', new Date()) : undefined

  const handleDateChange = (date: Date | undefined) => {
    if (date && onChange) {
      onChange(format(date, 'dd.MM.yyyy'))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-between text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}>
          {selectedDate ? format(selectedDate, 'PPP', { locale: ru }) : <span>{placeholder}</span>}
          <Image src={CalendarIcon} alt="Calendar icon" width={15} height={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white border-[#b2b2b2] rounded-[6px]" align="start">
        <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

DatePicker.displayName = 'DatePicker'

export { DatePicker }
