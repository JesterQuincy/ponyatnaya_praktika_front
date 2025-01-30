'use client'

import { useGetAccount } from '@/api/hooks/account/useGetAccount'
import { useUpdateAccount } from '@/api/hooks/account/useUpdateAccount'
import AccountPersonal from '@/components/layout/account/accountPersonal'
import AccountPublic from '@/components/layout/account/accountPublic'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { accountSchema } from '@/models/accountSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import loadingIcon from '@/public/icon/loadingIcon.svg'

export default function AccountPage() {
  const { data } = useGetAccount()
  const { mutateAsync, status } = useUpdateAccount()
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      userDiplomasList: [],
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
      })
    }
  }, [data, form])

  const onSubmit = form.handleSubmit(async (dataForm) => {
    try {
      await mutateAsync({
        ...dataForm,
        id: data?.id,
        userDiplomasList: dataForm.userDiplomasList || undefined,
      })
    } catch {}
  })

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={
          status == 'pending'
            ? 'pointer-events-none opacity-50 grid h-full  grid-rows-[40px_1fr] gap-[20px] grid-cols-[2fr_1fr] w-full'
            : 'grid h-full  grid-rows-[40px_1fr] gap-[20px] grid-cols-[2fr_1fr] w-full'
        }>
        <h1 className="text-4xl font-ebgaramond font-bold col-span-2">Личный кабинет терапевта</h1>
        <div className="flex relative gap-7 p-5 flex-col h-full rounded-[5px] bg-[#F1F1F1]">
          <AccountPublic form={form} UserId={data?.id || 0} />
          <Button className="absolute right-3 bottom-3 min-w-40 min-h-10" type="submit" variant="orange">
            {status == 'pending' ? (
              <Image className="animate-spin" width={25} height={25} src={loadingIcon} alt="" />
            ) : (
              'Сохранить'
            )}
          </Button>
        </div>
        <div className="flex gap-7 p-5 flex-col h-full rounded-[5px] bg-[#F1F1F1]">
          <AccountPersonal form={form} />
        </div>
      </form>
    </Form>
  )
}
