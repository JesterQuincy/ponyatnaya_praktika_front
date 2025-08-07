import React, { FC } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddMeetModal.module.css'
import { SubmitHandler, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { EMeetingFormat } from '@/types/clients'
import { ErrorField } from '@/components/ErrorField'
import { cn } from '@/lib/utils'
import {
  ControlledInput,
  ControlledSelect,
  DEFAULT_VALUES,
  prepareMeetingPayload,
  TAddMeetSchema,
  EModalType,
  EPaymentType,
} from '@/components/ui/AddMeetModal'
import { useChangeMeetForm } from './useChangeMeetForm'
import { useUpdateMeeting } from '@/api/hooks/meet/useUpdateMeeting'
import { DateTimeFields } from '../DateTimeFields'

interface IAddMeetModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ChangeMeetModal: FC<IAddMeetModalProps> = ({ isOpen, onClose }) => {
  const { watch, control, errors, type, reset, handleSubmit, numberFields } = useChangeMeetForm('2')

  const { mutateAsync: changeMeeting } = useUpdateMeeting()

  const formatMeet = watch('formatMeet')

  const onSubmit: SubmitHandler<TAddMeetSchema> = async (data) => {
    const payload = prepareMeetingPayload(data, type)

    if (!payload) {
      toast.error('Некорректные дата/время/длительность')
      return
    }

    const toastId = toast.loading('Обновление встречи...')

    try {
      await changeMeeting(payload)

      toast.update(toastId, {
        render: 'Вы успешно назначили встречу',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })

      handleClose()
    } catch (error) {
      toast.update(toastId, {
        render: 'Ошибка при назначении встречи',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  const handleClose = () => {
    onClose()
    reset(DEFAULT_VALUES)
  }

  return (
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

          {type === EModalType.CLIENT && (
            <ControlledSelect
              name="paymentType"
              control={control}
              errors={errors}
              label="Метод оплаты"
              options={Object.values(EPaymentType).map((p) => ({ value: p, label: p }))}
            />
          )}

          <>
            <ErrorField message={errors.onCount?.message || errors.onDate?.message} />
          </>

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
