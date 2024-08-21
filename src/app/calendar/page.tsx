import type {Metadata} from 'next'
import {CalendarUser} from "@/app/calendar/Calendar";

export const metadata: Metadata = {
    title:'Calendar',
}

export default function CalendarPage () {
    return <CalendarUser />
}