import { toast } from 'react-toastify'
import { MutateOptions } from '@tanstack/react-query'
import { BASE_HOST } from '@/api/interceptors'

export const getLink = async (
  linkData: (
    variables: string,
    options?: MutateOptions<{ data: string }, Error, string, unknown> | undefined,
  ) => Promise<{ data: string }>,
  id: string | number,
) => {
  try {
    const { data } = await linkData(String(id)) // Запрос данных

    const textWithUrl = `${BASE_HOST}/${data}`

    await navigator.clipboard.writeText(textWithUrl) // Копирование в буфер обмена

    toast.success('Ссылка скопирована в буфер обмена')

    return textWithUrl
  } catch (error) {
    toast.error('Ошибка при копировании ссылки')
  }
}

/** Костыль-функция для копирования ссылки для http протокола */
export const copyAndLoadToClipboard = async (
  linkData: (
    variables: string,
    options?: MutateOptions<{ data: string }, Error, string, unknown> | undefined,
  ) => Promise<{ data: string }>,
  id: string | number,
) => {
  const textArea = document.createElement('textarea')

  try {
    const { data } = await linkData(String(id)) // Запрос данных

    const parts = data.split('/')

    const typeValue = parts[0] // Тип
    const tokenValue = parts[1] // Токен

    const newString = `type=${typeValue}&token=${tokenValue}`

    textArea.value = `${BASE_HOST}/questionnaire?${newString}`
    textArea.style.position = 'fixed' // Чтобы текстовое поле не отображалось
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand('copy')

    if (successful) {
      toast.success('Ссылка скопирована в буфер обмена')

      return textArea.value
    }

    toast.error('Не удалось скопировать ссылку')
  } catch {
    toast.error('Ошибка при копировании ссылки')
  } finally {
    document.body.removeChild(textArea)
  }
}

export const copyLink = async (link: string) => {
  try {
    await navigator.clipboard.writeText(link)
    toast.success('Ссылка скопирована в буфер обмена')

    return link
  } catch (error) {
    console.error('Ошибка копирования:', error)
    toast.error('Ошибка при копировании ссылки')
  }
}
