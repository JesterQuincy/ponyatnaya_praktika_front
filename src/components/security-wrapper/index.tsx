'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      isDisabled?: boolean
      inject?: (...args: any[]) => void
      on?: (...args: any[]) => void
      off?: (...args: any[]) => void
      emit?: (...args: any[]) => void
    }
  }
}

export default function SecurityWrapper() {
  useEffect(() => {
    // Отключаем React DevTools в продакшене
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      try {
        const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__

        if (hook) {
          // Если хук существует, "выключаем" его методы
          hook.isDisabled = true
          hook.inject = () => {}
          hook.on = () => {}
          hook.off = () => {}
          hook.emit = () => {}
        } else {
          // Если хука нет — создаём свой пустой объект
          Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
            value: {
              isDisabled: true,
              inject: () => {},
              on: () => {},
              off: () => {},
              emit: () => {},
            },
            configurable: true,
          })
        }
      } catch (e) {
        // Если не удалось изменить — молча игнорируем
      }
    }
  }, [])

  return null
}
