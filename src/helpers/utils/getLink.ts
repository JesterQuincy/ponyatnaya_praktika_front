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

export const getQuestionnaireUrl = async (linkData: any, id: string | number) => {
  const { data } = await linkData(String(id))

  const [typeValue, tokenValue] = data.split('/')

  return `${BASE_HOST}/questionnaire?type=${typeValue}&token=${tokenValue}`
}

export const safariCopy = (text: string) => {
  const input = document.createElement('input')
  input.value = text

  input.style.position = 'fixed'
  input.style.top = '0'
  input.style.left = '0'
  input.style.opacity = '0'
  input.style.fontSize = '16px'

  document.body.appendChild(input)

  input.focus()
  input.select()

  const ok = document.execCommand('copy')

  input.remove()

  return ok
}

export const safeSafariCopyWithAsyncUrl = async (loadUrl: () => Promise<string>) => {
  // 1. Захватываем user gesture — копированием пустой строки
  safariCopy('...')

  try {
    // 2. Загружаем настоящий URL (можно await)
    const url = await loadUrl()

    // 3. Ещё раз копируем — теперь Safari не блокирует
    const ok = safariCopy(url)

    return ok ? url : null
  } catch {
    return null
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
