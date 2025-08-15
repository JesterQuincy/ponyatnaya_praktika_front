import React, { useState, useEffect, FC } from 'react'
import Modal from 'react-modal'
import styles from '@/styles/AddClientModal.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import Select from 'react-select'
import { DropdownIndicator } from '@/components/ui/clients/Clients'
import { useCreateCustomer } from '@/api/hooks/customer/useCreateCustomer'
import { toast } from 'react-toastify'

interface ClientForm {
  clientType: string
  firstName?: string
  lastName?: string
  secondName?: string
  birth?: string
  gender?: string
  meetingFormat?: string
  phoneNumber?: string
  mail?: string
  parentFullName?: string
  parentFirstName?: string
  parentLastName?: string
  parentSecondName?: string
  parentPhone?: string
  parentBirthDate?: string
  communicationFormat: string
  parentGender?: string
  parentCommunicationFormat?: string
  parentEmail?: string
  client2FirstName?: string
  client2LastName?: string
  client2SecondName?: string
  client2BirthDate?: string
  client2Gender?: string
  client2CommunicationFormat?: string
  client2Phone?: string
  client2Email?: string
  firstParent?: any
}

interface IAddClientModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddClientModal: FC<IAddClientModalProps> = ({ isOpen, onClose }) => {
  const [clientType, setClientType] = useState<'adult' | 'child' | 'couple'>('adult')
  const { register, handleSubmit, reset, setValue } = useForm<ClientForm>()

  useEffect(() => {
    Modal.setAppElement(document.body)
  }, [])

  const handleCloseModal = () => {
    reset()
    onClose()
  }

  const handleChangeType = (value: string) => {
    reset()
    setClientType(value as 'adult' | 'child' | 'couple')
  }

  const { mutateAsync } = useCreateCustomer(clientType)

