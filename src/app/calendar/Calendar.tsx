'use client'

import styles from "@/styles/calendar.module.css";
import Header from "@/components/ui/calendar/CalendarHeader";
import CalendarBody from "@/components/ui/calendar/CalendarBody";
import AddClientModal from "@/components/ui/ModalOverlay";
import AddMeetModal from "@/components/ui/AddMeetModal";
import { useState, ReactNode } from "react";
import SideBar from "@/components/ui/calendar/CalendarSideBar";

interface CalendarProps {
    children: ReactNode;
}

export function Calendar({ children }: CalendarProps) {
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
            <SideBar />
            <div className={styles.CentralContainer}>
                <Header
                    onOpenModal={handleOpenModal}
                    onOpenModalMeet={handleOpenModalMeet}
                />
                {children}
            </div>
            <AddClientModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <AddMeetModal isOpen={isOpenModalMeet} onClose={handleCloseModalMeet} />
        </div>
    );
}
