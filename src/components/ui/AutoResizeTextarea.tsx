'use client'

import * as React from 'react'
import { Textarea, type TextareaProps } from '@/components/ui/textarea'

export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onInput, rows = 1, ...props }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null)

    React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement)

    const resize = (el: HTMLTextAreaElement) => {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      resize(e.currentTarget)
      onInput?.(e)
    }

    React.useEffect(() => {
      if (innerRef.current) {
        resize(innerRef.current)
      }
    }, [props.value])

    return (
      <Textarea
        {...props}
        ref={innerRef}
        onInput={handleInput}
        rows={rows}
        className={`resize-none overflow-hidden leading-[1.5] min-h-0 ${className ?? ''}`}
      />
    )
  },
)

AutoResizeTextarea.displayName = 'AutoResizeTextarea'
