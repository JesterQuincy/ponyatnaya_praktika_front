import { InputAccount } from '@/components/layout/account/accountComponents'
import { Button } from '@/components/ui/button'
import { fileToBase64 } from '@/helpers/utils/fileToBase64'
import { accountSchema } from '@/models/accountSchema'
import React, { useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import Image from 'next/image'
import trashIcon from '@/public/icon/variantTrash.svg'
import { FormLabel } from '@/components/ui/form'
import Modal from 'react-modal'
import styles from '@/styles/AddMeetModal.module.css'
import { X } from 'lucide-react'

interface AccountProps {
  form: UseFormReturn<z.infer<typeof accountSchema>>
}

export default function AccountPublic({ form, UserId }: AccountProps & { UserId: number }) {
  const userDiplomas = form.watch('userDiplomasList')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>()

  async function setDiplomas(files: FileList) {
    const diploms = []
    try {
      for (let i of files) {
        const base64 = await fileToBase64(i)
        diploms.push({ UserId: UserId, photoDiploma: base64 })
      }
      if (userDiplomas) {
        form.setValue('userDiplomasList', [...userDiplomas, ...diploms], { shouldDirty: true })
      } else {
        form.setValue('userDiplomasList', diploms, { shouldDirty: true })
      }
    } catch {
      toast.error('Не удалось загрузить изображения')
    }
  }

  const deleteDiplom = (id: number) => {
    if (!userDiplomas) return

    const diploms = userDiplomas.filter((_, idm) => id !== idm)
    form.setValue('userDiplomasList', diploms, { shouldDirty: true })
  }

  const clickRef = () => {
    if (inputRef.current) inputRef.current.click()
  }
  return (
    <>
      <InputAccount form={form} name="specialization" label="Специализация" textarea={true} />
      <InputAccount
        form={form}
        name="professionalActivityDescription"
        label="Описание профессиональной деятельности"
        textarea={true}
      />
      <InputAccount form={form} name="education" label="Образование" textarea={true} />
      <div className="gap-3 flex flex-col">
        <FormLabel className="font-bold">Дипломы</FormLabel>
        <div className="flex gap-3">
          {(userDiplomas || []).map((el, id) => {
            return (
              <div className="flex flex-col" key={id}>
                <Image
                  width={100}
                  height={150}
                  className="h-min-[150px] cursor-pointer"
                  src={el.photoDiploma}
                  alt=""
                  onClick={() => {
                    setSelectedImage(el.photoDiploma)
                  }}
                />
                <Button
                  onClick={() => deleteDiplom(id)}
                  className="w-[30px] h-8 flex p-0 rounded-none mt-2"
                  variant="ghost"
                  type="button">
                  <Image className="w-[50px] h-[50px]" src={trashIcon} alt="" />
                </Button>
              </div>
            )
          })}
        </div>
        <Button className="w-32" variant="grey" type="button" onClick={clickRef}>
          Добавить
          <input
            multiple
            id="file-input"
            ref={inputRef}
            className="hidden"
            type="file"
            accept=".png, .jpg, .webp"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) setDiplomas(e.target.files)
            }}
          />
        </Button>
      </div>
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        contentLabel="Увеличенное изображение"
        className={'flex justify-center items-center'}
        overlayClassName={styles.modalOverlay}>
        {selectedImage && (
          <>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl font-bold cursor-pointer"
              aria-label="Закрыть модалку">
              <X />
            </button>
            <Image
              src={selectedImage}
              alt="Увеличенное изображение"
              className="object-contain max-w-full max-h-full"
              width={800}
              height={600}
            />
          </>
        )}
      </Modal>
    </>
  )
}
