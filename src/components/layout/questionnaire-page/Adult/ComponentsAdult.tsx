import React, { forwardRef, InputHTMLAttributes, Ref } from 'react'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/ui/datePicker'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { questionnaireAdultSchema } from '@/models/questionnaireAdultSchema'
import { IValueLabelModel } from '@/models/ILabelValueModel'

interface QuestionProps {
  form: UseFormReturn<z.infer<typeof questionnaireAdultSchema>>
  name: keyof z.infer<typeof questionnaireAdultSchema>
  label: string
}

interface InputQuestionProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'name'>, QuestionProps {
  textarea?: boolean
}

export const InputQuestion = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputQuestionProps>(
  ({ form, name, label, textarea = false, type = 'text' }, ref) => {
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
                  <Textarea
                    {...field}
                    placeholder={label}
                    className="bg-white rounded-[6px] w-[22.8%] border-gray"
                    ref={ref as Ref<HTMLTextAreaElement>}
                  />
                ) : (
                  <Input
                    {...field}
                    placeholder={label}
                    className="bg-white rounded-[6px] w-[130%] border-gray"
                    ref={ref as Ref<HTMLInputElement>}
                    type={type}
                  />
                )}
              </div>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    )
  },
)

InputQuestion.displayName = 'InputQuestion'

export function SelectQuestion({ form, name, label, options }: QuestionProps & { options: IValueLabelModel[] }) {
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
                  <SelectValue placeholder={'Выберите'} />
                </SelectTrigger>
                <SelectContent className="rounded-[6px] bg-white border-gray">
                  {options.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)} className="cursor-pointer">
                      {option.label}
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
                value={value as string}
                onChange={onChange}
                placeholder={label}
                className="w-[20%] bg-white border-gray rounded-[6px]"
                formatDate={'yyyy-MM-dd'}
              />
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  )
}
