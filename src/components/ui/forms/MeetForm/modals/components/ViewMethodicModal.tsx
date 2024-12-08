'use client'

import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { Button } from '../../../../buttons/Button'
import styles from '@/styles/AddMeetModal.module.css'
import { useGetAllTypes } from '@/api/hooks/methods/useGetAllTypes'
import { Spinner } from '@/components/Spinner'
import { IValueLabelModel } from '@/models/ILabelValueModel'
import { cn } from '@/lib/utils'
import Select from 'react-select'
import { useGetMethodById } from '@/api/hooks/methods/useGetMethodById'
import { base64ToFile } from '@/helpers/utils/base64ToFile'
import { X } from 'lucide-react'

interface IState {
  method: string | number
  newMethod: string
  images: { file?: File; url: string; createdAt?: string }[] // Объединенные изображения и их URL
}

interface IMeetingModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
}

export const ViewMethodicModal = ({ isOpen, onClose, id }: IMeetingModalProps) => {
  const { data: methodTypes, isPending: isPendingTypes } = useGetAllTypes()
  const { data: method, isPending: isPendingMethod } = useGetMethodById(id)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const methodTypesOptions = methodTypes?.data.map((item) => ({
    value: item.id,
    label: item.nameMethod,
  }))

  const [values, setValues] = useState<IState>({
    method: '',
    newMethod: '',
    images: [],
  })

  const selectedOption = methodTypesOptions?.find((option) => option.value === values.method) || null

  useEffect(() => {
    if (isPendingMethod) return

    setValues((prev) => ({
      ...prev,
      method: methodTypesOptions?.find((option) => option.value === method?.data.typeMethod.id)?.value ?? '',
      images:
        method?.data?.photoProjectiveMethods.map((p) => ({
          file: base64ToFile(p.photoMethod, 'current_photo'),
          url: p.photoMethod,
          createdAt: p.dateCreatePhoto,
        })) ?? [],
    }))
  }, [isPendingMethod, method])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Добавить методику"
      className={cn(styles.modalContent, 'flex flex-col')}
      overlayClassName={styles.modalOverlay}>
      <div className="text-black font-ebgaramond font-bold text-[33px]">Просмотр методики</div>
      <div className="mt-[18px] mb-[31px] flex flex-col gap-[5px]">
        {!isPendingTypes && methodTypes && (
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
              isDisabled
              value={selectedOption}
              onChange={(option) => setValues((prev) => ({ ...prev, method: (option as IValueLabelModel)?.value }))}
            />
          </>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {values.images.map((image, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => setSelectedImage(image.url)}>
            <Image
              src={image.url}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded-[6px]"
              width={96}
              height={96}
            />
            <span>{image.createdAt}</span>
          </div>
        ))}
      </div>
      {isPendingMethod && <Spinner />}
      <div className="border-t border-[#CACACA] mt-[25px] w-full flex gap-[15px] justify-end pt-[10px]">
        <Button
          onClick={onClose}
          className="bg-[#EA660C] py-[5px] px-[10px] rounded-[6px] text-white font-montserrat font-semibold">
          Закрыть
        </Button>
      </div>
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        contentLabel="Увеличенное изображение"
        className={'flex justify-center items-center'}
        overlayClassName={styles.modalOverlay}>
        {selectedImage && (
          <>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl font-bold cursor-pointer"
              aria-label="Закрыть модалку">
              <X />
            </button>
            <Image
              src={selectedImage}
              alt="Увеличенное изображение"
              className="object-contain max-w-full max-h-full"
              width={800}
              height={600}
            />
          </>
        )}
      </Modal>
    </Modal>
  )
}
