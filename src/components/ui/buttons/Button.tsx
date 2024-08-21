import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from "@/styles/button.module.css"

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
    children,
    className,
   ...rest
}: PropsWithChildren<TypeButton>) {
    return (
        <button className={cn(className)} {...rest}>
            {children}
        </button>
    )
}