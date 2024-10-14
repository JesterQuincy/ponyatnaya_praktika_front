import type {Metadata} from 'next'
import {Registration} from "@/app/registration/Registration";

export const metadata: Metadata = {
    title:'Регистрация',
}

export default function RegistrationPage() {
    return <Registration />
}