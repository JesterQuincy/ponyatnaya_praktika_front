'use client'

import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthForm } from '@/helpers/types/auth'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { toast } from 'react-toastify'
import Logo from '@/public/img/authLogo.png'
import FeedLogo from '@/public/img/feedBack.svg'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Login() {
  const { register, handleSubmit, reset } = useForm<AuthForm>({
    mode: 'onChange',
  })

  const [isLoginForm, setIsLoginForm] = useState(false)
  const { push } = useRouter()
  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: AuthForm) => authService.main(data),
    onSuccess() {
      toast.success('Вы успешно авторизовались!')
      reset()
      push('/calendar')
    },
  })

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
    mutate(data)
  }

  return (
    <div className="min-h-full h-screen flex items-center justify-center overflow-hidden my-auto">
      <div className="bg-white px-8 py-4 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-2">
          <Image src={Logo} alt="Logo company" width={171} height={115} />
        </div>
        <div className="flex justify-center mt-32 font-bold mb-3 text-xl font-ebgaramond">Вход</div>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full"
            id="username"
            placeholder="Логин"
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          <Input
            id="password"
            placeholder="Пароль"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-2 ">
              <Checkbox />
              <label htmlFor="rememberMe" className="text-xs font-medium">
                Запомнить
              </label>
            </div>
            <a href="/forgot-password" className="text-orange underline text-xs">
              Забыли пароль?
            </a>
          </div>

          <Button
            variant="default"
            type="submit"
            className="w-full bg-orange text-white hover:bg-orange/80 rounded-[6px]"
            onClick={() => setIsLoginForm(true)}>
            Войти
          </Button>

          <div className="flex justify-center text-sm text-gray-600 mb-32">
            <Link href="/registration" className="text-orange underline text-xs">
              Регистрация нового пользователя
            </Link>
          </div>
        </form>
        <div className="flex justify-center mt-4 items-center">
          <Image src={FeedLogo} alt="Logo company" width={18} height={18} />
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
