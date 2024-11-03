import React from 'react'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/ui/dataPicker'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { questionnaireSchema } from '@/models/questionnaireSchema'

interface QuestionProps {
  form: UseFormReturn<z.infer<typeof questionnaireSchema>>
  name: keyof z.infer<typeof questionnaireSchema>
  label: string
}

export function InputQuestion({ form, name, label, textarea = false }: QuestionProps & { textarea?: boolean }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-10">
              <FormLabel className="w-[20%]">{label}</FormLabel>
              {textarea ? (
                <Textarea {...field} placeholder={label} className="bg-white rounded-[6px] w-[22.8%] border-gray" />
              ) : (
                <Input {...field} placeholder={label} className="bg-white rounded-[6px] w-[130%]" />
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  )
}

export function SelectQuestion({ form, name, label, options }: QuestionProps & { options: string[] }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-10">
              <FormLabel className="w-[20%]">{label}</FormLabel>
              <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                <SelectTrigger className="w-[20%] rounded-[6px] bg-white border-gray">
                  <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent className="rounded-[6px] bg-white border-gray">
                  {options.map((option) => (
                    <SelectItem key={option} value={option} className="cursor-pointer">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  )
}

export function DatePickerQuestion({ form, name, label }: QuestionProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-10">
              <FormLabel className="w-[20%]">{label}</FormLabel>
              <DatePicker
                value={value}
                onChange={onChange}
                placeholder={label}
                className="w-[20%] bg-white border-gray rounded-[6px]"
              />
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  )
}
