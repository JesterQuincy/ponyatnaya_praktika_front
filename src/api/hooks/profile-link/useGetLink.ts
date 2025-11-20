import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { profileLinkService } from '@/services/profile-link.service'
import { BASE_HOST } from '@/api/interceptors'

type LinkData = { data: string }

interface UseGetLinkResult {
  link: string | null // уже готовый URL анкеты
  isLoading: boolean // идёт запрос
  error409: string | null // текст ошибки 409, если был
}

export function useGetLink(id: string | number): UseGetLinkResult {
  const queryClient = useQueryClient()
  const [error409, setError409] = useState<string | null>(null)

  const { data, isPending, mutate } = useMutation<LinkData, unknown, string>({
    mutationKey: ['link', id],
    mutationFn: (id) => profileLinkService.getLink(id),
    onSuccess: () => {
      setError409(null)
      queryClient.invalidateQueries({ queryKey: ['link'] })
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        // если бэк сразу возвращает строку — оставляем так
        const msg = err.response.data as string
        setError409(msg)
      } else {
        setError409('Не удалось получить ссылку')
      }
    },
  })

  // Запрос при монтировании / смене id
  useEffect(() => {
    setError409(null)
    mutate(String(id))
  }, [id, mutate])

  // Конструируем URL анкеты из data вида "type/token"
  let link: string | null = null
  if (data?.data) {
    const [typeValue, tokenValue] = data.data.split('/')
    link = `${BASE_HOST}/questionnaire?type=${typeValue}&token=${tokenValue}`
  }

  return {
    link,
    isLoading: isPending,
    error409,
  }
}
