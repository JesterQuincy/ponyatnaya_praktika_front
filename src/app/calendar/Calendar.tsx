'use client'

import styles from "@/styles/calendar.module.css"
import CalendarSideBar from "@/components/ui/calendar/CalendarSideBar"
import CalendarHeader from "@/components/ui/calendar/CalendarHeader"
import CalendarBody from "@/components/ui/calendar/CalendarBody"


export function Calendar() {

    return (
        <div className={styles.MainBody}>
            <CalendarSideBar/>
            <div className={styles.CentralContainer}>
                <CalendarHeader />
                <CalendarBody />
            </div>
        </div>
    )
}

