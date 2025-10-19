import React, { FC, useState } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddMeetModal.module.css'
import { SubmitHandler, DeepPartial } from 'react-hook-form'
import { toast } from 'react-toastify'
import { EMeetingFormat } from '@/types/clients'
import { cn } from '@/lib/utils'
import { EPaymentType, TAddMeetSchema } from '@/components/ui/AddMeetModal'
import { useChangeMeetForm } from './useChangeMeetForm'
import { useUpdateMeeting } from '@/api/hooks/meet/useUpdateMeeting'
import { DateTimeFields } from '../DateTimeFields'
import { ControlledSelect } from '../ControlledSelect/ControlledSelect'
import { ControlledInput } from '../ControlledSelect/ControlledInput'
import z from 'zod'
import { baseSchema } from './schema'
import { IMeetingDetails } from '@/types/meet/getMeetById'
import moment from 'moment'
import { AxiosError } from 'axios'
import { meetingService } from '@/services/meet.sevice'
import { ICheckAvailableMeeting, IScheduleData, IUnavailabeDatesError } from '@/helpers/types/calendar'
import dayjs from 'dayjs'
import NonBlockingError from '../AddMeetModal/ui/NonBlockingError'

interface IChangeMeetModalProps {
  isOpen: boolean
  onClose: () => void
  meetId: number
}

export const ChangeMeetModal: FC<IChangeMeetModalProps> = ({ isOpen, onClose, meetId }) => {
  const {
    watch,
    clientType,
    control,
    formState: { errors },
    handleSubmit,
    numberFields,
  } = useChangeMeetForm(meetId)
  const { mutateAsync: changeMeeting } = useUpdateMeeting()

  const formatMeet = watch('formatMeet')

  const [errorModal, setErrorModal] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    message: IScheduleData | null
    data: z.infer<typeof baseSchema> | null
  }>({
    isOpen: false,
    message: null,
    data: null,
  })

  const checkDateAvailability = async (
    data: ICheckAvailableMeeting,
  ): Promise<{ isAvailable: boolean; errorMessage?: IScheduleData }> => {
    const toastId = toast.loading('Проверка доступности времени...')
    try {
      await meetingService.getUnvailableMeetingDates(data)
      toast.update(toastId, {
        render: 'Время доступно!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      })
      return { isAvailable: true }
    } catch (err) {
      const error = err as AxiosError<IUnavailabeDatesError>
      toast.dismiss(toastId)

      if (error?.response?.status === 409) {
        const errorMessage = error.response?.data as unknown as IScheduleData
        return { isAvailable: false, errorMessage }
      } else {
        toast.error('Ошибка при проверке доступности времени')
        return { isAvailable: false }
      }
    }
  }

  const buildAvailabilityPayload = (data: z.infer<typeof baseSchema>): ICheckAvailableMeeting => {
    const start = dayjs(
      `${data.dateMeet} ${data.time}`,
      ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss'],
      true, // strict
    )
    if (!start.isValid()) throw new Error('Некорректные dateMeet/time')

    return {
      startDate: start.format('YYYY-MM-DD'),
      startTime: start.format('HH:mm'),
      endTime: start.add(Number(data.duration), 'minutes').format('HH:mm'),
    }
  }

  const updateMeetingRequest = async (data: z.infer<typeof baseSchema>) => {
    const start = moment(data.time, 'HH:mm')
    const end = start.add(Number(data.duration), 'minutes').format('HH:mm')

    const res: DeepPartial<IMeetingDetails> = {
      id: meetId,
      startMeet: data.time,
      endMeet: String(end),
      formatMeet: data.formatMeet,
      paymentType: data.paymentType,
      place: data.place,
      dateMeet: data.dateMeet,
    }

    const toastId = toast.loading('Обновление встречи...')
    try {
      await changeMeeting(res)
      toast.update(toastId, {
        render: 'Вы успешно обновили встречу',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      handleClose()
    } catch (err) {
      const error = err as AxiosError
      toast.update(toastId, {
        render: 'Ошибка при обновлении встречи',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
      if (error?.response?.status === 409) {
        const msg = typeof error.response?.data === 'string' ? error.response.data : 'Конфликт: встреча уже существует'
        setErrorModal(msg)
      }
    }
  }

  const onSubmit: SubmitHandler<z.infer<typeof baseSchema>> = async (data) => {
    const payload = buildAvailabilityPayload(data)

    const result = await checkDateAvailability(payload)

    if (result.isAvailable) {
      await updateMeetingRequest(data)
    } else if (result.errorMessage) {
      setConfirmModal({
        isOpen: true,
        message: result.errorMessage,
        data: data,
      })
    }
  }

  const handleConfirmContinue = async () => {
    if (confirmModal.data) {
      await updateMeetingRequest(confirmModal.data)
    }
    setConfirmModal({ isOpen: false, message: null, data: null })
  }

  const handleConfirmCancel = () => {
    setConfirmModal({ isOpen: false, message: null, data: null })
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        contentLabel="Изменить параметры"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}>
        <div>
          <div className="text-black font-ebgaramond font-bold text-[33px] mb-[34px]">Изменить параметры</div>
          <form onSubmit={handleSubmit(onSubmit)} className="font-montserrat">
            <DateTimeFields
              fieldNames={{ dateMeet: 'dateMeet', time: 'time', duration: 'duration' }}
              control={control}
              errors={errors}
              numberFields={numberFields}
            />

            <ControlledSelect
              name="formatMeet"
              control={control}
              errors={errors}
              label="Формат встречи"
              options={[
                { value: EMeetingFormat.OFFLINE, label: EMeetingFormat.OFFLINE },
                { value: EMeetingFormat.ONLINE, label: EMeetingFormat.ONLINE },
              ]}
              className={cn(styles.select, 'max-w-[200px]')}
            />

            <ControlledInput
              className={'mb-0'}
              name="place"
              control={control}
              errors={errors}
              label="Место встречи"
              placeholder={`Введите ${formatMeet === EMeetingFormat.OFFLINE ? 'адрес' : 'ссылку'}`}
            />

            {clientType !== 'Технический' && (
              <ControlledSelect
                name="paymentType"
                control={control}
                errors={errors}
                label="Метод оплаты"
                options={Object.values(EPaymentType).map((p) => ({ value: p, label: p }))}
              />
            )}

            <div className="flex mt-[20px] justify-end gap-[10px] border-t border-[#CACACA] pt-[10px] font-montserrat font-semibold">
              <button
                className="px-[20px] py-[10px] text-[16px] text-[#525252] text"
                type="button"
                onClick={handleClose}>
                Отмена
              </button>
              <button className="px-[20px] py-[10px] text-[16px] text-white bg-[#EA660C] rounded-[6px]" type="submit">
                Готово
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={confirmModal.isOpen}
        onRequestClose={handleConfirmCancel}
        contentLabel="Подтверждение"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}>
        <div className="font-montserrat">
          <div className="text-orange-600 font-bold text-xl mb-4">Время недоступно</div>
          <div className="mb-4">
            <NonBlockingError items={confirmModal.message?.meet} />
            <NonBlockingError items={confirmModal.message?.nonWorkingDate} title="Пересечение с нерабочими днями" />
            <NonBlockingError items={confirmModal.message?.otherMeet} title="Пересечение с иными встречами" />
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
        overlayClassName={styles.modalOverlay}>
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
