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

export const copyAndLoadToClipboard = async (linkData: any, id: string | number) => {
  try {
    // 1. Загружаем данные ЗАРАНЕЕ (перед копированием)
    const { data } = await linkData(String(id))
    const [typeValue, tokenValue] = data.split('/')

    const url = `${BASE_HOST}/questionnaire?type=${typeValue}&token=${tokenValue}`

    // 2. Копирование должно быть синхронным
    safeCopy(url)

    toast.success('Ссылка скопирована')

    return url
  } catch (e) {
    toast.error('Ошибка копирования')
  }
}

function safeCopy(text: string) {
  const input = document.createElement('input')
  input.value = text

  input.style.position = 'absolute'
  input.style.left = '-9999px'
  input.style.fontSize = '16px'

  document.body.appendChild(input)

  input.select()
  input.setSelectionRange(0, text.length)

  document.execCommand('copy')
  input.remove()
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
