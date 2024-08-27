'use client'

import styles from '@/styles/calendarheader.module.css'
import AddClientModal from "@/components/ui/ModalOverlay";
import {useState} from "react";

export default function CalendarHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.MainContainer}>
            <input className={styles.Input} placeholder={'Найти клиента'} />
            <div className={styles.buttonsGroup}>
                <button onClick={handleOpenModal} className={styles.addClient}>Добавить клиента</button>
                <button className={styles.newEvent}>Назначить встречу</button>
                <button className={styles.addDayOff}>Нерабочие дни</button>
            </div>
            <AddClientModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    )
}
