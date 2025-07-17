import { Children, ReactNode, useEffect, useRef } from 'react'

export interface DropdownItemProps {
  onClick: (id: number) => void
  label: string
}

interface DropdownMenuProps {
  customerId: number
  onClose: () => void
  items: DropdownItemProps[]
}

export function DropdownMenu({ onClose, items, customerId }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

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
        {items.map((el, id) => (
          <li
            className="cursor-pointer align-baseline flex m-auto"
            key={id}
            onClick={() => {
              el.onClick(customerId)
              onClose()
            }}>
            {el.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
