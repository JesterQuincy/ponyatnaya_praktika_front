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

export async function copyTextUniversal(text: string) {
  try {
    //
    // --- 1. Современный Clipboard API (Chrome, Safari >= 13.1, Firefox) ---
    //
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    //
    // --- 2. iOS Safari / старые WebKit (используем textarea-хак) ---
    //
    const textArea = document.createElement('textarea')

    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.width = '1px'
    textArea.style.height = '1px'
    textArea.style.opacity = '0'
    textArea.style.fontSize = '16px'
    // 16px — важно! иначе iOS блокирует focus()

    document.body.appendChild(textArea)

    textArea.focus()
    textArea.select()

    const result = document.execCommand('copy')
    textArea.remove()

    return result
  } catch (e) {
    return false
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
  try {
    const { data } = await linkData(String(id))

    const [typeValue, tokenValue] = data.split('/')

    const url = `${BASE_HOST}/questionnaire?type=${typeValue}&token=${tokenValue}`

    const copied = await copyTextUniversal(url)

    if (copied) {
      toast.success('Ссылка скопирована в буфер обмена')
      return url
    } else {
      toast.error('Не удалось скопировать ссылку')
    }
  } catch {
    toast.error('Ошибка при копировании ссылки')
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
