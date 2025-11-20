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

export const getQuestionnaireUrl = async (linkData: any, id: string | number): Promise<string> => {
  const { data } = await linkData(String(id))
  const [typeValue, tokenValue] = data.split('/')
  return `${BASE_HOST}/questionnaire?type=${typeValue}&token=${tokenValue}`
}

/**
 * Синхронный Safari-friendly copy (execCommand fallback).
 * Возвращает true если успешно.
 */
export const safariCopy = (text: string): boolean => {
  try {
    const input = document.createElement('input')
    input.value = text

    // Ставим так, чтобы iOS/iPadOS/Safari корректно фокусировали
    input.style.position = 'absolute'
    input.style.left = '-9999px'
    input.style.top = '0'
    input.style.fontSize = '16px' // важно для iOS
    input.setAttribute('aria-hidden', 'true')

    document.body.appendChild(input)

    input.focus()
    input.select()

    // Для input полезно явно выставить диапазон
    try {
      input.setSelectionRange(0, input.value.length)
    } catch (e) {
      // ignore: не все браузеры поддерживают
    }

    const ok = document.execCommand('copy')

    // очистка
    document.body.removeChild(input)

    return !!ok
  } catch (err) {
    console.error('safariCopy error:', err)
    return false
  }
}

/**
 * Хак: сначала синхронно фиксируем gesture, затем асинхронно загружаем URL и
 * подменяем содержимое буфера (тоже синхронно).
 *
 * loadUrl — функция, которая возвращает Promise<string>
 */
export const safeSafariCopyWithAsyncUrl = async (loadUrl: () => Promise<string>) => {
  // 1) Синхронно фиксируем жест (placeholder)
  // Важно: этот вызов должен происходить В ТОМ ЖЕ call-stack, что и пользовательский жест (onPointerDown / onClick)
  safariCopy('...')

  try {
    // 2) Загружаем реальный URL (можно await)
    const url = await loadUrl()

    // 3) Попробуем стандартный Clipboard API (только если доступен и страница HTTPS)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url)
        return url
      } catch {
        // если не получилось — падём к execCommand
      }
    }

    // 4) Синхронно подменяем буфер через execCommand
    const ok = safariCopy(url)
    return ok ? url : null
  } catch (e) {
    console.error('safeSafariCopyWithAsyncUrl load error', e)
    return null
  }
}

export const copyLink = async (link: string) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(link)
      toast.success('Ссылка скопирована в буфер обмена')
      return link
    }

    // fallback для Safari/старых браузеров
    const ok = safariCopy(link)
    if (!ok) {
      throw new Error('execCommand fallback failed')
    }

    toast.success('Ссылка скопирована в буфер обмена')
    return link
  } catch (error) {
    console.error('Ошибка копирования:', error)
    toast.error('Ошибка при копировании ссылки')
  }
}
