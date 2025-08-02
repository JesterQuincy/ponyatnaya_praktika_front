'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useGetCustomerByName } from '@/api/hooks/customer/useGetCustomerByName'
import { useDebounce } from '@/hooks/useDebounce'
import { useMemo, useState } from 'react'

interface CustomerComboboxProps {
  value?: number
  onChange: (val: number | undefined) => void
  placeholder?: string
  disabled?: boolean
}

export const CustomerCombobox: React.FC<CustomerComboboxProps> = ({
  value,
  onChange,
  placeholder = 'Найти клиента по имени...',
  disabled,
}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { data: users, isLoading, isFetching } = useGetCustomerByName(debouncedSearch)

  const isPending = isLoading || isFetching

  const options = useMemo(
    () =>
      users?.map((u) => ({
        value: u.customerId,
        label: u.fullName,
      })) ?? [],
    [users],
  )

  const selected = options.find((o) => o.value === value)

  const handleSelect = (currentValue: string) => {
    const num = Number(currentValue)
    onChange(Number.isNaN(num) ? undefined : num)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between">
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] z-[1000] border-gray rounded-xl">
        <Command shouldFilter={false}>
          <CommandInput
            className="border-none"
            placeholder="Введите имя клиента..."
            value={search}
            onValueChange={(value) => {
              setSearch(value)

              if (value === '') {
                onChange(undefined)
              }
            }}
          />
          <CommandList>
            {isPending ? (
              <div className="p-2 text-sm text-muted-foreground">Загрузка...</div>
            ) : (
              <>
                <CommandEmpty>Ничего не найдено</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem key={opt.value} value={String(opt.value)} onSelect={handleSelect}>
                      <Check className={cn('mr-2 h-4 w-4', value === opt.value ? 'opacity-100' : 'opacity-0')} />
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