  const onSubmit: SubmitHandler<ClientForm> = async (data) => {
    let payload

    if (clientType === 'child') {
      payload = {
        lastName: data.lastName,
        secondName: data.secondName,
        firstName: data.firstName,
        fullName: `${data.firstName} ${data.secondName} ${data.lastName}`,
        birth: data.birth,
        phoneNumber: data.phoneNumber,
        mail: data.mail,
        gender: data.gender,
        meetingFormat: data.meetingFormat,
        // @ts-ignore
        firstParent: {
          lastName: data.parentLastName,
          secondName: data.parentSecondName,
          firstName: data.parentFirstName,
          fullName: `${data.parentFirstName} ${data.parentSecondName} ${data.parentLastName}`,
          gender: data.parentGender,
          birth: data.parentBirthDate,
          phoneNumber: data.parentPhone,
          meetingFormat: data.parentCommunicationFormat,
          mail: data.parentEmail,
        },
      }
    } else if (clientType === 'couple') {
      payload = {
        lastName: data.lastName,
        secondName: data.secondName,
        firstName: data.firstName,
        birth: data.birth,
        phoneNumber: data.phoneNumber,
        mail: data.mail,
        gender: data.gender,
        meetingFormat: data.communicationFormat,
        secondPerson: {
          lastName: data.client2LastName,
          secondName: data.client2SecondName,
          firstName: data.client2FirstName,
          gender: data.client2Gender,
          birth: data.client2BirthDate,
          phoneNumber: data.client2Phone,
          meetingFormat: data.client2CommunicationFormat,
          mail: data.client2Email,
        },
      }
    } else {
      payload = { ...data }
    }

    const toastId = toast.loading('Добавление клиента...')

    try {
      await mutateAsync(payload)

      toast.update(toastId, {
        render: 'Клиент успешно добавлен',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })

      reset()
      onClose()
    } catch {
      toast.update(toastId, {
        render: 'Ошибка при добавлении клиента',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  const genderOptions = [
    { value: 'Мужской', label: 'Мужской' },
    { value: 'Женский', label: 'Женский' },
  ]

  const communicationFormatOptions = [
    { value: 'Офлайн', label: 'Офлайн' },
    { value: 'Онлайн', label: 'Онлайн' },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Добавить клиента"
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}>
      <div className="p-[26px]">
        <div className="text-black font-ebgaramond font-bold text-[33px]">Добавить клиента</div>
        <div className="h-[550px] overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex my-[32px] space-x-[25px]">
              <div>
                <input
                  type="radio"
                  className="mr-[5px]"
                  value="adult"
                  checked={clientType === 'adult'}
                  onChange={(e) => {
                    handleChangeType(e.target.value)
                  }}
                />
                Взрослый
              </div>
              <div>
                <input
                  type="radio"
                  className="mr-[5px]"
                  value="child"
                  checked={clientType === 'child'}
                  onChange={(e) => {
                    handleChangeType(e.target.value)
                  }}
                />
                Ребёнок
              </div>
              <div>
                <input
                  type="radio"
                  className="mr-[5px]"
                  value="couple"
                  checked={clientType === 'couple'}
                  onChange={(e) => {
                    handleChangeType(e.target.value)
                  }}
                />
                Пара
              </div>
            </div>

            {clientType === 'adult' && (
              <div className="space-y-[13px]">
                <div className="space-y-[5px]">
                  <label className="font-montserrat text-xs font-medium">Фамилия</label>
                  <Input
                    className="h-[31px] rounded-xl"
                    type="text"
                    placeholder="Введите фамилию клиента"
                    {...register('lastName')}
                  />
                </div>
                <div className="space-y-[5px]">
                  <label className="font-montserrat text-xs font-medium">Имя</label>
                  <Input
                    className="h-[31px] rounded-xl"
                    type="text"
                    placeholder="Введите имя клиента"
                    required
                    {...register('firstName')}
                  />
                </div>
                <div className="space-y-[5px]">
                  <label className="font-montserrat text-xs font-medium">Отчество</label>
                  <Input
                    className="h-[31px] rounded-xl"
                    type="text"
                    placeholder="Введите отчество клиента"
                    {...register('secondName')}
                  />
                </div>
                <div className="flex flex-row w-full space-x-[10px]">
                  <div className="flex flex-col space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Дата рождения</label>
                    <input
                      className="flex h-[36px] w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm"
                      type="date"
                      {...register('birth')}
                    />
                  </div>
                  <div className="flex flex-col w-full space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Пол</label>
                    <Select
                      options={genderOptions}
                      onChange={(option) => setValue('gender', option?.value)}
                      placeholder="Выберите пол"
                      className="rounded-[6]"
                      components={{ DropdownIndicator }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: '36px',
                          minHeight: '36px',
                          padding: '0 0 5px 0',
                          borderRadius: '12px',
                        }),
                        indicatorSeparator: () => ({ display: 'none' }),
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-[5px]">
                  <label className="font-montserrat text-xs font-medium">Формат коммуникации</label>
                  <Select
                    options={communicationFormatOptions}
                    onChange={(option) => setValue('meetingFormat', option?.value)}
                    className="w-full"
                    placeholder="Выберите формат"
                    components={{ DropdownIndicator }}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: '36px',
                        minHeight: '36px',
                        padding: '0 0 5px 0',
                        borderRadius: '12px',
                      }),
                      indicatorSeparator: () => ({ display: 'none' }),
                    }}
                  />
                </div>
                <div>
                  <label className="font-montserrat text-xs font-medium">Телефон</label>
                  <Input
                    type="tel"
                    placeholder="Введите номер телефона"
                    required
                    {
                      //@ts-ignore
                      ...register('phoneNumber')
                    }
                  />
                </div>
                <div>
                  <label className="font-montserrat text-xs font-medium">Электронная почта</label>
                  <Input type="email" placeholder="Введите адрес электронной почты" {...register('mail')} />
                </div>
              </div>
            )}

            {clientType === 'child' && (
              <div className="space-y-[40px]">
                <div className="space-y-[13px] ">
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Фамилия ребенка</label>
                    <Input
                      className="h-[31px] rounded-xl"
                      type="text"
                      placeholder="Введите фамилию клиента"
                      {...register('lastName')}
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Имя ребенка</label>
                    <Input
                      className="h-[31px] rounded-xl"
                      type="text"
                      placeholder="Введите имя клиента"
                      required
                      {...register('firstName')}
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Отчество ребенка</label>
                    <Input
                      className="h-[31px] rounded-xl"
                      type="text"
                      placeholder="Введите отчество клиента"
                      {...register('secondName')}
                    />
                  </div>

                  <div className="flex flex-row w-full space-x-[10px]">
                    <div className="flex flex-col space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Дата рождения</label>
                      <input
                        className="flex h-[36px] w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm"
                        type="date"
                        {...register('birth')}
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Пол</label>
                      <Select
                        options={genderOptions}
                        onChange={(option) => setValue('gender', option?.value)}
                        placeholder="Выберите пол"
                        className="rounded-[6]"
                        components={{ DropdownIndicator }}
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: '36px',
                            minHeight: '36px',
                            padding: '0 0 5px 0',
                            borderRadius: '12px',
                          }),
                          indicatorSeparator: () => ({ display: 'none' }),
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Формат коммуникации</label>
                    <Select
                      options={communicationFormatOptions}
                      onChange={(option) => setValue('meetingFormat', option?.value)}
                      className="w-full"
                      placeholder="Выберите формат"
                      components={{ DropdownIndicator }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: '36px',
                          minHeight: '36px',
                          padding: '0 0 5px 0',
                          borderRadius: '12px',
                        }),
                        indicatorSeparator: () => ({ display: 'none' }),
                      }}
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Телефон ребёнка</label>
                    <Input
                      type="tel"
                      placeholder="Введите номер телефона"
                      required
                      {
                        //@ts-ignore
                        ...register('phoneNumber')
                      }
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Электронная почта ребёнка</label>
                    <Input
                      type="email"
                      placeholder="Введите адрес электронной почты"
                      {
                        //@ts-ignore
                        ...register('mail')
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="space-y-[13px]">
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Фамилия родителя</label>
                      <Input
                        className="h-[31px] rounded-xl"
                        type="text"
                        placeholder="Введите фамилию клиента"
                        {...register('parentLastName')}
                      />
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Имя родителя</label>
                      <Input
                        className="h-[31px] rounded-xl"
                        type="text"
                        placeholder="Введите имя клиента"
                        required
                        {...register('parentFirstName')}
                      />
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Отчество родителя</label>
                      <Input
                        className="h-[31px] rounded-xl"
                        type="text"
                        placeholder="Введите отчество клиента"
                        {...register('parentSecondName')}
                      />
                    </div>
                    <div className="flex flex-row w-full space-x-[10px]">
                      <div className="flex flex-col w-full space-y-[5px]">
                        <label className="font-montserrat text-xs font-medium">Пол</label>
                        <Select
                          options={genderOptions}
                          onChange={(option) => setValue('parentGender', option?.value)}
                          placeholder="Выберите пол"
                          className="rounded-[6]"
                          components={{ DropdownIndicator }}
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: '36px',
                              minHeight: '36px',
                              padding: '0 0 5px 0',
                              borderRadius: '12px',
                            }),
                            indicatorSeparator: () => ({ display: 'none' }),
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Телефон</label>
                      <Input type="tel" placeholder="Введите номер телефона" required {...register('parentPhone')} />
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Электронная почта</label>
                      <Input type="email" placeholder="Введите адрес электронной почты" {...register('parentEmail')} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {clientType === 'couple' && (
              <div className="space-y-[40px]">
                <div className="space-y-[13px] ">
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Фамилия клиента №1</label>
                    <Input
                      className="h-[31px] rounded-xl"
                      type="text"
                      placeholder="Введите фамилию клиента"
                      required
                      {...register('lastName')}
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-xs font-medium">Имя клиента №1</label>
                    <Input
                      className="h-[31px] rounded-xl"
                      type="text"
                      placeholder="Введите имя клиента"
                      required
                      {...register('firstName')}
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Отчество клиента №1</label>
                    <Input
                      className="h-[31px] rounded-xl"
                      type="text"
                      placeholder="Введите отчество клиента"
                      {...register('secondName')}
                    />
                  </div>

                  <div className="flex flex-row w-full space-x-[10px]">
                    <div className="flex flex-col space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Дата рождения</label>
                      <input
                        className="flex h-[36px] w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm"
                        type="date"
                        {...register('birth')}
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Пол</label>
                      <Select
                        options={genderOptions}
                        onChange={(option) => setValue('gender', option?.value)}
                        placeholder="Выберите пол"
                        className="rounded-[6]"
                        components={{ DropdownIndicator }}
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: '36px',
                            minHeight: '36px',
                            padding: '0 0 5px 0',
                            borderRadius: '12px',
                          }),
                          indicatorSeparator: () => ({ display: 'none' }),
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Формат коммуникации</label>
                    <Select
                      options={communicationFormatOptions}
                      // @ts-ignore
                      onChange={(option) => setValue('communicationFormat', option?.value)}
                      className="w-full"
                      placeholder="Выберите формат"
                      components={{ DropdownIndicator }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: '36px',
                          minHeight: '36px',
                          padding: '0 0 5px 0',
                          borderRadius: '12px',
                        }),
                        indicatorSeparator: () => ({ display: 'none' }),
                      }}
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Телефон клиента №1</label>
                    <Input
                      type="tel"
                      placeholder="Телефон клиента №1"
                      required
                      {
                        //@ts-ignore
                        ...register('phoneNumber')
                      }
                    />
                  </div>
                  <div className="space-y-[5px]">
                    <label className="font-montserrat text-xs font-medium">Электронная почта клиента №1</label>
                    <Input
                      type="email"
                      placeholder="Электронная почта клиента №1"
                      {
                        //@ts-ignore
                        ...register('mail')
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="space-y-[13px]">
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Фамилия клиента №2</label>
                      <Input
                        className="h-[31px] rounded-xl"
                        type="text"
                        placeholder="Введите фамилию клиента"
                        {...register('client2LastName')}
                      />
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Имя клиента №2</label>
                      <Input
                        className="h-[31px] rounded-xl"
                        type="text"
                        placeholder="Введите имя клиента"
                        required
                        {...register('client2FirstName')}
                      />
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Отчество клиента №2</label>
                      <Input
                        className="h-[31px] rounded-xl"
                        type="text"
                        placeholder="Введите отчество клиента"
                        {...register('client2SecondName')}
                      />
                    </div>

                    <div className="flex flex-row w-full space-x-[10px]">
                      <div className="flex flex-col w-full space-y-[5px]">
                        <label className="font-montserrat text-xs font-medium">Пол</label>
                        <Select
                          options={genderOptions}
                          onChange={(option) => setValue('client2Gender', option?.value)}
                          placeholder="Выберите пол"
                          className="rounded-[6]"
                          components={{ DropdownIndicator }}
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: '36px',
                              minHeight: '36px',
                              padding: '0 0 5px 0',
                              borderRadius: '12px',
                            }),
                            indicatorSeparator: () => ({ display: 'none' }),
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Телефон клиента №2</label>
                      <Input type="tel" placeholder="Введите номер телефона" {...register('client2Phone')} />
                    </div>
                    <div className="space-y-[5px]">
                      <label className="font-montserrat text-xs font-medium">Электронная почта клиента №2</label>
                      <Input type="email" placeholder="Введите адрес электронной почты" {...register('client2Email')} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <hr className="mb-2 mt-[32px] border-gray" />
              <div className="w-full flex justify-end items-center space-x-3 font-montserrat text-xs">
                <div
                  onClick={handleCloseModal}
                  className="flex bg-transparent rounded-[4px] text-[12px] font-semibold cursor-pointer">
                  Отмена
                </div>
                <button
                  type="submit"
                  className="p-[9px] px-[20px] h-fit flex text-white bg-[#EA660C] rounded-[4px] text-xs font-semibold items-center">
                  Готово
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}
