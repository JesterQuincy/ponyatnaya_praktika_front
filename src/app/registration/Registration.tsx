'use client'
import {Input} from "@/components/ui/input"
import {SubmitHandler, useForm} from "react-hook-form"
import {AuthForm} from "@/types/auth.types";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth.service";
import {toast} from "react-toastify";
import Logo from "@/public/img/authLogo.svg"
import FeedLogo from "@/public/img/feedBack.svg"
import Image from "next/image";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";

export function Registration() {
    const {register, handleSubmit, reset} = useForm<AuthForm>({
        mode: 'onChange',
    })

    const [isLoginForm, setIsLoginForm] = useState(false)
    const {push} = useRouter()
    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: AuthForm) => authService.main(data),
        onSuccess() {
            toast.success('Login successful!')
            reset()
            push('/calendar')
        }
    })

    const onSubmit: SubmitHandler<AuthForm> = data => {
        mutate(data)
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6 pt-12">
                    <Image src={Logo} alt="Logo company" width={201} height={145}/>
                </div>
                <div className="flex justify-center mt-32 font-bold mb-3 text-xl font-ebgaramond">Регистрация</div>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        className='w-full'
                        id='username'
                        placeholder='Фамилия'
                        type='text'
                        {...register('username', {required: 'Username is required'})}
                    />
                    <Input
                        className='w-full'
                        id='username'
                        placeholder='Логин'
                        type='text'
                        {...register('username', {required: 'Username is required'})}
                    />
                    <Input
                        className='w-full'
                        id='username'
                        placeholder='Имя'
                        type='text'
                        {...register('username', {required: 'Username is required'})}
                    />
                    <Input
                        className='w-full'
                        id='username'
                        placeholder='Отчество'
                        type='text'
                        {...register('username', {required: 'Username is required'})}
                    />
                    <Input
                        id='password'
                        placeholder='Электронная почта или телефон'
                        type='password'
                        {...register('password', {required: 'Password is required'})}
                    />
                    <Input
                        id='password'
                        placeholder='Пароль'
                        type='password'
                        {...register('password', {required: 'Password is required'})}
                    />
                    <Input
                        id='password'
                        placeholder='Повторите пароль'
                        type='password'
                        {...register('password', {required: 'Password is required'})}
                    />
                    <div className="flex flex-row justify-between">
                        <div className="flex items-center space-x-2 ">
                            <Checkbox />
                            <label htmlFor="rememberMe" className="text-xs font-medium">Запомнить</label>
                        </div>
                        <a href="/forgot-password" className="text-orange underline text-xs">Забыли пароль?</a>
                    </div>
                    <div className="flex justify-center">
                        <Button className="w-full" onClick={() => setIsLoginForm(true)}>Зарегистрироваться</Button>
                    </div>
                    <div className="flex justify-center text-sm text-gray-600 mb-32">
                        <a href="/auth" className="text-orange underline text-xs">Уже зарегестрирован</a>
                    </div>
                </form>
                <div className="flex flex-row justify-center mt-52">
                    <Image src={FeedLogo} width={13} height={13} alt="svg"/>
                    <a href="/contact-developers" className="ml-2 text-blackMedium underline">Связь с разработчиками</a>
                </div>
                <hr className="my-2 border-gray"/>
                <div className="text-center text-xs font-medium text-blackMedium">
                    <p>© 2024, ООО «Понятная практика»</p>
                </div>
            </div>
        </div>
    )
}