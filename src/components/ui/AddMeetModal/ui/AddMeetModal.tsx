import React, { FC } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddMeetModal.module.css'
import { SubmitHandler, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ECreateMeetingRepeat } from '@/helpers/types/calendar'
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
  DateTimeFields,
  ControlledRadioGroup,
  CustomerCombobox,
  TAddMeetSchema,
  EFinishRepetition,
  EModalType,
  EPaymentType,
} from '@/components/ui/AddMeetModal'

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

  const formatMeet = watch('formatMeet')

  const typeOptions = Object.entries(modalTypeOptions).map(([key, value]) => {
    return {
      value: key,
      label: value,
    }
  })

  const onSubmit: SubmitHandler<TAddMeetSchema> = async (data) => {
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

          <DateTimeFields control={control} errors={errors} numberFields={numberFields} />

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
  )
}
