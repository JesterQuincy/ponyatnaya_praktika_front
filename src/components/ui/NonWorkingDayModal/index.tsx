import React, { FC, useState } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddClientModal.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useCreateNonWorkingday } from '@/api/hooks/calendar/useCreateNonWorkingday'
import { toast } from 'react-toastify'
import z from 'zod'
import { createNonWorkingDaySchema } from './schema'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorField } from '@/components/ErrorField'
import { baseSchema } from '../ChangeMeetModal/schema'
import moment from 'moment'
import { calendarService } from '@/services/calendar.service'
import { IUnavailabeDatesError } from '@/helpers/types/calendar'
import { AxiosError } from 'axios'

interface IAddClientModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NonWorkingDayModal: FC<IAddClientModalProps> = ({ isOpen, onClose }) => {
  const [errorModal, setErrorModal] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    message: string
    data: z.infer<typeof createNonWorkingDaySchema> | null
  }>({
    isOpen: false,
    message: '',
    data: null,
  })
  const form = useForm<z.infer<typeof createNonWorkingDaySchema>>({
    resolver: zodResolver(createNonWorkingDaySchema),
    defaultValues: {
      title: '',
    },
  })

  const { mutateAsync: mutateNonWorkingDays, isPending } = useCreateNonWorkingday()

  const checkDateAvailability = async (
    startDate: string,
    endDate: string,
  ): Promise<{ isAvailable: boolean; errorMessage?: string }> => {
    const toastId = toast.loading('Проверка доступности даты...')
    try {
      await calendarService.getNonWorkingDaysUnavailableDates(
        moment(startDate).format('YYYY-MM-DD'),
        moment(endDate).format('YYYY-MM-DD'),
      )
      toast.update(toastId, {
        render: 'Дата доступна!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      })
      return { isAvailable: true }
    } catch (err) {
      const error = err as AxiosError<IUnavailabeDatesError>
      toast.dismiss(toastId)
      if (error?.response?.status === 409) {
        const errorMessage = `${error.response?.data?.nonWorkingDaysMessage}\n
        ${error.response?.data?.otherMeetsMessage}\n
        ${error.response?.data?.meetsMessage}`
        return { isAvailable: false, errorMessage }
      } else {
        toast.error('Ошибка при проверке доступности даты')
        return { isAvailable: false }
      }
    }
  }

  const handleCloseModal = () => {
    form.reset()
    onClose()
  }

  const createNonWorkingDays = async (data: z.infer<typeof createNonWorkingDaySchema>) => {
    const toastId = toast.loading('Добавление выходных...')
    try {
      await mutateNonWorkingDays(data)
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
  }

  const handleConfirmContinue = async () => {
    if (confirmModal.data) {
      await createNonWorkingDays(confirmModal.data)
    }
    setConfirmModal({ isOpen: false, message: '', data: null })
  }

  const handleConfirmCancel = () => {
    setConfirmModal({ isOpen: false, message: '', data: null })
  }

  const onSubmit: SubmitHandler<z.infer<typeof createNonWorkingDaySchema>> = async (data) => {
    const startDate = moment(`${data.dateStart}`, 'YYYY-MM-DD HH:mm')
    const endDate = moment(`${data.dateEnd}`, 'YYYY-MM-DD HH:mm')

    const result = await checkDateAvailability(startDate.format('YYYY-MM-DD HH:mm'), endDate.format('YYYY-MM-DD HH:mm'))

    if (result.isAvailable) {
      await createNonWorkingDays(data)
    } else if (result.errorMessage) {
      setConfirmModal({
        isOpen: true,
        message: result.errorMessage,
        data: data,
      })
    }
  }

  const {
    formState: { errors },
  } = form

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        className={`${styles.modalContent} p-5 gap-3 flex flex-col`}
        overlayClassName={styles.modalOverlay}>
        <div className="text-black font-ebgaramond font-bold text-[33px]">Нерабочие дни</div>
        <Form {...form}>
          <form className="gap-3 flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
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
            <div className={'flex flex-col'}>
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
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <ErrorField message={errors.dateEnd?.message || errors.dateStart?.message} />
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

      <Modal
        isOpen={confirmModal.isOpen}
        onRequestClose={handleConfirmCancel}
        contentLabel="Подтверждение"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        parentSelector={() => document.body}>
        <div className="font-montserrat">
          <div className="text-orange-600 font-bold text-xl mb-4">Время недоступно</div>
          <div className="mb-4">
            <p className="text-red-600 mb-2">{confirmModal.message}</p>
          </div>
          <div className="flex justify-end gap-[10px] mt-6">
            <button
              onClick={handleConfirmCancel}
              className="px-4 py-2 text-[#525252] border border-[#CACACA] rounded-[6px]">
              Отмена
            </button>
            <button onClick={handleConfirmContinue} className="px-4 py-2 bg-[#EA660C] text-white rounded-[6px]">
              Продолжить
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!errorModal}
        onRequestClose={() => setErrorModal(null)}
        contentLabel="Ошибка"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        parentSelector={() => document.body}>
        <div className="font-montserrat">
          <div className="text-red-600 font-bold text-xl mb-4">Ошибка</div>
          <p>{errorModal}</p>
          <div className="flex justify-end mt-6">
            <button onClick={() => setErrorModal(null)} className="px-4 py-2 bg-[#EA660C] text-white rounded-[6px]">
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
