'use client'

import { useState } from 'react'
import { MeetHeader } from './MeetHeader'
import { MeetContent } from './MeetContent'
import { CreateMethodicModal, EditMethodicModal, ViewMethodicModal, DeleteMethodicModal } from './modals/components'
import { IMeetingDetails } from '@/types/meet/getMeetById'

interface IMeetFormProps {
  meetData: IMeetingDetails
}

export type TModalType =
  | { type: 'create'; id?: never }
  | { type: 'edit'; id: number }
  | { type: 'view'; id: number }
  | { type: 'delete'; id: number }
  | null

export function MeetForm({ meetData }: IMeetFormProps) {
  const [isOpenMethodicModal, setIsOpenMethodicModal] = useState<TModalType>(null)

  const handleChangeModal = () => {
    setIsOpenMethodicModal(null)
  }

  return (
    <div>
      <MeetHeader headerData={meetData} />
      <MeetContent content={meetData} modalOpen={setIsOpenMethodicModal} />
      <CreateMethodicModal isOpen={isOpenMethodicModal?.type === 'create'} onClose={handleChangeModal} />
      {isOpenMethodicModal?.id && (
        <EditMethodicModal
          isOpen={isOpenMethodicModal?.type === 'edit'}
          id={isOpenMethodicModal?.id}
          onClose={handleChangeModal}
        />
      )}
      {isOpenMethodicModal?.id && (
        <ViewMethodicModal
          id={isOpenMethodicModal?.id}
          onClose={handleChangeModal}
          isOpen={isOpenMethodicModal?.type === 'view'}
        />
      )}
      {isOpenMethodicModal?.id && (
        <DeleteMethodicModal
          id={isOpenMethodicModal?.id}
          onClose={handleChangeModal}
          isOpen={isOpenMethodicModal?.type === 'delete'}
        />
      )}
    </div>
  )
}
