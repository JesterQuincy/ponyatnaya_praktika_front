import type {Metadata} from 'next'
import {Calendar} from "@/app/calendar/Calendar";

export const metadata: Metadata = {
    title:'Calendar',
}

export default function CalendarPage () {
    return <Calendar />
}