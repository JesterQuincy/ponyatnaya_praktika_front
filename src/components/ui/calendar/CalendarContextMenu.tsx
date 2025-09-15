'use client'

import React, { FC } from 'react'
import CustomContextMenu from '../context-menu'

type ContextMenuState = {
  x: number
  y: number
  type: 'default' | 'holiday'
  visible: boolean
}

type TCalendarContextMenuProps = {
  contextMenu: ContextMenuState
  onClose: () => void
  onDeleteMeeting: () => void
  onDeleteNonWorkingDay: () => void
  onChangeMeeting: () => void
}

export const CalendarContextMenu: FC<TCalendarContextMenuProps> = ({
  contextMenu,
  onClose,
  onDeleteMeeting,
  onDeleteNonWorkingDay,
  onChangeMeeting,
}) => {
  if (!contextMenu.visible) return null

  const items =
    contextMenu.type === 'default'
      ? [
          { label: 'Изменить встречу', onClick: onChangeMeeting },
          { label: 'Удалить встречу', onClick: onDeleteMeeting },
        ]
      : [{ label: 'Удалить выходной', onClick: onDeleteNonWorkingDay }]

  return <CustomContextMenu x={contextMenu.x} y={contextMenu.y} onClose={onClose} items={items} />
}
