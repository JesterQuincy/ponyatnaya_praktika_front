import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Ellipsis } from 'lucide-react'
import { Children, FC, ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import { Command, CommandItem, CommandList } from '@/components/ui/command'

interface IPopoverButtonProps {
  triggerClassName?: string
  contentClassName?: string
  className?: string
  children: ReactNode
}

export const PopoverButton: FC<IPopoverButtonProps> = ({ contentClassName, children, className, triggerClassName }) => {
  const [open, setOpen] = useState(false)

  const childrenArray = Children.toArray(children)

  return (
    <div className={cn(className, 'bg-[#E4E4E4] rounded-[4px] p-x-[8px]')}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={() => setOpen(true)} className={cn('p-[6px]', triggerClassName)}>
          <Ellipsis width="12px" height="12px" />
        </PopoverTrigger>
        <PopoverContent className={cn(contentClassName, 'bg-white border-none')}>
          <Command>
            <CommandList>
              {childrenArray.map((el, i) => {
                return (
                  <div key={i} className="hover:bg-red">
                    <CommandItem
                      onSelect={() => {
                        setOpen(false)
                      }}
                      key={i}
                      className='data-[selected="true"]:bg-[#D9D9D9] w-full cursor-pointer text-[14px]'>
                      {el}
                    </CommandItem>
                  </div>
                )
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
