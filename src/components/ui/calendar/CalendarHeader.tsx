'use client'

import styles from '@/styles/calendarheader.module.css'
import { useState, useEffect } from 'react'
import {userService} from "@/services/user.service";

interface Client {
    personId: number;
    fullName: string;
    years: number;
    clientType: string;
    mail: string;
    phone: string;
    meetDate: string;
    countMeet: number;
    clientStatus: string;
    meetingType: string;
}


// @ts-ignore
export default function CalendarHeader({ onOpenModal, onOpenModalMeet }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchClients = async (searchTerm: string) => {
        setIsLoading(true);
        try {
            const response = await userService.searchPerson(searchTerm);
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Ошибка при получении данных клиентов:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Логируем нажатую клавишу
        console.log('Клавиша:', e.key);

        // Проверяем, что нажата клавиша Enter
        if (e.key === 'Enter' && searchTerm.trim()) {
            e.preventDefault(); // Отменяем стандартное поведение, если оно мешает
            console.log("Нажал Enter");
            fetchClients(searchTerm);
        }
    };

    return (
        <div className={styles.MainContainer}>
            <input
                className={styles.Input}
                placeholder={'Найти клиента'}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            {isLoading && <p>Загрузка...</p>}
            <div className={styles.ClientList}>
                {clients.length > 0 ? (
                    <ul>
                        {clients.map((client) => (
                            <li key={client.personId}>
                                <p><strong>{client.fullName}</strong></p>
                                <p>Телефон: {client.phone}</p>
                                <p>Тип клиента: {client.clientType}</p>
                                <p>Дата встречи: {client.meetDate}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Клиенты не найдены</p>
                )}
            </div>
            <div className={styles.buttonsGroup}>
                <button onClick={onOpenModal} className={styles.addClient}>Добавить клиента</button>
                <button className={styles.newEvent} onClick={onOpenModalMeet}>Назначить встречу</button>
                <button className={styles.addDayOff}>Нерабочие дни</button>
            </div>
        </div>
    )
}
