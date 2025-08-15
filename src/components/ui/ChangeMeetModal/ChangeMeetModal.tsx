import React, { FC } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddMeetModal.module.css'
import { SubmitHandler, DeepPartial } from 'react-hook-form'
import { toast } from 'react-toastify'
import { EMeetingFormat } from '@/types/clients'
import { cn } from '@/lib/utils'
import { EModalType, EPaymentType } from '@/components/ui/AddMeetModal'
import { useChangeMeetForm } from './useChangeMeetForm'
import { useUpdateMeeting } from '@/api/hooks/meet/useUpdateMeeting'
import { DateTimeFields } from '../DateTimeFields'
import { ControlledSelect } from '../ControlledSelect/ControlledSelect'
import { ControlledInput } from '../ControlledSelect/ControlledInput'
import z from 'zod'
import { baseSchema } from './schema'
import { IMeetingDetails } from '@/types/meet/getMeetById'
import moment from 'moment'

interface IAddMeetModalProps {
  isOpen: boolean
  onClose: () => void
  meetId: number
}

export const ChangeMeetModal: FC<IAddMeetModalProps> = ({ isOpen, onClose, meetId }) => {
  const { watch, clientType, control, type, errors, handleSubmit, numberFields } = useChangeMeetForm(meetId)

  const { mutateAsync: changeMeeting } = useUpdateMeeting()

  const formatMeet = watch('formatMeet')

  const onSubmit: SubmitHandler<z.infer<typeof baseSchema>> = async (data) => {
    const toastId = toast.loading('Обновление встречи...')

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

    try {
      await changeMeeting(res)

      toast.update(toastId, {
        render: 'Вы успешно обновили встречу',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })

      onClose()
    } catch (error) {
      toast.update(toastId, {
        render: 'Ошибка при обновлении встречи',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
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
            <button className="px-[20px] py-[10px] text-[16px] text-[#525252] text" type="button" onClick={onClose}>
              Отмена
            </button>
            <button className="px-[20px] py-[10px] text-[16px] text-white bg-[#EA660C] rounded-[6px]" type="submit">
              Готово
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
