import Modal from 'react-modal'
import { cn } from '@/lib/utils'
import styles from '@/styles/AddMeetModal.module.css'
import { Spinner } from '@/components/Spinner'
import Select from 'react-select'
import { IValueLabelModel } from '@/models/ILabelValueModel'
import { Input } from '@/components/ui/input'
import { Button as Btn } from '@/components/ui/button'
import Image from 'next/image'
import { X } from 'lucide-react'
import ImageIcon from '@/public/icon/image.svg'
import { Button } from '@/components/ui/buttons/Button'
import React, { ChangeEvent, FC, DragEvent } from 'react'
import { IState } from '@/components/ui/forms/MeetForm/modals/types'
import { IMethodic } from '@/types/methods'

interface IMethodicModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  isLoading: boolean
  methodTypes: IMethodic[] | undefined
  selectedOption: IValueLabelModel | null
  onInputChange: (field: keyof IState, value: IState[typeof field]) => void
  values: IState
  showNewType: boolean
  label: string
  methodTypesOptions: IValueLabelModel[] | undefined
  onNewType: () => void
  removeImage: (index: number) => void
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const MethodicModal: FC<IMethodicModalProps> = ({
  isOpen,
  onClose,
  label,
  isLoading,
  methodTypes,
  selectedOption,
  onInputChange,
  values,
  showNewType,
  methodTypesOptions,
  onNewType,
  removeImage,
  onImageChange,
  onSubmit,
}) => {
  const handlePasteImages = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      const images: { file: File; url: string }[] = []

      // Проходим по элементам в буфере обмена
      for (const item of clipboardItems) {
        if (item.types.includes('image/png') || item.types.includes('image/jpeg')) {
          const blob = await item.getType('image/png')
          const file = new File([blob], 'pasted-image.png', { type: 'image/png' })
          const imageUrl = URL.createObjectURL(file)
          images.push({ file, url: imageUrl })
        }
      }

      // Добавляем изображения в состояние
      onInputChange('images', [...values.images, ...images])
    } catch (error) {
      console.error('Ошибка при вставке изображения:', error)
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files)

      // Фильтруем только изображения
      const imageFiles = files.filter((file) => file.type.startsWith('image/'))

      const updatedImages = imageFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))

      onInputChange('images', [...values.images, ...updatedImages])
    }
  }

  // Обработчик для разрешения сброса файлов на область
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={label}
      className={cn(styles.modalContent, 'flex flex-col')}
      overlayClassName={styles.modalOverlay}>
      <div className="text-black font-ebgaramond font-bold text-[33px]">Добавить методику</div>
      <div className="mt-[18px] mb-[31px] flex flex-col gap-[5px]">
        {isLoading && <Spinner />}
        {!isLoading && methodTypes && (
          <>
            <span className="font-montserrat text-[12px] font-medium">Название</span>
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
              onChange={(option) => onInputChange('method', (option as IValueLabelModel)?.value)}
            />
          </>
        )}
      </div>
      {showNewType && (
        <Input
          value={values.newMethod}
          onChange={(e) => onInputChange('newMethod', e.target.value)}
          className="mb-6"
          placeholder="Введите название методики"
        />
      )}
      <Btn onClick={onNewType} type={'button'} variant={'grey'} className="ml-auto">
        {!showNewType ? 'Создать тип методики' : 'Отменить создание'}
      </Btn>
      <div className="mt-4 flex flex-wrap gap-4">
        {values.images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image.url}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded-[6px]"
              width={96}
              height={96}
            />
            <button onClick={() => removeImage(index)} className="absolute top-[0] right-0">
              <X className={'bg-white'} />
            </button>
          </div>
        ))}
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-[#5A5A5A] rounded-[6px] mt-[21px] p-6 flex flex-col items-center justify-center text-center">
        <div className="mb-[7px]">
          <Image src={ImageIcon} alt="ImageIcon" className="mr-2" />
        </div>
        <p className="font-semibold">Перетащите изображения сюда</p>
        <p className="text-[#5A5A5A] text-sm">или нажмите кнопку</p>
        <div className="mt-4 flex gap-4">
          <Button className="bg-[#5A5A5A] text-white  rounded-[6px]">
            <label htmlFor="file-upload" className="cursor-pointer py-1 px-4">
              Выбрать файлы
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
              multiple
              key={values.images.length}
              disabled={isLoading}
            />
          </Button>
          <Button
            className="border border-[#5A5A5A] text-[#5A5A5A] py-1 px-4 rounded-[6px]"
            onClick={handlePasteImages}>
            Вставить из буфера
          </Button>
        </div>
      </div>
      <div className="border-t border-[#CACACA] mt-[25px] w-full flex gap-[15px] justify-end pt-[10px]">
        <Button onClick={onClose} className="text-[#525252] font-montserrat font-semibold">
          Отмена
        </Button>
        <Button
          disabled={isLoading}
          onClick={onSubmit}
          className="bg-[#EA660C] py-[5px] px-[10px] rounded-[6px] text-white font-montserrat font-semibold">
          Готово
        </Button>
      </div>
    </Modal>
  )
}
