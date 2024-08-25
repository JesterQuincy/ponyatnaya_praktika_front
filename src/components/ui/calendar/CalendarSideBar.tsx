'use client'

import styles from '@/styles/calendarsidebar.module.css'
import { PropsWithChildren } from "react";


export default function CalendarSideBar({ children }: PropsWithChildren) {
    return (
        <div className={styles.MainContainer}>
            <img  src="/Logo.png" alt={"adsds"}></img>
            <div>
                {children}
            </div>
        </div>
    )
}
