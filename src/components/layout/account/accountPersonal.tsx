import { InputAccount } from '@/components/layout/account/accountComponents'
import { accountSchema } from '@/models/accountSchema'
import { UseFormReturn } from 'react-hook-form'
import Image from 'next/image'
import { z } from 'zod'
import { fileToBase64 } from '@/helpers/utils/fileToBase64'
import { toast } from 'react-toastify'
import Default from '@/public/defaultAccount.webp'
import photoIcon from '@/public/icon/photoIcon.svg'
import { useRef } from 'react'
import { Label } from '@/components/ui/label'

interface AccountProps {
  form: UseFormReturn<z.infer<typeof accountSchema>>
}

export default function AccountPersonal({ form }: AccountProps) {
  const userImage = form.watch('userImage')
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function photoTo64(file: File) {
    try {
      const base64 = await fileToBase64(file)
      form.setValue('userImage', base64, { shouldDirty: true })
    } catch {
      toast.error('Не удалось загрузить изображение')
    }
  }

  return (
    <>
      <InputAccount form={form} name="lastName" label="Фамилия" />
      <InputAccount form={form} name="firstName" label="Имя" />
      <InputAccount form={form} name="secondName" label="Отчество" />
      <InputAccount form={form} name="city" label="Город" />
      <InputAccount form={form} name="phoneNumber" label="Телефон" type="tel" />
      <InputAccount form={form} name="mail" label="Email" type="email" />

      <Label className="cursor-pointer flex relative group w-[350px] h-[350px]">
        <Image
          width={350}
          height={350}
          className="rounded-sm group-hover:grayscale-[80%] transition-all duration-300"
          style={{ objectFit: 'cover' }}
          src={userImage ?? Default}
          alt="n"
        />
        <div className="transition-opacity duration-300 absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100  h-[100%] border-2 border-dashed border-grey">
          <span className="text-white text-lg font-semibold">
            <Image src={photoIcon} width={27} height={23} alt="photo" />
          </span>
        </div>
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept=".png, .jpg, .webp"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              photoTo64(e.target.files[0])
            }
          }}
        />
      </Label>
    </>
  )
}
