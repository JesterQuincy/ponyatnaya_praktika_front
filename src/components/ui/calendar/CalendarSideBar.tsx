'use client'

import styles from '@/styles/calendarsidebar.module.css'
import React, {PropsWithChildren, useEffect, useState} from "react";
import Image from "next/image"
import Logo from "@/public/LogoSVG.svg"
import PersonFoto from "@/public/Ellipse 1.png"
import ExitLogo from "@/public/Out.png"
import Client from "@/public/icon/client.png"
import CalendarIcon from "@/public/icon/calendar.png"
import {calendarService} from "@/services/calendar.service";
import {authService} from "@/services/auth.service";

export default function CalendarSideBar({ children }: PropsWithChildren) {
    const [currentPath, setCurrentPath] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [meetings, setMeetings] = useState([]);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    }, []);



    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                let id = 1;
                const response = await calendarService.getNotifications();
                const serverData = response.data;
                // Преобразуем данные встреч, если запрос успешен
                const transformedMeetings = serverData.map((item: any) => ({
                    date: new Date(item.dateFirstRequest).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }),
                    name: item.customerFullName,
                }));
                setMeetings(transformedMeetings);
            } catch (error) {
                console.error('Ошибка при загрузке уведомлений:', error);
                // Здесь можно установить отображение ошибки для встреч
            }
        };

        const fetchUserInfo = async () => {
            try {
                const response: any = await calendarService.getUserInfo();
                setUserData(response.data.userData);
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
                // Здесь можно установить отображение ошибки для данных пользователя
            }
        };

        fetchNotifications();
        fetchUserInfo(); // Этот вызов теперь будет независимым от fetchNotifications
    }, []);



    // @ts-ignore
    const userName = userData?.userName || 'не удалось загрузить';
    // @ts-ignore
    const userMail = userData?.userMail || 'не удалось загрузить';
    // @ts-ignore
    const userImage = userData?.userImage || PersonFoto;



    const displayedMeetings = showAll ? meetings : meetings.slice(0, 6);

    const handleExitOut = () => {
        authService.logout().then()
    }

    return (
        <div className={styles.MainContainer}>
            <Image src={Logo} alt={"Logo company"} width={430}/>
            <div style={{borderBottom: '1px solid #D7D4D4', width: '90%', paddingTop: '5px'}}/>
            <div>
                <div className={styles.ImageContainer}>
                    <Image src={userImage} alt={'Person Foto'} style={{borderRadius: '50%'}}/>
                </div>
                <div className={styles.UserNameContainer}>
                    Привет, {userName}!
                </div>
                <div className={styles.EmailContainer}>
                    {userMail}
                    <Image src={ExitLogo} alt={'Out Button'} style={{paddingLeft: '4px', cursor: 'pointer'}}/>
                    <a href="/auth" onClick={handleExitOut} className={styles.ButtonContainer}>
                        Выйти
                    </a>
                </div>
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
                        <div className={styles.date}>{meeting["date"]}</div>
                        <div className={styles.name}>{meeting["name"]}</div>
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
    );
}