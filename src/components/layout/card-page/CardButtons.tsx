import { FC, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'react-toastify'

import { copyLink } from '@/helpers/utils/getLink'
import { useGetLink } from '@/api/hooks/profile-link/useGetLink'

interface ICardButtonsProps {
  id: string | number
  isLoading: boolean // загрузка формы "Сохранить"
}

export const CardButtons: FC<ICardButtonsProps> = ({ id, isLoading }) => {
  const popoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [popoverData, setPopoverData] = useState('')

  const { link, isLoading: isLinkLoading, error409 } = useGetLink(id)

  const handleClick = async () => {
    // 1. Пока запрос ещё идёт
    if (isLinkLoading) {
      toast.info('Ссылка ещё загружается...')
      return
    }

    // 2. Ссылка успешно получена — копируем
    if (link) {
      const copied = await copyLink(link)

      if (copied) {
        setPopoverData(`${link.slice(0, 19)}...`)

        if (popoverTimeout.current) clearTimeout(popoverTimeout.current)
        popoverTimeout.current = setTimeout(() => setPopoverData(''), 3000)
      }

      return
    }

    // 3. Был 409 — показываем текст, который пришёл с бэка
    if (error409) {
      toast.warning(error409, { autoClose: 5000 })
      return
    }

    // 4. Что-то другое пошло не так
    toast.error('Не удалось получить ссылку')
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
              onClick={handleClick}
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
