'use client'

import React, {PropsWithChildren, useEffect, useState} from "react";
import Image from "next/image";
import Logo from "@/public/LogoSVG.svg";
import PersonFoto from "@/public/Ellipse 1.png";
import ExitLogo from "@/public/Out.png";
import Client from "@/public/img/clientDocsLogo.svg";
import CalendarLogo from "@/public/img/calendarLogo.svg";
import InboxLogo from "@/public/img/inbox.svg";
import AnaliticLogo from "@/public/img/analiticsLogo.svg"
import LetterLogo from "@/public/img/letterLogo.svg"
import CheckListLogo from "@/public/img/checkListLogo.svg";
import CalendarIcon from "@/public/icon/calendar.png";
import {calendarService} from "@/services/calendar.service";
import {authService} from "@/services/auth.service";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


export default function SideBar({children}: PropsWithChildren) {
    const [currentPath, setCurrentPath] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [meetings, setMeetings] = useState([]);
    const [userData, setUserData] = useState(null);


    const router = useRouter();
    const handleEventClick = (meeting: any) => {
        console.log(meeting)
        router.push(`/card/${meeting.id}?clientType=${meeting.clientType}`);
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await calendarService.getNotifications();
                const serverData = response.data.notificationResponseList;
                const transformedMeetings = serverData.map((item: any) => ({
                    date: new Date(item.dateFirstRequest).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }),
                    name: item.customerFullName,
                    id: item.customerId,
                    clientType: item.clientType
                }));
                setMeetings(transformedMeetings);
            } catch (error) {
                console.error('Ошибка при загрузке уведомлений:', error);
            }
        };
        const fetchUserInfo = async () => {
            try {
                const response: any = await calendarService.getUserInfo();
                setUserData(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
            }
        };

        fetchNotifications();
        fetchUserInfo();
    }, []);

    const returnToCalendar = () => {
        router.push('/calendar');
    };


    // @ts-ignore
    const userName = userData?.userName || 'не удалось загрузить';
    // @ts-ignore
    const userMail = userData?.userMail || 'не удалось загрузить';
    // @ts-ignore
    const userImage = userData?.userPicture || PersonFoto;

    const displayedMeetings = showAll ? meetings : meetings.slice(0, 6);


    const handleExitOut = () => {
        authService.logout().then();
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="flex flex-col w-[35vw] rounded-xl mt-3 ml-3 items-center bg-white shadow-lg p-4">
            <Image src={Logo} alt="Logo company" width={400} onClick={returnToCalendar} className="hover:cursor-pointer"/>
            <hr className="my-4 h-0.5 w-full border-gray"/>
            <div className="flex flex-col items-center">
                <div className="rounded-full overflow-hidden">
                    <Image src={userImage} alt="Person Foto" width={100} height={100}/>
                </div>
                <div className="text-xl font-semibold mb-1">Привет, {userName}!</div>
                <div className="text-sm text-gray-600 flex items-center">
                    {userMail}
                    <Image src={ExitLogo} alt="Выйти" className="ml-2 cursor-pointer" onClick={handleExitOut}/>
                </div>
            </div>
            <nav className="mt-[50px] flex flex-col space-y-2 w-full">
                <a href="/clients">
                    <Button variant='link'
                            className={`p-2 flex w-full border-[1px] justify-start ${currentPath === '/нф' ? 'bg-orange-200' : 'hover:bg-gray-200'} transition-colors`}>
                        <Image src={Client} alt="Client" className="mr-2"/> Клиенты
                    </Button>
                </a>
                <a href="/calendar">
                    <Button variant='link'
                            className={`p-2 flex w-full border-[1px] justify-start ${currentPath === '/calendar' ? 'bg-hoverButton text-orange ' : 'hover:bg-hoverButton'} transition-colors`}>
                        <Image src={CalendarIcon} alt="Calendar" className="mr-2"/> Календарь
                    </Button>
                </a>
                <a href="/notification">
                    <Button variant='link'
                            className={`p-2 flex w-full border-[1px] justify-start ${currentPath === '/notification' ? 'bg-orange-200' : 'hover:bg-gray-200'} transition-colors`}><Image
                        src={InboxLogo} alt="Client" className="mr-2"/>Уведомления</Button>
                </a>
                <a href="/analytic">
                    <Button variant='link'
                            className={`p-2 flex w-full border-[1px] justify-start ${currentPath === '/analytic' ? 'bg-orange-200' : 'hover:bg-gray-200'} transition-colors`}><Image
                        src={AnaliticLogo} alt="Client" className="mr-2"/> Клиенты</Button>
                </a>
                <a href="/tests">
                    <Button variant='link'
                            className={`p-2 flex  w-full border-[1px] justify-start ${currentPath === '/tests' ? 'bg-orange-200' : 'hover:bg-gray-200'} transition-colors`}><Image
                        src={CheckListLogo} alt="Client" className="mr-2"/>Опросы
                        и тесты</Button>
                </a>
            </nav>
            <div className="mt-6 w-full bg-gray-100">
                <div className="text-sm mb-4">
                    У вас <span className="text-orange-500 font-semibold">{meetings.length}</span> новых заявок:
                </div>
                <div className="relative">
                    {displayedMeetings.map((meeting, index) => (
                        <div
                            key={index}
                            //@ts-ignore
                            onClick={() => handleEventClick(meeting)}
                            style={{zIndex: index}}
                            className={`flex relative gap-[6px] shadow-[0px_-5px_11px_0px_#0000002E] items-center rounded-t-[8px] flex-row py-[8px] pl-[8px] hover:cursor-pointer`}
                        >
                            <div
                                className="text-[9px] rounded-[8px] text-white bg-[#6E6E6E] px-[3px]">
                                    
                                    {
                                        //@ts-ignore
                                        meeting.date
                                    }
                            </div>
                            <Image src={LetterLogo} alt="Calendar"/>
                            <div className="text-[12px] font-montserrat text-black font-normal">
                                {
                                    //@ts-ignore
                                    meeting.name
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {meetings.length > 6 && (
                    <button onClick={() => setShowAll(!showAll)} className="text-orange-500 mt-4 underline">
                        {showAll ? 'Скрыть' : 'Все'}
                    </button>
                )}
            </div>
        </div>
    );
}
