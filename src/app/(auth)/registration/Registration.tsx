'use client'

import { useRegisterUser } from '@/api/hooks/auth/useRegistration'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registrationSchema } from '@/models/registrationSchema'
import Logo from '@/public/img/authLogo.svg'
import FeedLogo from '@/public/img/feedBack.svg'
import AuthLogo from '@/public/icon/auth.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLogin } from '@/api/hooks/auth/useLogin'

export function Registration() {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      lastName: '',
      name: '',
      patronymic: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { mutateAsync, status } = useRegisterUser()
  const { mutateAsync: loginMutate, status: loginStatus } = useLogin()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await mutateAsync(data)
      await loginMutate({ username: data.username, password: data.password })

      form.reset()
    } catch {}
  })

  const isLoading = status === 'pending' || loginStatus === 'pending'

  return (
    <div className="min-h-full h-screen flex items-center justify-center overflow-hidden my-auto">
      <div className="bg-white px-8 py-4 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-2">
          <Image src={Logo} alt="Logo company" width={171} height={115} />
        </div>
        <div className="flex justify-center mt-2 font-bold mb-3 text-xl font-ebgaramond">Регистрация</div>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-3">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Фамилия" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Имя" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patronymic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Отчество" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Логин" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Электронная почта" type="email" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Пароль" type="password" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Повторите пароль" type="password" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-orange text-white hover:bg-orange/80 rounded-[6px]"
              variant="default"
              disabled={isLoading}>
              <div className="flex items-center justify-center">
                <Image src={AuthLogo} width={15} height={15} alt="Auth" />
                <span className="ml-2">Зарегистрироваться</span>
              </div>
            </Button>
          </form>
        </Form>
        <div className="flex justify-center text-sm text-gray-600 mt-3">
          <Link href="/login" className="text-orange underline text-xs">
            Уже зарегистрирован
          </Link>
        </div>
        <div className="flex justify-center mt-4">
          <Image src={FeedLogo} width={13} height={13} alt="Feedback Logo" />
          <Link href="/contact-developers" className="ml-2 text-blackMedium underline">
            Связь с разработчиками
          </Link>
        </div>
        <hr className="my-2 border-gray" />
        <div className="text-center text-xs font-medium text-blackMedium">
          <p>© 2024, ООО «Понятная практика»</p>
        </div>
      </div>
    </div>
  )
}
