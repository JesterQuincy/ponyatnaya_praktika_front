import React, { useMemo, useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import Select from 'react-select'
import ImageIcon from '@/public/icon/image.svg'
import { Button } from '../../buttons/Button'
import { Button as Btn } from '@/components/ui/button'
import styles from '@/styles/AddMeetModal.module.css'
import { useGetAllTypes } from '@/api/hooks/methods/useGetAllTypes'
import { Spinner } from '@/components/Spinner'
import { IValueLabelModel } from '@/models/ILabelValueModel'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface IState {
  method: string | number
  newMethod: string
  image: File | undefined
}

interface IMeetingModalProps {
  isOpen: boolean
  onClose: () => void
}

const MethodicModal = ({ isOpen, onClose }: IMeetingModalProps) => {
  const { data: methodTypes, isPending } = useGetAllTypes()

  const [showNewType, setShowNewType] = useState(false)
  const [values, setValues] = useState<IState>({
    method: '',
    newMethod: '',
    image: undefined,
  })

  const methodTypesOptions = useMemo(() => {
    return methodTypes?.data.map((item) => ({ value: item.id, label: item.nameMethod }))
  }, [methodTypes?.data])

  const handleSubmit = () => {
    console.log(values)
  }

  const selectedOption = methodTypesOptions?.find((option) => option.value === values.method) || null

  const handleNewType = () => {
    setValues((prev) => ({ ...prev, newMethod: '' }))

    setShowNewType((prev) => !prev)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Добавить методику"
      className={cn(styles.modalContent, 'flex flex-col')}
      overlayClassName={styles.modalOverlay}>
      <div className="text-black font-ebgaramond font-bold text-[33px]">Добавить методику</div>
      <div className="mt-[18px] mb-[31px] flex flex-col gap-[5px]">
        <span className="font-montserrat text-[12px] font-medium">Название</span>
        {isPending && <Spinner />}
        {!isPending && methodTypes && (
          <Select
            options={methodTypesOptions}
            placeholder="Выберете методику"
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
            isDisabled={showNewType}
            value={selectedOption}
            onChange={(option) => setValues((prev) => ({ ...prev, method: (option as IValueLabelModel)?.value }))}
          />
        )}
      </div>
      {showNewType && (
        <Input
          value={values.newMethod}
          onChange={(e) => setValues((prev) => ({ ...prev, newMethod: e.target.value }))}
          className="mb-6"
          placeholder="Введите название методики"
        />
      )}
      <Btn onClick={handleNewType} type={'button'} variant={'grey'} className="ml-auto">
        {!showNewType ? 'Создать тип методики' : 'Отменить создание'}
      </Btn>
      <div className="border-2 border-dashed border-[#5A5A5A] rounded-[6px] mt-[21px] p-6 flex flex-col items-center justify-center text-center">
        <div className="mb-[7px]">
          <Image src={ImageIcon} alt="ImageIcon" className="mr-2" />
        </div>
        <p className="font-semibold">Перетащите изображение сюда</p>
        <p className="text-[#5A5A5A] text-sm">или нажмите кнопку</p>
        <div className="mt-4 flex gap-4">
          <Button className="bg-[#5A5A5A] text-white py-1 px-4 rounded-[6px]">Выбрать файл</Button>
          <Button className="border border-[#5A5A5A] text-[#5A5A5A] py-1 px-4 rounded-[6px]">Вставить из буфера</Button>
        </div>
      </div>
      <div className="border-t border-[#CACACA] mt-[25px] w-full flex gap-[15px] justify-end pt-[10px]">
        <Button onClick={onClose} className="text-[#525252] font-montserrat font-semibold">
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-[#EA660C] py-[5px] px-[10px] rounded-[6px] text-white font-montserrat font-semibold">
          Готово
        </Button>
      </div>
    </Modal>
  )
}

export default MethodicModal
