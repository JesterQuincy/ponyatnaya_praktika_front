'use client'

import { useUser } from "@/app/context/userContext";

import { Heading } from "@/components/ui/Heading";
import { MeetForm } from "@/components/ui/forms/MeetForm/MeetForm";

import { useMeet } from "../context/meetContext";

import styles from "@/styles/card.module.css";

export function Meet() {
    const { user } = useUser();
    const { meet } = useMeet();

    const mockData = {
        date: "20.12.2024",
        time: "11:00 – 12:00",
        status: "Офлайн",
        name: "Валиева Камила Валерьевна",
        phone: "+7 (988) 902-12-23",
        email: "valieva.kamila@yandex.ru",
        paymentMethod: "Безналичная",
        amount: "5 000 ₽",
        nextMeetingDate: "15.09.2025",
        nextMeetingTime: "18:00 – 19:00"
    };

    return (
        <div className={styles.card}>
            <Heading title={meet?.title}/>
            <MeetForm meetData={meet} />
        </div>
    );
}
