import { FC, useRef, useState } from 'react'
import { MutateOptions } from '@tanstack/react-query'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { getQuestionnaireUrl, safariCopy } from '@/helpers/utils/getLink'
import { toast } from 'react-toastify'

interface ICardButtonsProps {
  linkData: (
    variables: string,
    options?: MutateOptions<{ data: string }, Error, string, unknown> | undefined,
  ) => Promise<{ data: string }>
  id: string | number
  isPendingLink: boolean
  isLoading: boolean
}

export const CardButtons: FC<ICardButtonsProps> = ({ linkData, id, isPendingLink, isLoading }) => {
  const popoverTimeout = useRef<NodeJS.Timeout | null>(null)
  const [popoverData, setPopoverData] = useState('')

  const handleCopy = async () => {
    try {
      // 1. асинхронно получаем ссылку (это можно — Safari не против)
      const url = await getQuestionnaireUrl(linkData, id)
      if (!url) return

      // 2. копируем СИНХРОННО — Safari-friendly
      const ok = safariCopy(url)

      if (ok) {
        toast.success('Ссылка скопирована!')

        setPopoverData(`${url.slice(0, 19)}...`)

        if (popoverTimeout.current) clearTimeout(popoverTimeout.current)
        popoverTimeout.current = setTimeout(() => {
          setPopoverData('')
        }, 3000)
      } else {
        toast.error('Safari заблокировал копирование')
      }
    } catch (e) {
      toast.error('Ошибка копирования')
    }
  }

  return (
    <div className="ml-auto">
      <div className="w-full flex-col items-end px-4 flex">
        <button
          type="submit"
          className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px] mb-3 disabled:cursor-not-allowed disabled:bg-[#8E8E8E]"
          disabled={isLoading}>
          Сохранить
        </button>

        <Popover open={!!popoverData.length}>
          <PopoverTrigger asChild>
            <button
              type="button"
              onClick={handleCopy}
              disabled={isPendingLink}
              className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px] disabled:cursor-not-allowed disabled:bg-[#8E8E8E]">
              Ссылка на анкету
            </button>
          </PopoverTrigger>

          <PopoverContent className="overflow-hidden border-none w-[170px] text-[#BDBDBD] shadow-none text-[16px] p-0">
            {popoverData}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
