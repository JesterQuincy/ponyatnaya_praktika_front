import React, { FC } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddClientModal.module.css'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useCreateNonWorkingday } from '@/api/hooks/calendar/useCreateNonWorkingday'
import { toast } from 'react-toastify'
import z from 'zod'
import { createNonWorkingDaySchema } from './schema'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'

interface IAddClientModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NonWorkingDayModal: FC<IAddClientModalProps> = ({ isOpen, onClose }) => {
  const form = useForm<z.infer<typeof createNonWorkingDaySchema>>({
    resolver: zodResolver(createNonWorkingDaySchema),
    defaultValues: {
      title: '',
    },
  })
  const { mutateAsync, isPending } = useCreateNonWorkingday()

  const handleCloseModal = () => {
    form.reset()
    onClose()
  }

  const onSubmit = form.handleSubmit(async (data) => {
    const toastId = toast.loading('Добавление выходных...')
    try {
      await mutateAsync(data)
      toast.update(toastId, {
        render: 'Успешно',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })

      handleCloseModal()
    } catch {
      toast.update(toastId, {
        render: 'Ошибка',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  })
  console.log(form.formState.errors)
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className={`${styles.modalContent} p-5 gap-3 flex flex-col`}
      overlayClassName={styles.modalOverlay}>
      <div className="text-black font-ebgaramond font-bold text-[33px]">Нерабочие дни</div>
      <Form {...form}>
        <form className="gap-3 flex flex-col" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Введите название" className="h-[31px] rounded-xl" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className={`flex gap-6`}>
            <div className="flex flex-col max-w-[132px]">
              <label>С</label>
              <FormField
                control={form.control}
                name="dateStart"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="date" className="p-2 max-w-[132px]" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col max-w-[132px]">
              <label>До</label>
              <FormField
                control={form.control}
                name="dateEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="date" className="p-2 max-w-[132px]" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex mt-[20px] justify-end gap-[10px] border-t border-[#CACACA] pt-[10px] font-montserrat font-semibold">
            <button
              className="px-[20px] py-[10px] text-[16px] text-[#525252] text"
              type="button"
              onClick={handleCloseModal}>
              Отмена
            </button>
            <button
              disabled={isPending}
              className="px-[20px] py-[10px] text-[16px] text-white bg-[#EA660C] rounded-[6px]"
              type="submit">
              Готово
            </button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
