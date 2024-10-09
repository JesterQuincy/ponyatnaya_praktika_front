'use client';

import styles from '@/styles/calendarbody.module.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {calendarService} from "@/services/calendar.service";
import moment from 'moment';
import 'moment/locale/ru';
import {useEffect, useState} from "react";

moment.locale('ru');

export default function CalendarBody() {
    const [data, setData] = useState<any>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [viewType, setViewType] = useState('');

    const generateEvents = (serverData: { clientsData: any[]; }) => {
        const eventsArray = serverData.clientsData.flatMap(client =>
            client.meetings.map((meeting: { startTime: moment.MomentInput; endTime: any; formatMeet: any; }) => ({
                title: `${client.fullName} - ${moment(meeting.startTime).format('HH:mm')}`,
                start: meeting.startTime,
                end: meeting.endTime,
                allDay: false,
                extendedProps: {
                    formatMeet: meeting.formatMeet,
                }
            }))
        );
        return eventsArray;
    };

    const fetchData = async () => {
        try {
            // Заменяем реальный вызов API моковыми данными
            const serverData = { clientsData: [] };
            setData(serverData);

            const generatedEvents = generateEvents(serverData);
            setEvents([...generatedEvents, ...mockEvents]); // Добавляем моковое событие
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const mockEvents = [
        // Сегодня
        {
            title: 'Тестовое событие - Сегодня (утро) Тестовое событие - Сегодня (утро)',
            start: moment().startOf('day').add(10, 'hours').toISOString(), // Сегодня в 10:00
            end: moment().startOf('day').add(11, 'hours').toISOString(), // Заканчивается в 11:00
            allDay: false,
            extendedProps: { formatMeet: 'online' }
        },
        {
            title: 'Тестовое событие - Сегодня (день)',
            start: moment().startOf('day').add(14, 'hours').toISOString(), // Сегодня в 14:00
            end: moment().startOf('day').add(15, 'hours').toISOString(), // Заканчивается в 15:00
            allDay: false,
            extendedProps: { formatMeet: 'other' }
        },
        // Завтра
        {
            title: 'Тестовое событие - Завтра (утро)',
            start: moment().add(1, 'days').startOf('day').add(9, 'hours').toISOString(), // Завтра в 09:00
            end: moment().add(1, 'days').startOf('day').add(10, 'hours').toISOString(), // Заканчивается в 10:00
            allDay: false,
            extendedProps: { formatMeet: 'online' }
        },
        {
            title: 'Тестовое событие - Завтра (день)',
            start: moment().add(1, 'days').startOf('day').add(16, 'hours').toISOString(), // Завтра в 16:00
            end: moment().add(1, 'days').startOf('day').add(17, 'hours').toISOString(), // Заканчивается в 17:00
            allDay: false,
            extendedProps: { formatMeet: 'offline' }
        },
        // Послезавтра
        {
            title: 'Тестовое событие - Послезавтра (утро)',
            start: moment().add(2, 'days').startOf('day').add(8, 'hours').toISOString(), // Послезавтра в 08:00
            end: moment().add(2, 'days').startOf('day').add(8, 'hours').add(30, 'minutes').toISOString(), // Заканчивается в 08:30
            allDay: false,
            extendedProps: { formatMeet: 'offline' }
        },
        {
            title: 'Тестовое событие - Послезавтра (день)',
            start: moment().add(2, 'days').startOf('day').add(15, 'hours').toISOString(), // Послезавтра в 15:00
            end: moment().add(2, 'days').startOf('day').add(16, 'hours').toISOString(), // Заканчивается в 16:00
            allDay: false,
            extendedProps: { formatMeet: 'other' }
        }
    ];

    return (
        <div className={styles.MainContainer}>
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'title',
                        center: 'timeGridDay,timeGridWeek,dayGridMonth,dayGridYear',
                        right: 'prev,today,next'
                    }}
                    initialDate={new Date()}
                    height={954}
                    slotMinTime="08:00:00"
                    slotMaxTime="18:00:00"
                    slotDuration='00:30:00'
                    locale="ru"
                    titleFormat={{year: 'numeric', month: 'long'}}
                    buttonText={{
                        today: 'Сегодня',
                        day: 'День',
                        month: 'Месяц',
                        week: 'Неделя',
                        year: 'Год'
                    }}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                    nowIndicator={true}
                    scrollTime={moment().format('HH:mm:ss')}
                    dayHeaderContent={(dateInfo) => {
                        const isToday = moment(dateInfo.date).isSame(moment(), 'day');
                        const dayName = moment(dateInfo.date).format('dd').charAt(0).toUpperCase() + moment(dateInfo.date).format('dd').slice(1);
                        if (viewType === 'timeGridWeek') {
                            return (
                                <div className="flex items-center gap-[5px]">
                                    <span className="font-semibold">
                                        {dayName},
                                    </span>
                                    {isToday ? (
                                        <span className="flex items-center justify-center w-6 h-6 text-white bg-[#EA660C] rounded-full">
                                            {moment(dateInfo.date).format('D')}
                                        </span>
                                    ) : (
                                        <span className="font-semibold">
                                            {moment(dateInfo.date).format('D')}
                                        </span>
                                    )}
                                </div>
                            );
                        }

                        return <></>
                    }}
                    viewDidMount={(info) => setViewType(info.view.type)}
                    events={events}
                    eventContent={(eventInfo) => {
                        const { formatMeet } = eventInfo.event.extendedProps;
                        let bgColor = 'bg-[#52525233]';
                        let badgeColor = 'bg-[#6E6E6E]';
                        let badgeText = 'Другое';

                        if (formatMeet === 'online') {
                            bgColor = 'bg-[#86DAFF4D]';
                            badgeColor = 'bg-[#049ADB]';
                            badgeText = 'Онлайн';
                        } else if (formatMeet === 'offline') {
                            bgColor = 'bg-[#EA660C33]';
                            badgeColor = 'bg-[#EA660C]';
                            badgeText = 'Офлайн';
                        }
                        if (viewType === 'timeGridWeek' || viewType === 'timeGridDay') {
                            

                            return (
                                <div className={`w-full h-full p-2 flex flex-col gap-[10px] ${bgColor}`}>
                                    <div className="flex justifty-start items-center gap-[5px] w-full">
                                        <span className="text-xs text-gray-600 text-black">
                                            {moment(eventInfo.event.start).format('HH:mm')}
                                        </span>
                                        <span className={`px-2 text-xs font-medium rounded ${badgeColor} text-white`}>
                                            {badgeText}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-black truncate">
                                        {eventInfo.event.title}
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <div className={`${bgColor} text-[#272727] px-2 py-1 w-full h-full max-w-full truncate flex justify-between items-center`}>
                                <span className="text-sm font-normal truncate">{eventInfo.event.title}</span>
                                <span className="text-xs text-[#6A6A6A] ml-2">
                                    {moment(eventInfo.event.start).format('HH:mm')}
                                </span>
                            </div>
                        )
                    }}
                    eventClassNames='w-full h-full'
                />
            </div>
        </div>
    );
}
