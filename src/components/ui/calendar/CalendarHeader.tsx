'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { calendarService } from '@/services/calendar.service';
import styles from '@/styles/calendarheader.module.css';

interface Option {
    value: number;
    label: string;
}

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderRadius: '20px',
        backgroundColor: '#f3f4f6',
        borderColor: '#d1d5db',
        paddingLeft: '8px',
        paddingRight: '8px',
        height: '30px',
        boxShadow: state.isFocused ? '0 0 0 2px #2563eb' : '',
        '&:hover': {
            borderColor: '#9ca3af',
        },
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#6b7280',
    }),
    input: (provided: any) => ({
        ...provided,
        color: '#111827',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: '#111827',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: '#6b7280',
        '&:hover': {
            color: '#4b5563',
        },
    }),
    menu: (provided: any) => ({
        ...provided,
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        marginTop: '4px',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#e5e7eb' : '#fff',
        color: state.isSelected ? '#fff' : '#111827',
        '&:active': {
            backgroundColor: '#2563eb',
            color: '#fff',
        },
    }),
};

// @ts-ignore
export default function Header({ onOpenModal, onOpenModalMeet }) {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchClients = async (inputValue: string) => {
        setIsLoading(true);
        try {
            const response = await calendarService.getUsersByName(inputValue);
            const data = response.data;
            const formattedOptions = data.map((client: { personId: number; fullName: string }) => ({
                value: client.personId,
                label: client.fullName,
            }));
            setOptions(formattedOptions);
        } catch (error) {
            console.error('Ошибка при поиске клиентов:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (inputValue: string) => {
        if (inputValue.trim()) {
            fetchClients(inputValue);
        }
    };

    const handleChange = (selected: Option | null) => {
        setSelectedOption(selected);
        if (selected) {
            router.push(`/client/${selected.value}`);
        }
    };

    return (
        <div className={styles.MainContainer}>
            <Select
                value={selectedOption}
                onChange={handleChange}
                onInputChange={handleInputChange}
                options={options}
                isLoading={isLoading}
                styles={customStyles}
                placeholder="Найти клиента"
                className="w-full max-w-xs"
                isSearchable
            />
            <div className={styles.buttonsGroup}>
                <button onClick={onOpenModal} className={styles.addClient}>Добавить клиента</button>
                <button className={styles.newEvent} onClick={onOpenModalMeet}>Назначить встречу</button>
                <button className={styles.addDayOff}>Нерабочие дни</button>
            </div>
        </div>
    );
}
