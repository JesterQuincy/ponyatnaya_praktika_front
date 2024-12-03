import React, { FC } from 'react'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Select from 'react-select'
import { DropdownIndicator } from '@/components/drop-down-indicator'
import { Button } from '@/components/ui/button'
import { useFormContext } from 'react-hook-form'
import { ITestsFilter } from '@/models/testsFilterSchema'

interface IPanelProps {
  onSubmit: (data: ITestsFilter) => void
}

export const Panel: FC<IPanelProps> = ({ onSubmit }) => {
  const form = useFormContext<ITestsFilter>()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full bg-bg-grey rounded-[5px] pt-[17px] pb-[30px] px-[12px] flex flex-col gap-y-[26px]">
        <p className="font-semibold text-center">Панель фильтрации</p>
        <div className="flex flex-col gap-y-[12px]">
          <div className="flex items-center">
            <FormField
              control={form.control}
              render={({ field }) => (
                <>
                  <span className="flex-none basis-[75px] font-medium text-[12px]">Содержит</span>
                  <Input className="bg-white" {...field} placeholder="Поиск" />
                </>
              )}
              name="search"
            />
          </div>
          <div className="flex items-center">
            <FormField
              control={form.control}
              render={({ field }) => (
                <>
                  <span className="flex-none basis-[75px] font-medium text-[12px]">Тип</span>
                  <Select
                    {...field}
                    styles={{
                      indicatorSeparator: () => ({ display: 'none' }),
                    }}
                    components={{ DropdownIndicator }}
                  />
                </>
              )}
              name="type"
            />
          </div>
        </div>
        <div className="flex justify-center gap-x-[6px]">
          <Button variant="grey" type="submit">
            Отфильтровать
          </Button>
          <Button
            variant="transBorder"
            type="button"
            onClick={() => {
              form.reset()
            }}>
            Сбросить фильтр
          </Button>
        </div>
      </form>
    </Form>
  )
}
