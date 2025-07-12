import { useCallback, useEffect, useRef } from 'react'
import { useDeleteMeeting } from '@/api/hooks/meet/useDeleteMeeting'
import { toast } from 'react-toastify'

interface DropdownMenuProps {
  onClose: () => void
  id: number
}

export function DropdownMenu({ onClose, id }: DropdownMenuProps) {
  const { mutateAsync: deleteMeeting } = useDeleteMeeting()

  const menuRef = useRef<HTMLDivElement>(null)

  const handleDelete = useCallback(async () => {
    if (!id) return

    const toastId = toast.loading('Удаление встречи...')

    try {
      await deleteMeeting(id)

      toast.update(toastId, {
        render: 'Вы успешно удалили встречу',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch {
      toast.update(toastId, {
        render: 'Ошибка при удалении встречи',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    } finally {
      onClose()
    }
  }, [deleteMeeting, id, onClose])

  useEffect(() => {
    // Функция для закрытия при клике вне меню
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose() // Закрываем меню
      }
    }

    // Добавляем слушатель события
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Убираем слушатель события при размонтировании
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div ref={menuRef} className="absolute right-[20px] top-[40px] bg-white shadow-lg rounded-lg z-10 w-[150px] py-2">
      <ul className="flex flex-col gap-1">
        <li className="px-4 py-2 hover:bg-[#D9D9D9] cursor-pointer text-sm" onClick={handleDelete}>
          Удалить
        </li>
      </ul>
    </div>
  )
}
