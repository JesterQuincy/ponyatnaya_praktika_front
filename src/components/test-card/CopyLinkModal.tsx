'use client'

import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Select from 'react-select'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useGetCustomerByName } from '@/api/hooks/customer/useGetCustomerByName'
import { customSelectStyles } from '@/constants'
import { useGetQuestionnaireLink } from '@/api/hooks/therapistQuestionnaires/useGetQuestionnaireLink'
import { toast } from 'react-toastify'
import { copyLink } from '@/helpers/utils/getLink'

interface ICreateMaterialModalProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  id: number
}

const copyLinkSchema = z.object({
  customer: z.string(),
  link: z.string(),
})

export const CopyLinkModal: FC<ICreateMaterialModalProps> = ({ modalOpen, setModalOpen, id }) => {
  const [name, setName] = useState('')
  const { data: customers, isLoading: customersLoading } = useGetCustomerByName(name)

  const form = useForm<z.infer<typeof copyLinkSchema>>()

  const { formState, control, reset, setValue, watch } = form

  const { mutateAsync: getLink } = useGetQuestionnaireLink()

  const handleSubmit = () => {
    setModalOpen(false)
  }

  const handleInputChange = (inputValue: string) => {
    if (inputValue.trim()) {
      setName(inputValue)
    }
  }

  const customersOptions: Array<{ value: number; label: string }> = customers?.map(
    (client: { customerId: number; fullName: string }) => ({
      value: client.customerId,
      label: client.fullName,
    }),
  )

  const customersValue = useCallback(
    (value: string) => {
      return customersOptions?.find((option) => String(option.value) === value)
    },
    [customersOptions],
  )

  const customer = watch('customer')

  const handleLink = async (customerId: number) => {
    try {
      const link = await getLink({ customerId, questionnaireId: id })

      setValue('link', link, { shouldDirty: true })
    } catch {
      toast.error('Произошла ошибка при загрузке ссылки')
    }
  }

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(prev) => {
        setModalOpen(prev)
        reset()
      }}>
      <DialogTrigger className={'w-full text-left'}>Получить ссылку</DialogTrigger>
      <DialogContent className="rounded-[15px]">
        <DialogHeader className="font-bold text-[32px] font-ebgaramond">Получить ссылку</DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-4">
              <span className="font-medium text-[12px]">Клиент</span>
              <FormField
                control={control}
                name="customer"
                render={({ field }) => (
                  <Select
                    value={customersValue(field.value)}
                    onChange={(s) => {
                      field.onChange(s?.value)

                      if (s?.value) {
                        return handleLink(s?.value)
                      }
                    }}
                    onInputChange={handleInputChange}
                    options={customersOptions}
                    isLoading={customersLoading}
                    styles={{ ...customSelectStyles, control: (styles) => ({ ...styles, width: '100%' }) }}
                    placeholder="Найти клиента"
                    className="w-full"
                    isSearchable
                  />
                )}
              />
            </div>
            <div>
              <span className="font-medium text-[12px]">Персональная ссылка</span>
              <FormField
                control={control}
                name="link"
                render={({ field }) => (
                  <FormItem className={'flex gap-2'}>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-[12px]"
                        layoutClassName={'w-full'}
                        placeholder="Название материала"
                        disabled
                      />
                    </FormControl>
                    <Button
                      type={'button'}
                      onClick={() => {
                        return copyLink(field.value)
                      }}
                      disabled={!customer}>
                      <Copy />
                    </Button>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="h-[1px] bg-[#CACACA] mt-[24px] mb-[12px]" />
            <DialogFooter>
              <div className="flex gap-x-[12px]">
                <Button
                  onClick={() => {
                    setModalOpen(false)
                  }}
                  type={'button'}>
                  Отмена
                </Button>
                <Button
                  disabled={formState.isSubmitting || !formState.isValid || formState.isValidating}
                  type="submit"
                  variant="orange">
                  Готово
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
