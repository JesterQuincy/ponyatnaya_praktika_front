import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface IWrapperProps {
  children: ReactNode
  className?: string
}

export const Wrapper: FC<IWrapperProps> = ({ children, className }) => {
  return <div className={cn(className, 'wrapper h-mainContent w-screen overflow-auto')}>{children}</div>
}
