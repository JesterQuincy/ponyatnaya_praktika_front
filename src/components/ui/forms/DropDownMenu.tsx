import { useEffect, useRef } from 'react';

interface DropdownMenuProps {
    onClose: () => void;
}

export function DropdownMenu({ onClose }: DropdownMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Функция для закрытия при клике вне меню
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose(); // Закрываем меню
            }
        }

        // Добавляем слушатель события
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Убираем слушатель события при размонтировании
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={menuRef} className="absolute right-[20px] top-[40px] bg-white shadow-lg rounded-lg z-10 w-[150px] py-2">
            <ul className="flex flex-col gap-1">
                <li
                    className="px-4 py-2 hover:bg-[#D9D9D9] cursor-pointer text-sm"
                    onClick={onClose}
                >
                    Просмотреть
                </li>
                <li
                    className="px-4 py-2 hover:bg-[#D9D9D9] cursor-pointer text-sm"
                    onClick={onClose}
                >
                    Редактировать
                </li>
                <li
                    className="px-4 py-2 hover:bg-[#D9D9D9] cursor-pointer text-sm"
                    onClick={onClose}
                >
                    Создать копию
                </li>
                <li
                    className="px-4 py-2 hover:bg-[#D9D9D9] cursor-pointer text-sm"
                    onClick={onClose}
                >
                    Архивировать
                </li>
                <li
                    className="px-4 py-2 hover:bg-[#D9D9D9] cursor-pointer text-sm"
                    onClick={onClose}
                >
                    Удалить
                </li>
            </ul>
        </div>
    );
}
