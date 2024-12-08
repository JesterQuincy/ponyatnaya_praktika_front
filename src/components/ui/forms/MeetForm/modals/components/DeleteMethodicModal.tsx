'use client'

import Modal from 'react-modal'
import { Button } from '../../../../buttons/Button'
import styles from '@/styles/AddMeetModal.module.css'
import { cn } from '@/lib/utils'
import { useDeleteProjMethod } from '@/api/hooks/methods/useDeleteProjMethod'

interface IMeetingModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
}

export const DeleteMethodicModal = ({ isOpen, onClose, id }: IMeetingModalProps) => {
  const { mutateAsync: deleteProjMethod, isPending } = useDeleteProjMethod()

  const handleDelete = async () => {
    try {
      await deleteProjMethod(id)

      onClose()
    } catch {}
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Удалить методику"
      className={cn(styles.modalContent, 'flex flex-col')}
      overlayClassName={styles.modalOverlay}>
      <div className="text-black font-ebgaramond font-bold text-[33px]">Удаление методики</div>
      <p className={'my-4'}>Вы действительно хотите удалить методику?</p>
      <div className="border-t border-[#CACACA] mt-[25px] w-full flex gap-[15px] justify-end pt-[10px]">
        <Button onClick={onClose} className="text-[#525252] font-montserrat font-semibold">
          Отмена
        </Button>
        <Button
          disabled={isPending}
          onClick={handleDelete}
          className="bg-[#EA660C] py-[5px] px-[10px] rounded-[6px] text-white font-montserrat font-semibold">
          Удалить
        </Button>
      </div>
    </Modal>
  )
}
