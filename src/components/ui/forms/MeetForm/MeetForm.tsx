'use client'

import { useState } from 'react'

import { useMeet } from '@/app/context/meetContext'

import { MeetHeader } from './MeetHeader'
import { MeetContent } from './MeetContent'
import MethodicModal from './MethodicModal'
import { IMeetingDetails } from '@/types/meet/getMeetById'

interface IMeetFormProps {
  meetData: IMeetingDetails
}

export function MeetForm({ meetData }: IMeetFormProps) {
  const [isOpenMethodicModal, setIsOpenMethodicModal] = useState(false)

  const handleChangeModal = () => {
    setIsOpenMethodicModal(!isOpenMethodicModal)
  }

  return (
    <div>
      <MeetHeader headerData={meetData} />
      <MeetContent content={meetData} modalOpen={handleChangeModal} />
      <MethodicModal isOpen={isOpenMethodicModal} onClose={handleChangeModal} />
    </div>
  )
}
