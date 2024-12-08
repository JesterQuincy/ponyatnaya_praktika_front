'use client'

import React, { useMemo } from 'react'
import { useGetAllTypes } from '@/api/hooks/methods/useGetAllTypes'
import { useCreateMethodType } from '@/api/hooks/methods/useCreateMethodType'
import { useCreateProjMethod } from '@/api/hooks/methods/useCreateProjMethod'
import { fileToBase64 } from '@/helpers/utils/fileToBase64'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { MethodicModal } from '@/components/ui/forms/MeetForm/modals/components/MethodicModal'
import { useMethodForm } from '@/components/ui/forms/MeetForm/modals/useMethodForm'

interface IMeetingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateMethodicModal = ({ isOpen, onClose }: IMeetingModalProps) => {
  const paramsId = useSearchParams().get('id')

  const { data: methodTypes, isPending: isPendingTypes } = useGetAllTypes()
  const { mutateAsync: createType, isPending: isPendingCreateType } = useCreateMethodType()
  const { mutateAsync: createProjMethod, isPending: isPendingCreateMethod } = useCreateProjMethod()

  const isLoading = useMemo(
    () => isPendingTypes || isPendingCreateType || isPendingCreateMethod,
    [isPendingCreateMethod, isPendingCreateType, isPendingTypes],
  )

  const {
    values,
    handleInputChange,
    handleImageChange,
    removeImage,
    resetForm,
    showNewType,
    methodTypesOptions,
    selectedOption,
    handleNewType,
  } = useMethodForm(methodTypes?.data)

  const handleCloseModal = () => {
    onClose()
    resetForm()
  }

  const handleSubmit = async () => {
    try {
      let type = selectedOption?.value

      if (!!values.newMethod) {
        const { data } = await createType({ nameMethod: values.newMethod })
        type = data
      }

      const base64Images = await Promise.all(values.images.map((img) => fileToBase64(img.file)))

      await createProjMethod({
        typeMethod: { id: type },
        meet: { id: Number(paramsId) },
        photoProjectiveMethods: base64Images.map((base64Image) => ({ photoMethod: base64Image })),
      })

      toast.success('Вы успешно добавили методику')

      handleCloseModal()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <MethodicModal
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      methodTypes={methodTypes?.data}
      selectedOption={selectedOption}
      values={values}
      showNewType={showNewType}
      label={'Добавить методику'}
      methodTypesOptions={methodTypesOptions}
      onNewType={handleNewType}
      removeImage={removeImage}
      onImageChange={handleImageChange}
      onInputChange={handleInputChange}
    />
  )
}
