'use client'

import {SubmitHandler, useForm} from "react-hook-form"
import {AuthForm} from "@/types/auth.types";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth.service";
import {toast} from "react-toastify";
import styles from "@/styles/auth.module.css"
import {Heading} from "@/components/ui/Heading";
import {Field} from "@/components/ui/fields/Field";
import {Button} from "@/components/ui/buttons/Button";

export function Auth() {
    const {register, handleSubmit, reset} = useForm<AuthForm>({
        mode: 'onChange',
    })

    const [isLoginForm, setIsLoginForm] = useState(false)
    const {push} = useRouter()
    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data:AuthForm) => authService.main(data),
        onSuccess(){
            toast.success('Login successful!')
            reset()
            push('/calendar')
        }
    })

    const onSubmit:SubmitHandler<AuthForm> = data => {
        mutate(data)
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Heading  title='Вход'/>
                <Field
                    id='email'
                    placeholder='Введите почту:'
                    type='text'
                    extra='mb-4'
                    {...register('username' ,{required: 'Username is required'})}
                />
                <Field
                    id='password'
                    placeholder='Введите пароль:'
                    type='password'
                    extra='mb-6'
                    {...register('password' ,{required: 'Password is required'})}
                />
                <div className={styles.buttonContainer}>
                    <Button onClick={() => setIsLoginForm(true)}>Login</Button>
                    <Button onClick={() => setIsLoginForm(false)}>Register</Button>
                </div>
            </form>
        </div>
    )
}