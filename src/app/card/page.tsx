'use client'

import {Calendar} from "@/app/calendar/Calendar";
import Clients from "@/components/ui/clients/Clients";
import { Card } from "@/app/card/Card";

export default function CardPage() {
    return (
        <Calendar>
            <Card />
        </Calendar>
    )
}