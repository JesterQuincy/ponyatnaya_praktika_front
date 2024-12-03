import { type ChangeEventHandler, forwardRef } from 'react'
import styles from '@/styles/field.module.css'

interface InputFieldProps {
  id: string
  extra?: string
  placeholder: string
  variant?: string
  state?: 'error' | 'success'
  disabled?: boolean
  type?: string
  isNumber?: boolean
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, extra, type, placeholder, state, disabled, isNumber, ...rest }, ref) => {
    return (
      <div className={`${extra}`}>
        <label htmlFor={id} className={styles.labelContainer}></label>
        <input
          ref={ref}
          disabled={disabled}
          type={type}
          id={id}
          placeholder={placeholder}
          className={styles.input}
          onKeyDown={(event) => {
            if (
              isNumber &&
              !/[0-9]/.test(event.key) &&
              event.key != 'Backspace' &&
              event.key != 'Tab' &&
              event.key != 'Enter' &&
              event.key != 'ArrowLeft' &&
              event.key != 'ArrowRight'
            ) {
              event.preventDefault()
            }
          }}
          {...rest}
        />
      </div>
    )
  },
)

Field.displayName = 'field'
