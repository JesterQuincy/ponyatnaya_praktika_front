'use client'

import { useEffect, useRef, useState } from 'react'

interface MenuItem {
  label: string
  onClick: () => void
}

interface Props {
  x: number
  y: number
  items: MenuItem[]
  onClose: () => void
}

export default function CustomContextMenu({ x, y, items, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: y, left: x })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [onClose])

  useEffect(() => {
    if (!menuRef.current) return
    const rect = menuRef.current.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const left = Math.min(x, windowWidth - rect.width - 10)
    const top = Math.min(y, windowHeight - rect.height - 10)

    setPosition({ top, left })
  }, [x, y, items])

  useEffect(() => {
    const target = window

    target.addEventListener('scroll', onClose, true)

    return () => {
      target.removeEventListener('scroll', onClose, true)
    }
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="absolute z-[9999] bg-white border border-gray-300 rounded-md shadow-lg 
                 w-48 max-w-xs max-h-72 overflow-y-auto flex flex-col h-auto"
      style={{ top: position.top, left: position.left }}>
      {items.map((item, index) => (
        <button
          key={index}
          className="px-3 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            item.onClick()
            onClose()
          }}>
          {item.label}
        </button>
      ))}
    </div>
  )
}
