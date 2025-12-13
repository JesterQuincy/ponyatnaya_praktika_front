import { FC, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useGetLink } from '@/api/hooks/profile-link/useGetLink'
import { ClientLinkModal } from './ClientLinkModal'
import axios from 'axios'
import { toast } from 'react-toastify'

interface ICardButtonsProps {
  id: string
  isLoading: boolean
}

export const CardButtons: FC<ICardButtonsProps> = ({ id, isLoading }) => {
  const [popoverData, setPopoverData] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [link, setLink] = useState('')

  const { mutateAsync: getLink, isPending } = useGetLink(id)

  const handleClick = async () => {
    try {
      const resp = await getLink(id)
      setLink(resp.data)
      setModalOpen(true)
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        const message =
          (typeof err.response?.data === 'string' && err.response.data) ||
          (typeof err.response?.data?.message === 'string' && err.response.data.message) ||
          'Ошибка при генерации ссылки'

        toast.error(message)
        return
      }

      toast.error('Ошибка при генерации ссылки')
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
              onClick={handleClick}
              disabled={isPending}
              className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px] disabled:cursor-not-allowed disabled:bg-[#8E8E8E]">
              Ссылка на анкету
            </button>
          </PopoverTrigger>

          <PopoverContent className="overflow-hidden border-none w-[170px] text-[#BDBDBD] shadow-none text-[16px] p-0">
            {popoverData}
          </PopoverContent>
        </Popover>
      </div>

      <ClientLinkModal modalOpen={modalOpen} setModalOpen={setModalOpen} link={link} />
    </div>
  )
}
