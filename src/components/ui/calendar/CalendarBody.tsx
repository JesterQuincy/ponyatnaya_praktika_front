'use client';

import styles from '@/styles/calendarbody.module.css';  // Импортируем CSS-модуль
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function CalendarBody() {


    const dataFromServer = {
        currentDate: "2024-08-25T02:51:37.197Z",
        clientsData: [
            {
                fullName: "John Doe",
                firstName: "John",
                secondName: "A.",
                lastName: "Doe",
                clientType: "Premium",
                meetings: [
                    {
                        startTime: "2024-08-25T09:00:00.000Z",
                        endTime: "2024-08-25T10:00:00.000Z",
                        formatMeet: "In-Person"
                    },
                    {
                        startTime: "2024-08-26T11:00:00.000Z",
                        endTime: "2024-08-26T12:00:00.000Z",
                        formatMeet: "Online"
                    }
                ]
            }
        ]
    };

    const events = dataFromServer.clientsData.flatMap(client =>
        client.meetings.map(meeting => ({
            title: `${client.lastName} - ${moment(meeting.startTime).format('HH:mm')}`,
            start: meeting.startTime,
            end: meeting.endTime,
            allDay: false
        }))
    );

    return (
        <div className={styles.MainContainer}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={events}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialDate={new Date()}
                height={954}
                locale="ru"  // Устанавливаем локаль на русский
                titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}  // Длинное название месяца
                buttonText={{
                    today: 'Сегодня',
                    month: 'Месяц',
                    week: 'Неделя',
                    day: 'День',
                }}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Используем 24-часовой формат без AM/PM
                }}
                nowIndicator={true}
                scrollTime={moment().format('HH:mm:ss')}
                dayHeaderContent={({ date }) => {
                    const isToday = moment(date).isSame(moment(), 'day');
                    return (
                        <div className={styles.calendarTitle}>
                            {moment(date).format('ddd')},{' '}
                            <span className={isToday ? 'current-day' : ''}>
                                {moment(date).format('D')}
                            </span>
                        </div>
                    );
                }}
                eventClassNames={() => styles.calendarEvent}
            />
        </div>
    );
}