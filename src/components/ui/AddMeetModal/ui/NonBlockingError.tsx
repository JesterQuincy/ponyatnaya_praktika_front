import React from 'react'
import dayjs from 'dayjs'

export type OtherMeetItem = {
  name: string
  eventDate: string
}

type Props = {
  items?: OtherMeetItem[]
  title?: React.ReactNode // передай null, чтобы скрыть заголовок
  timeFormat?: string // по умолчанию 'HH:mm'
  className?: string
}

export default function NonBlockingError({ items, title, timeFormat = 'HH:mm', className }: Props) {
  const list = items ?? []
  if (list.length === 0) return null

  const heading = title === undefined ? 'Пересечение с иными встречами' : title

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 ${className ?? ''}`}>
      {heading ? <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{heading}</h4> : null}

      <div className="mt-2 divide-y divide-gray-200 text-sm dark:divide-gray-800" role="list">
        {list.map((el, i) => {
          const [date, startTime, endTime] = el.eventDate.split(' ')
          const d = dayjs(el.eventDate)
          const timeStr = d.isValid() ? d.format(timeFormat) : '—'
          const key = `${el?.name ?? 'meet'}-${d.isValid() ? d.format('YYYYMMDDHHmmss') : String(el.eventDate ?? '')}-${i}`

          return (
            <div key={key} role="listitem" className="flex items-center justify-between py-2">
              <span className="font-medium text-gray-900 dark:text-gray-100">{el.name}</span>
              <div className="flex flex-col">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  Дата встречи: {date}
                </span>
                {!!startTime && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    Начало встречи: {startTime}
                  </span>
                )}
                {!!endTime && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    Конец встречи: {endTime}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
