'use client';

import styles from '@/styles/calendarbody.module.css';  // Импортируем CSS-модуль
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

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
                titleFormat={{ year: 'numeric', month: 'short', day: 'numeric' }}
                buttonText={{
                    today: 'Сегодня',
                    month: 'Месяц',
                    week: 'Неделя',
                    day: 'День',
                }}
                dayHeaderClassNames={() => styles.calendarHeader}
                dayCellClassNames={() => styles.calendarDay}
                dayCellContent={({ date, view }) => (
                    <div className={styles.calendarDayNumber}>
                        {date.getDate()}
                    </div>
                )}
                eventClassNames={() => styles.calendarEvent}
                dayHeaderContent={({ text }) => (
                    <span className={styles.calendarTitle}>{text}</span>
                )}
            />
        </div>
    );
}