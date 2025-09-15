import React, { FC, useEffect, useState } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddMeetModal.module.css'
import { SubmitHandler, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ECreateMeetingRepeat, IUnavailabeDatesError } from '@/helpers/types/calendar'
import { useCreateMeeting } from '@/api/hooks/meet/useCreateMeeting'
import { EMeetingFormat } from '@/types/clients'
import { ErrorField } from '@/components/ErrorField'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  ControlledInput,
  ControlledSelect,
  DEFAULT_VALUES,
  mappedFinishRepetition,
  modalTypeOptions,
  prepareMeetingPayload,
  useAddMeetForm,
  ControlledRadioGroup,
  CustomerCombobox,
  TAddMeetSchema,
  EFinishRepetition,
  EModalType,
  EPaymentType,
} from '@/components/ui/AddMeetModal'
import { AxiosError } from 'axios'
import { DateTimeFields } from '../../DateTimeFields'
import dayjs from 'dayjs'
import { meetingService } from '@/services/meet.sevice'

interface IAddMeetModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddMeetModal: FC<IAddMeetModalProps> = ({ isOpen, onClose }) => {
  const {
    watch,
    control,
    errors,
    repeat,
    type,
    finishRepetition,
    reset,
    handleSubmit,
    numberFields,
    handleRepetitionChange,
    handleFinishRepetitionChange,
  } = useAddMeetForm()

  const { mutateAsync: createMeeting } = useCreateMeeting()
  const [errorModal, setErrorModal] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    message: string
    data: TAddMeetSchema | null
  }>({
    isOpen: false,
    message: '',
    data: null,
  })

  const formatMeet = watch('formatMeet')
  const typeOptions = Object.entries(modalTypeOptions).map(([key, value]) => {
    return {
      value: key,
      label: value,
    }
  })

  const checkDateAvailability = async (
    startDate: string,
    endDate: string,
  ): Promise<{ isAvailable: boolean; errorMessage?: string }> => {
    const toastId = toast.loading('Проверка доступности времени...')

    try {
      await meetingService.getUnvailableMeetingDates(
        dayjs(startDate).format('YYYY-MM-DD'),
        dayjs(endDate).format('YYYY-MM-DD'),
        dayjs(startDate).format('HH:mm'),
        dayjs(endDate).format('HH:mm'),
      )
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
        const errorMessage = `${error.response.data.nonWorkingDaysMessage}\n${error.response.data.otherMeetsMessage}`
        return { isAvailable: false, errorMessage }
      } else {
        toast.error('Ошибка при проверке доступности времени')
        return { isAvailable: false }
      }
    }
  }

  const createMeetingRequest = async (data: TAddMeetSchema) => {
    const payload = prepareMeetingPayload(data, type)

    if (!payload) {
      toast.error('Некорректные дата/время/длительность')
      return
    }

    const toastId = toast.loading('Назначение встречи...')

    try {
      await createMeeting(payload)

      toast.update(toastId, {
        render: 'Вы успешно назначили встречу',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })

      handleClose()
    } catch (err) {
      console.log(err)
      const error = err as AxiosError
      toast.update(toastId, {
        render: 'Ошибка при назначении встречи',
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

  const onSubmit: SubmitHandler<TAddMeetSchema> = async (data) => {
    const startDate = dayjs(`${data.dateMeet} ${data.time}`)
    const endDate = startDate.add(Number(data.duration), 'minute')

    const result = await checkDateAvailability(startDate.format('YYYY-MM-DD HH:mm'), endDate.format('YYYY-MM-DD HH:mm'))

    if (result.isAvailable) {
      await createMeetingRequest(data)
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
      await createMeetingRequest(confirmModal.data)
    }
    setConfirmModal({ isOpen: false, message: '', data: null })
  }

  const handleConfirmCancel = () => {
    setConfirmModal({ isOpen: false, message: '', data: null })
  }

  const handleClose = () => {
    onClose()
    reset(DEFAULT_VALUES)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        contentLabel="Назначить встречу"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}>
        <div>
          <div className="text-black font-ebgaramond font-bold text-[33px] mb-[34px]">Назначить встречу</div>
          <form onSubmit={handleSubmit(onSubmit)} className="font-montserrat">
            <ControlledRadioGroup
              name="type"
              control={control}
              options={typeOptions}
              onChange={(value) => {
                if (value === EModalType.CLIENT) {
                  reset(DEFAULT_VALUES)
                } else {
                  reset({
                    type: EModalType.OTHER,
                    repeat: ECreateMeetingRepeat.NONE,
                    formatMeet: EMeetingFormat.ONLINE,
                    paymentType: undefined,
                  })
                }
              }}
              className="flex gap-[16px] font-montserrat"
            />

            {type === EModalType.CLIENT ? (
              <div className="pb-[21px] pt-[25px]">
                <Controller
                  control={control}
                  name="customerId"
                  render={({ field }) => (
                    <>
                      <CustomerCombobox
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        placeholder="Найдите клиента..."
                      />
                      <ErrorField message={errors.customerId?.message} />
                    </>
                  )}
                />
              </div>
            ) : (
              <Controller
                control={control}
                name="nameMeet"
                render={({ field }) => (
                  <div className="pt-[25px] mb-[15px]">
                    <input className={cn(styles.input, 'mb-0')} placeholder="Введите название" {...field} />
                    <ErrorField message={errors.nameMeet?.message} />
                  </div>
                )}
              />
            )}

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

            <ControlledSelect
              name="repeat"
              control={control}
              errors={errors}
              label="Повторять"
              options={Object.values(ECreateMeetingRepeat).map((r) => ({ value: r, label: r }))}
              onChange={handleRepetitionChange}
            />

          <>
            {!!repeat && repeat !== ECreateMeetingRepeat.NONE && (
              <div>
                <span className="text-[13px] font-montserrat">Закончить</span>

                <div className="flex gap-3">
                  <Controller
                    control={control}
                    name="finishRepetition"
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        value={field.value}
                        onValueChange={handleFinishRepetitionChange}
                        className="flex flex-col gap-[16px] justify-center font-montserrat">
                        {Object.values(EFinishRepetition).map((o) => (
                          <div key={o} className="flex items-center space-x-2">
                            <RadioGroupItem value={o} id={o} />
                            <Label htmlFor={o}>{mappedFinishRepetition[o]}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />

                  <div className="flex flex-col gap-2">
                    <Controller
                      control={control}
                      name="onDate"
                      render={({ field }) => (
                        <>
                          <div className={cn(styles.dateTime, 'flex items-center mb-0 !')}>
                            <input
                              type="date"
                              className="w-[fit-content] h-[30px] !"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={finishRepetition !== EFinishRepetition.ON_DATE}
                            />
                          </div>
                        </>
                      )}
                    />
                    <Controller
                      control={control}
                      name="onCount"
                      render={({ field }) => (
                        <>
                          <div className={cn(styles.dateTime, 'flex items-center mb-0 !')}>
                            <input
                              type="text"
                              className="max-w-[35px] h-[30px] !"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(numberFields(e.target.value))
                              }}
                              disabled={finishRepetition !== EFinishRepetition.ON_COUNT}
                            />
                            <label className="text-[13px]">повторений</label>
                          </div>
                        </>
                      )}
                    />
                  </div>
                </div>
              )}
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

      <Modal
        isOpen={confirmModal.isOpen}
        onRequestClose={handleConfirmCancel}
        contentLabel="Подтверждение"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}>
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
