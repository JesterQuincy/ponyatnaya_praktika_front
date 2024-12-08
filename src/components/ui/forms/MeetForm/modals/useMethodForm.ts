import { useCallback, useState } from 'react'
import { IState } from '@/components/ui/forms/MeetForm/modals/types'
import { IMethodic } from '@/types/methods'

export const useMethodForm = (methodTypes: IMethodic[] | undefined) => {
  const [values, setValues] = useState<IState>({
    method: '',
    newMethod: '',
    images: [],
  })

  const [showNewType, setShowNewType] = useState(false)

  const methodTypesOptions = methodTypes?.map((item) => ({
    value: item.id,
    label: item.nameMethod,
  }))

  const selectedOption = methodTypesOptions?.find((option) => option.value === values.method) || null

  const handleInputChange = useCallback((field: keyof IState, value: IState[typeof field]) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleNewType = () => {
    handleInputChange('newMethod', '')
    setShowNewType((prev) => !prev)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)

      // Генерируем URL-ы для предварительного просмотра
      const updatedImages = selectedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))

      handleInputChange('images', [...values.images, ...updatedImages])
    }
  }

  const removeImage = (index: number) => {
    handleInputChange(
      'images',
      values.images.filter((_, i) => i !== index),
    )
  }

  const resetForm = () => {
    setValues({ method: '', newMethod: '', images: [] })
  }

  return {
    values,
    setValues,
    handleInputChange,
    handleImageChange,
    removeImage,
    resetForm,
    showNewType,
    methodTypesOptions,
    selectedOption,
    handleNewType,
  }
}
