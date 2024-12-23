import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { copyToClipboard } from '@/helpers/utils/getLink'
import { FC, useRef, useState } from 'react'
import { MutateOptions } from '@tanstack/react-query'

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

  return (
    <div className="ml-auto">
      <div className="w-full flex-col items-end px-4 flex">
        <button
          type={'submit'}
          className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px] mb-3 disabled:cursor-not-allowed disabled:bg-[#8E8E8E]"
          disabled={isLoading}>
          Сохранить
        </button>
        <Popover open={!!popoverData.length}>
          <PopoverTrigger asChild>
            <button
              type={'button'}
              onClick={async () => {
                const text = await copyToClipboard(linkData, id)

                if (!text) {
                  return
                }

                setPopoverData(`${text.slice(0, 19)}...`)

                // Сброс предыдущего таймера, если он существует
                if (popoverTimeout.current) {
                  clearTimeout(popoverTimeout.current)
                }

                // Установка нового таймера
                popoverTimeout.current = setTimeout(() => {
                  setPopoverData('')
                }, 3000)
              }}
              disabled={isPendingLink}
              className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px]  disabled:cursor-not-allowed disabled:bg-[#8E8E8E]">
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
