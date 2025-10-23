import { EventContentArg } from '@fullcalendar/core'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { Badge } from '@/components/ui/badge'
import styles from '@/styles/calendarbody.module.css'

export const renderEventContent = (arg: EventContentArg) => {
  if (arg.event.display === 'background') {
    return <div className={'m-[0.5em] italic text-[0.85em]'}>{arg.event.title}</div>
  }

  const isMonth = arg.view.type.startsWith('dayGrid')
  const text = arg.event.title ?? ''
  const time = arg.timeText ?? ''
  const tooltipText = isMonth && time ? `${time} ${text}` : text
  const bgColor = arg.event.extendedProps.formatMeet === 'Онлайн' ? 'bg-orange' : 'bg-[#049ADB]'
  const type = arg.event.extendedProps.meetingType === 'other'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* asChild важно, чтобы не ломать layout FC дополнительным wrapper’ом */}
        <div
          className={cn(
            'flex items-center min-w-0 gap-1 px-1 cursor-pointer overflow-hidden',
            !isMonth && 'flex-col items-start',
            type && 'cursor-default',
          )}>
          {isMonth && <span className={cn('inline-block min-h-2 min-w-2 rounded-full', bgColor)} aria-hidden />}
          <div className={'gap-1 flex items-center justify-start'}>
            {time && <span className="text-xs font-medium w-[max-content]">{time}</span>}
            {!isMonth && (
              <Badge variant={'outline'} className={'text-white rounded-[6px] px-2'}>
                {arg.event.extendedProps.formatMeet}
              </Badge>
            )}
          </div>
          <span className="truncate text-xs w-full">{text}</span>
        </div>
      </TooltipTrigger>
      <TooltipPortal container={typeof document !== 'undefined' ? document.body : undefined}>
        <TooltipContent side="top" align="start" sideOffset={6} className={cn(styles.calendarTooltip, 'max-w-[520px]')}>
          <p className="text-sm">{tooltipText}</p>
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}
