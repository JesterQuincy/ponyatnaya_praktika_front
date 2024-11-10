import { toast } from 'react-toastify'
import { MutateOptions } from '@tanstack/react-query'

export const getLink = async (
  linkData: (
    variables: string,
    options?: MutateOptions<{ data: string }, Error, string, unknown> | undefined,
  ) => Promise<{ data: string }>,
  id: string | number,
) => {
  try {
    const { data } = await linkData(String(id)) // Запрос данных

    await navigator.clipboard.writeText(data) // Копирование в буфер обмена

    toast.success('Ссылка скопирована в буфер обмена')
  } catch (error) {
    toast.error('Ошибка при копировании ссылки')
  }
}
