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

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: 4,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 9999,
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        overflowY: 'auto',
      }}>
      {items.map((item, index) => (
        <div
          key={index}
          className="p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            item.onClick()
            onClose()
          }}>
          {item.label}
        </div>
      ))}
    </div>
  )
}
