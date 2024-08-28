'use client'

import styles from '@/styles/calendarheader.module.css'
import AddClientModal from "@/components/ui/ModalOverlay";
import {useState} from "react";

// @ts-ignore
export default function CalendarHeader({ onOpenModal, onOpenModalMeet }) {

    return (
        <div className={styles.MainContainer}>
            <input className={styles.Input} placeholder={'Найти клиента'} />
            <div className={styles.buttonsGroup}>
                <button onClick={onOpenModal} className={styles.addClient}>Добавить клиента</button>
                <button className={styles.newEvent} onClick={onOpenModalMeet}>Назначить встречу</button>
                <button className={styles.addDayOff}>Нерабочие дни</button>
            </div>
        </div>
    )
}
