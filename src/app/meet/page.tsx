'use client'

import {Calendar} from "@/app/calendar/Calendar";
import Clients from "@/components/ui/clients/Clients";
import { Meet } from "@/app/meet/Meet";

export default function MeetPage() {
    return (
        <Calendar>
            <Meet />
        </Calendar>
    )
}