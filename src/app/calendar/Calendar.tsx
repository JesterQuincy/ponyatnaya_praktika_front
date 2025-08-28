'use client'

import styles from '@/styles/calendar.module.css'
import Header from '@/components/ui/calendar/CalendarHeader'
import { AddClientModal } from '@/components/ui/ModalOverlay'
import { AddMeetModal } from '@/components/ui/AddMeetModal'
import { useState, ReactNode } from 'react'
import SideBar from '@/components/ui/calendar/CalendarSideBar'
import { NonWorkingDayModal } from '@/components/ui/NonWorkingDayModal'

interface CalendarProps {
  children: ReactNode
}

export function Calendar({ children }: CalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenModalMeet, setIsOpenModalMeet] = useState(false)
  const [isOpenNonWorkingDayModal, setIsOpenNonWorkingDayModal] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModalMeet = () => {
    setIsOpenModalMeet(true)
  }

  const handleCloseModalMeet = () => {
    setIsOpenModalMeet(false)
  }

  const handleOpenNonWorkingDayModal = () => {
    setIsOpenNonWorkingDayModal(true)
  }

  const handleCloseNonWorkingDayModal = () => {
    setIsOpenNonWorkingDayModal(false)
  }

  return (
    <div className={styles.MainBody}>
      <SideBar />
      <div className={styles.CentralContainer}>
        <Header
          onOpenModal={handleOpenModal}
          onOpenModalMeet={handleOpenModalMeet}
          onOpenNonWorkingDayModal={handleOpenNonWorkingDayModal}
        />
        <div className={styles.Content}>{children}</div>
      </div>
      <AddClientModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddMeetModal isOpen={isOpenModalMeet} onClose={handleCloseModalMeet} />
      <NonWorkingDayModal isOpen={isOpenNonWorkingDayModal} onClose={handleCloseNonWorkingDayModal} />
    </div>
  )
}
