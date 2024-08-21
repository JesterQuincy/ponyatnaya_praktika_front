'use client'

import styles from "@/styles/calendar.module.css"
// @ts-ignore
import {CalendarSideBar} from "@/components/ui/calendar/CalendarSideBar"
// @ts-ignore
import {CalendarHeader } from "@/components/ui/calendar/CalendarHeader"
// @ts-ignore
import {CalendarBody} from "@/components/ui/calendar/CalendarBody"

export function CalendarUser() {

    return (
        <div className={styles.MainBody}>
            <CalendarSideBar />
            <div className={styles.CentralContainer}>
                <CalendarHeader />
                <CalendarBody />
            </div>
        </div>
    )
}