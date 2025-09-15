'use client'

import { useEffect, useMemo } from 'react'
import { useGetAllTypes } from '@/api/hooks/methods/useGetAllTypes'
import { useCreateMethodType } from '@/api/hooks/methods/useCreateMethodType'
import { fileToBase64 } from '@/helpers/utils/fileToBase64'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useGetMethodById } from '@/api/hooks/methods/useGetMethodById'
import { useUpdateProjMethod } from '@/api/hooks/methods/useUpdateProjMethod'
import { useGetMeeting } from '@/api/hooks/meet/useGetMeeting'
import { base64ToFile } from '@/helpers/utils/base64ToFile'
import { MethodicModal } from '@/components/ui/forms/MeetForm/modals/components/MethodicModal'
import { useMethodForm } from '@/components/ui/forms/MeetForm/modals/useMethodForm'

interface IMeetingModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
}

export const EditMethodicModal = ({ isOpen, onClose, id }: IMeetingModalProps) => {
  const paramsId = useSearchParams().get('id')

  const { data: methodTypes, isPending: isPendingTypes } = useGetAllTypes()
  const { mutateAsync: createType, isPending: isPendingCreateType } = useCreateMethodType()
  const { mutateAsync: updateMethod, isPending: isPendingUpdateMethod } = useUpdateProjMethod()
  const { data: method, isPending: isPendingMethod } = useGetMethodById(id)
  const { data: meet, isPending: isPendingMeet } = useGetMeeting(Number(paramsId))

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
    setValues,
  } = useMethodForm(methodTypes?.data)

  const isLoading = useMemo(
    () => isPendingTypes || isPendingCreateType || isPendingUpdateMethod || isPendingMethod || isPendingMeet,
    [isPendingTypes, isPendingCreateType, isPendingUpdateMethod, isPendingMethod, isPendingMeet],
  )

  useEffect(() => {
    if (isPendingMethod) return

    setValues((prev) => ({
      ...prev,
      method: methodTypesOptions?.find((option) => option.value === method?.data.typeMethod.id)?.value ?? '',
      images:
        method?.data?.photoProjectiveMethods.map((p) => ({
          file: base64ToFile(p.photoMethod, 'current_photo'),
          url: p.photoMethod,
        })) ?? [],
    }))
  }, [isPendingMethod, method])

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

      await updateMethod({
        id: method?.data.id,
        typeMethod: { id: type },
        meet,
        photoProjectiveMethods: base64Images.map((base64Image) => ({ photoMethod: base64Image })),
        dateCreateMethod: method?.data.dateCreateMethod,
      })

      toast.success('Вы успешно добавили методику')

      handleCloseModal()
    } catch {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <MethodicModal
      label={'Редактировать методику'}
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      methodTypes={methodTypes?.data}
      selectedOption={selectedOption}
      values={values}
      showNewType={showNewType}
      methodTypesOptions={methodTypesOptions}
      onNewType={handleNewType}
      removeImage={removeImage}
      onImageChange={handleImageChange}
      onInputChange={handleInputChange}
    />
  )
}
