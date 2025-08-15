import { useEffect, useRef } from 'react'

export interface DropdownItemProps {
  key: number | string
  onClick: () => void
  label: string
}

interface DropdownMenuProps {
  onClose: () => void
  items: DropdownItemProps[]
}

export function DropdownMenu({ onClose, items }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose() // Закрываем меню
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div ref={menuRef} className="absolute right-[0px] top-[40px] bg-white shadow-lg rounded-lg z-10 w-[150px] py-2">
      <ul className="flex flex-col gap-1">
        {items.map((el) => (
          <li
            className="px-4 py-2 hover:bg-[#D9D9D9] cursor-pointer text-sm"
            key={el.key}
            onClick={() => {
              el.onClick()
              onClose()
            }}>
            {el.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
