import React, { FC, useMemo, useState } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddMeetModal.module.css'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { calendarService } from '@/services/calendar.service'
import { toast } from 'react-toastify'
import { ECreateMeetingRepeat, ICreateMeeting } from '@/helpers/types/calendar'
import Select from 'react-select'
import { customSelectStyles } from '@/constants/customStyles'
import { useCreateMeeting } from '@/api/hooks/meet/useCreateMeeting'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, TAddMeetSchema } from '@/components/ui/AddMeetModal/schema'
import { EMeetingFormat } from '@/types/clients'
import { useGetCustomerByName } from '@/api/hooks/customer/useGetCustomerByName'
import { CustomerCombobox } from '@/components/ui/AddMeetModal/CustomerCombobox'
import { ErrorField } from '@/components/ErrorField'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { EFinishRepetition, EModalType, EPaymentType, modalTypeOptions } from '@/components/ui/AddMeetModal/types'
import { cn } from '@/lib/utils'
import { FilterSelect } from '@/components/ui/clients/SelectFieldClients'

interface IAddMeetModalProps {
  isOpen: boolean
  onClose: () => void
}

const DEFAULT_VALUES = {
  type: EModalType.CLIENT,
  formatMeet: EMeetingFormat.ONLINE,
  repeat: ECreateMeetingRepeat.NONE,
  paymentType: EPaymentType.CASH,
}

export const AddMeetModal: FC<IAddMeetModalProps> = ({ isOpen, onClose }) => {
  const {
    formState: { errors, isSubmitting, ...formState },
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    getValues,
    clearErrors,
  } = useForm<TAddMeetSchema>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  })

  const { mutateAsync: createMeeting } = useCreateMeeting()

  const typeOptions = Object.entries(modalTypeOptions).map(([key, value]) => {
    return {
      value: key,
      label: value,
    }
  })

  const type = watch('type')
  const formatMeet = watch('formatMeet')
  const repeat = watch('repeat')
  const finishRepetition = watch('finishRepetition')

  const numberFields = (value: string) => {
    return value.replace(/\D/g, '')
  }

  const onSubmit: SubmitHandler<TAddMeetSchema> = async (data) => {
    console.log(data, 'data')
  }

  const handleClose = () => {
    onClose()
    reset(DEFAULT_VALUES)
  }

  console.log(errors, 'errors')
  console.log(getValues(), 'getValues')

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
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <RadioGroup
                {...field}
                onValueChange={(value) => {
                  field.onChange(value)

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
                className="flex gap-[16px] font-montserrat">
                {typeOptions.map((o) => (
                  <div key={o.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={o.value} id={o.value} />
                    <Label htmlFor={o.value}>{o.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />

          {type === EModalType.CLIENT ? (
            <div className="pb-[21px] pt-[25px]">
              <Controller
                control={control}
                name="customerId"
                render={({ field }) => (
                  <>
                    <CustomerCombobox
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Найдите клиента..."
                      disabled={isSubmitting}
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

          <div className="mb-[15px]">
            <div className={cn(styles.dateTime, 'flex items-end mb-0')}>
              <Controller
                control={control}
                name="dateMeet"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <label className="font-montserrat text-[13px]">Дата</label>
                    <input type="date" className="w-[fit-content]" {...field} value={field.value || ''} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="time"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <label className="font-montserrat text-[13px]">Время</label>
                    <input type="time" className="min-w-[88px]" {...field} value={field.value || ''} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="duration"
                render={({ field }) => (
                  <div className="flex gap-[4px] items-center">
                    <input
                      type="text"
                      className="max-w-[50px]"
                      {...field}
                      onChange={(e) => {
                        field.onChange(numberFields(e.target.value))
                      }}
                      value={field.value || ''}
                    />
                    <span className="font-montserrat text-[14px]">минут</span>
                  </div>
                )}
              />
            </div>
            <ErrorField message={errors.dateMeet?.message || errors.time?.message || errors.duration?.message} />
          </div>

          <Controller
            control={control}
            name="formatMeet"
            render={({ field }) => (
              <div className="flex flex-col">
                <label className="font-montserrat text-[13px]">Формат встречи</label>
                <select className={`${styles.select} max-w-[200px]`} {...field}>
                  <option value={EMeetingFormat.OFFLINE}>{EMeetingFormat.OFFLINE}</option>
                  <option value={EMeetingFormat.ONLINE}>{EMeetingFormat.ONLINE}</option>
                </select>
                <ErrorField message={errors.formatMeet?.message} />
              </div>
            )}
          />

          <Controller
            control={control}
            name="place"
            render={({ field }) => (
              <div className="flex flex-col mb-[15px]">
                <label className="font-montserrat text-[13px]">Место встречи</label>
                <input
                  className={cn(styles.input, 'mb-0')}
                  placeholder={`Введите ${formatMeet === EMeetingFormat.OFFLINE ? 'адрес' : 'ссылку'}`}
                  {...field}
                  value={field.value || ''}
                />
                <ErrorField message={errors.place?.message} />
              </div>
            )}
          />

          {type === EModalType.CLIENT && (
            <Controller
              control={control}
              name={'paymentType'}
              render={({ field }) => (
                <div>
                  <label className="font-montserrat text-[13px]">Метод оплаты</label>
                  <select className={styles.input} {...field}>
                    {Object.values(EPaymentType).map((paymentType) => (
                      <option key={paymentType} value={paymentType}>
                        {paymentType}
                      </option>
                    ))}
                  </select>
                  <ErrorField message={errors.paymentType?.message} />
                </div>
              )}
            />
          )}

          <Controller
            control={control}
            name={'repeat'}
            render={({ field }) => (
              <div>
                <label className="font-montserrat text-[13px]">Повторять</label>
                <select
                  className={styles.input}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value)

                    if (e.target.value === ECreateMeetingRepeat.NONE) {
                      setValue('onCount', undefined, { shouldDirty: true })
                      setValue('onDate', undefined, { shouldDirty: true })
                      setValue('finishRepetition', undefined, { shouldDirty: true })
                    } else {
                      setValue('finishRepetition', EFinishRepetition.ON_DATE, { shouldDirty: true })
                      setValue('onDate', getValues('dateMeet'), { shouldDirty: true })
                    }

                    clearErrors(['finishRepetition', 'onDate', 'onCount'])
                  }}>
                  {Object.values(ECreateMeetingRepeat).map((paymentType) => (
                    <option key={paymentType} value={paymentType}>
                      {paymentType}
                    </option>
                  ))}
                </select>
                <ErrorField message={errors.repeat?.message} />
              </div>
            )}
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
                      onValueChange={(value) => {
                        field.onChange(value)

                        if (value === EFinishRepetition.ON_DATE) {
                          setValue('onCount', undefined, { shouldDirty: true })
                          setValue('onDate', getValues('dateMeet'), { shouldDirty: true })
                          clearErrors('onCount')
                        } else {
                          setValue('onDate', '', { shouldDirty: true })
                          clearErrors('onDate')
                        }
                      }}
                      className="flex flex-col gap-[16px] justify-center font-montserrat">
                      {Object.values(EFinishRepetition).map((o) => (
                        <div key={o} className="flex items-center space-x-2">
                          <RadioGroupItem value={o} id={o} />
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
                          <label className="font-montserrat text-[13px]">В дату:</label>
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
                          <label className="font-montserrat text-[13px]">Через</label>
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
