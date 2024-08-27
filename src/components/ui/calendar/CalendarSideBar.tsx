'use client'

import styles from '@/styles/calendarsidebar.module.css'
import React, {PropsWithChildren, useEffect, useState} from "react";
import Image from "next/image"
import Logo from "@/public/LogoSVG.svg"
import PersonFoto from "@/public/Ellipse 1.png"
import ExitLogo from "@/public/Out.png"
import Client from "@/public/icon/client.png"
import CalendarIcon from "@/public/icon/calendar.png"
import { useRouter } from 'next/router';

export default function CalendarSideBar({ children }: PropsWithChildren) {
    const [currentPath, setCurrentPath] = useState('');
    const [showAll, setShowAll] = useState(false);



    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    }, []);

    const UserData = {
        "status": "string",
        "actualTimestamp": "string",
        "userData": {
        "userPicture": "string",
            "userName": "Антон",
            "userMail": "Aware444@gmail.com",
    }
    }

    const meetings = [
        { date: '12.09.2024', name: 'Белогорова Ирина' },
        { date: '14.09.2024', name: 'Константинопольский Вар...' },
        { date: '18.09.2024', name: 'Фёдоров Илья' },
        { date: '19.09.2024', name: 'Васильева Светлана' },
        { date: '22.09.2024', name: 'Колмановский Илья' },
        { date: '24.09.2024', name: 'Ольшанская Инна' },
        { date: '26.09.2024', name: 'Сидоров Алексей' }, // Добавьте больше встреч при необходимости
    ];

    const displayedMeetings = showAll ? meetings : meetings.slice(0, 6);


    return (
        <div className={styles.MainContainer}>
            <Image src={Logo} alt={"Logo company"} width={430}/>
            <div style={{borderBottom: '1px solid #D7D4D4', width: '90%', paddingTop: '5px'}}/>
            <div className={styles.ImageContainer}>
                <Image src={PersonFoto} alt={'Person Foto'} style={{borderRadius: '50%'}}/>
            </div>
            <div className={styles.UserNameContainer}>
                Привет, {UserData.userData.userName}!
            </div>
            <div className={styles.EmailContainer}>
                {UserData.userData.userMail} <Image src={ExitLogo} alt={'Out Button'}
                                                    style={{paddingLeft: '4px', cursor: 'pointer'}}/>
                <a href={"/auth"} className={styles.ButtonContainer}>
                    Выйти
                </a>
            </div>
            <div className={styles.NavigationButtons}>
                <a href={'/clients'}
                   className={currentPath === '/clients' ? styles.activeButton : styles.inactiveButton}> <Image
                    src={Client} alt={'Client'}/>Клиенты</a>
                <a href={'/calendar'}
                   className={currentPath === '/calendar' ? styles.activeButton : styles.inactiveButton}><Image
                    src={CalendarIcon} alt={'Calendar'}/>Календарь</a>
                <a href={'/notification'}
                   className={currentPath === '/notification' ? styles.activeButton : styles.inactiveButton}>Уведомления</a>
                <a href={'/analytic'}
                   className={currentPath === '/analytic' ? styles.activeButton : styles.inactiveButton}>Аналитика</a>
                <a href={'/tests'} className={currentPath === '/tests' ? styles.activeButton : styles.inactiveButton}>Опросы
                    и тесты</a>
            </div>
            <div className={styles.notificantion}>
                <div className={styles.countOfNotification}>У вас <a className={styles.action}>25</a> новых заявок:
                </div>
            </div>
            <div className={styles.container}>
                {displayedMeetings.map((meeting, index) => (
                    <div key={index} className={styles.meeting}>
                        <div className={styles.date}>{meeting.date}</div>
                        <div className={styles.name}>{meeting.name}</div>
                    </div>
                ))}
                {/* Кнопка "Все" появляется только если встреч больше 6 */}
                {meetings.length > 6 && (
                    <button onClick={() => setShowAll(!showAll)} className={styles.showAllButton}>
                        {showAll ? 'Скрыть' : 'Все'}
                    </button>
                )}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
