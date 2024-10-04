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
    const [data, setData] = useState([]);
    const [events, setEvents] = useState([]);

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
            const response = await calendarService.getCalendarData(2023);
            const serverData = response.data;
            setData(serverData);
            const generatedEvents = generateEvents(serverData);
            setEvents(generatedEvents);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                    dayHeaderContent={({date}) => {
                        const isToday = moment(date).isSame(moment(), 'day');
                        return (
                            <div className={`${styles.calendarTitle} ${isToday ? styles.currentDay : ''}`}>
                                {moment(date).format('ddd')}
                            </div>
                        );
                    }}
                    events={events}
                    eventClassNames={() => styles.calendarEvent}
                />
            </div>
        </div>
    );
}
