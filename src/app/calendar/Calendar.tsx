'use client'

import styles from "@/styles/calendar.module.css"
import CalendarSideBar from "@/components/ui/calendar/CalendarSideBar"
import CalendarHeader from "@/components/ui/calendar/CalendarHeader"
import CalendarBody from "@/components/ui/calendar/CalendarBody"
import AddClientModal from "@/components/ui/ModalOverlay";
import AddMeetModal from "@/components/ui/AddMeetModal";
import {useState} from "react";


export function Calendar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenModalMeet, setIsOpenModalMeet] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModalMeet = () => {
        setIsOpenModalMeet(true);
    };
    const handleCloseModalMeet = () => {
        setIsOpenModalMeet(false);
    };


    return (
        <div className={styles.MainBody}>
            <CalendarSideBar/>
            <div className={styles.CentralContainer}>
                <CalendarHeader onOpenModal={handleOpenModal} onOpenModalMeet={handleOpenModalMeet}/>
                <CalendarBody />
            </div>
            <AddClientModal isOpen={isModalOpen} onClose={handleCloseModal}/>
            <AddMeetModal isOpen={isOpenModalMeet} onClose={handleCloseModalMeet}/>
        </div>
    )
}

