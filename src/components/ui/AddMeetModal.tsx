import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '@/styles/AddMeetModal.module.css';
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { calendarService } from "@/services/calendar.service";
import { toast } from "react-toastify";
import { UserMeeting } from '@/types/calendar.types';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { customSelectStyles } from '@/constants/customStyles';

interface MeetForm {
    id: string;
    type: string;
    clientName?: string;
    meetingName?: string;
    dateMeet: string;
    time: string;
    duration: number;
    formatMeet: string;
    location?: string;
    note?: string;
    repeat?: boolean;
    repeatInterval?: string;
    repeatFrequency?: number;
    repeatEnd?: string;
    remind?: boolean;
    remindBefore?: number;
    remindUnit?: string;
    paymentType?: string;
}

interface Option {
    value: number;
    label: string;
}

// @ts-ignore
const AddMeetModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, watch, setValue } = useForm<MeetForm>({
        defaultValues: {
            type: 'client',
            formatMeet: 'offline',
            duration: 60,
        }
    });
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const [options, setOptions] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [repeatChecked, setRepeatChecked] = useState(false);
    const [remindChecked, setRemindChecked] = useState(false);

    const watchType = watch("type");
    const watchFormat = watch("formatMeet");

    const router = useRouter();

    const { mutate } = useMutation({
        mutationKey: ['createMeeting'],
        mutationFn: (data: UserMeeting) => calendarService.createMeeting(data),
        onSuccess: () => {
            toast.success('Встреча успешно назначена!');
            reset();
            onClose();
        },
        onError: () => {
            toast.error('Ошибка при назначении встречи');
        }
    });

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
        setValue('id', selected?.value);
        setValue('clientName', selected?.label);
    };

    const onSubmit: SubmitHandler<MeetForm> = (data) => {
        const { id, clientName, dateMeet, time, duration, formatMeet, location, paymentType, meetingName } = data;

        const [hours, minutes] = time.split(':').map(Number);

        const payload: UserMeeting = {
            person: {
                id: id || 0,
                fullName: clientName || '',
            },
            nameMeet: meetingName || 'Без названия',
            dateMeet,
            startMeet: {
                hour: hours,
                minute: minutes,
                second: 0,
                nano: 0
            },
            endMeet: {
                hour: hours + Math.floor(duration / 60),
                minute: minutes + (duration % 60),
            },
            formatMeet,
            paymentType: paymentType || '',
        };

        mutate(payload);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Назначить встречу"
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >
            <div>
                <div className="text-black font-ebgaramond font-bold text-[33px] mb-[34px]">Назначить встречу</div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-[20px] font-montserrat'>
                        <label className='flex gap-[5px] items-center'>
                            <input
                                type="radio"
                                value="client"
                                checked={watchType === 'client'}
                                {...register('type')}
                            />
                            <span>Встреча с клиентом</span>
                        </label>
                        <label className='flex gap-[5px] items-center'>
                            <input
                                type="radio"
                                value="other"
                                checked={watchType === 'other'}
                                {...register('type')}
                            />
                            <span>Иное</span>
                        </label>
                    </div>

                    {watchType === 'client' ? (
                        <div className='pb-[21px] pt-[25px]'>
                            <Select
                                value={selectedOption}
                                onChange={handleChange}
                                onInputChange={handleInputChange}
                                options={options}
                                isLoading={isLoading}
                                styles={customSelectStyles}
                                placeholder="Найти клиента"
                                className="w-full max-w-xs"
                                isSearchable
                            />
                        </div>
                    ) : (
                        <input
                            className={styles.input}
                            placeholder="Введите название"
                            {...register('meetingName')}
                        />
                    )}

                    <div className={`${styles.dateTime} flex mb-[15px] items-end`}>
                        <div className='flex flex-col'>
                            <label className='font-montserrat text-[13px]'>
                                Дата
                            </label>
                            <input
                                type="date"
                                className='min-w-[120px]'
                                {...register('dateMeet', { required: true })}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-montserrat text-[13px]'>
                                Время
                            </label>
                            <input
                                type="time"
                                className='min-w-[80px]'
                                {...register('time', { required: true })}
                            />
                        </div>

                        <div className='flex gap-[4px] items-center'>
                            <input
                                className='max-w-[50px]'
                                placeholder="минут"
                                {...register('duration')}
                            />
                            <span className='font-montserrat text-[14px]'>минут</span>
                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <label className='font-montserrat text-[13px]'>
                            Формат встречи
                        </label>
                        <select
                            className={`${styles.select} max-w-[200px]`}
                            {...register('formatMeet', { required: true })}
                        >
                            <option value="offline">Офлайн</option>
                            <option value="online">Онлайн</option>
                        </select>
                    </div>

                    {watchFormat === 'offline' ? (
                        <div className='flex flex-col'>
                            <label className='font-montserrat text-[13px]'>
                                Место встречи
                            </label>
                            <input
                                className={styles.input}
                                placeholder="Введите адрес"
                                {...register('location')}
                            />
                        </div>
                    ) : (
                        <div className='flex flex-col'>
                            <label className='font-montserrat text-[13px]'>
                                Место встречи
                            </label>
                            <input
                                className={styles.input}
                                placeholder="Введите ссылку"
                                {...register('location')}
                            />
                        </div>
                    )}

                    <div>
                        <label className='font-montserrat text-[13px]'>
                            Метод оплаты
                        </label>
                        <input
                            className={styles.input}
                            placeholder="Введите метод оплаты"
                            {...register('paymentType')}
                        />
                    </div>

                    {watchType === 'other' && (
                        <textarea
                            className={styles.textarea}
                            placeholder="Комментарий"
                            {...register('note')}
                        />
                    )}

                    <div className={styles.checkboxGroup}>
                        <label className='font-montserrat text-[13px]'>
                            <input
                                type="checkbox"
                                checked={repeatChecked}
                                onChange={() => setRepeatChecked(!repeatChecked)}
                            />
                            Повторять
                        </label>
                        {repeatChecked && (
                            <div className='bg-[#F3F3F3] p-[10px] rounded-[6px] mt-[10px]'>
                                <div className='flex items-center gap-2 mb-4 justify-between px-[20px]'>
                                    <label className="font-montserrat text-[13px]">Каждый</label>
                                    <div className='flex justify-end gap-[7px]'>
                                        <select className="p-2 border border-[#D9D9D9] rounded-[6px] text-sm" {...register('repeatInterval')}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <select className="p-2 border border-[#D9D9D9] rounded-[6px] text-sm" {...register('repeatFrequency')}>
                                            <option value="день">день</option>
                                            <option value="неделя">неделя</option>
                                            <option value="месяц">месяц</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="bg-[#F1F1F1] px-[20px] rounded-[#D9D9D9] w-full max-w-lg my-[10px] flex justify-end">
                                    {/* Ряд с выбором дней недели */}
                                    <div className="flex">
                                        {["Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб.", "Вс."].map((day, index) => (
                                            <button
                                                key={index}
                                                className={`p-2 border border-[#D9D9D9] text-sm ${
                                                    day === "Чт." ? "bg-[#EA660C] text-white" : "bg-white text-gray-700"
                                                } ${
                                                    index === 0 ? "rounded-l-[6px]" : index === 6 ? "rounded-r-[6px]" : ""
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* <input
                                    type="date"
                                    {...register('repeatEnd')}
                                /> */}
                                {/** Поменяй тут регистр формы, неправильно заданы регистры, надо для двух полей, а не для одного */}
                                <div className="flex items-center gap-2 justify-between px-[20px]">
                                    <label className="font-montserrat text-[13px]">Закончить</label>
                                    <div className='flex gap-[10px]'>
                                        <select className="p-2 border border-[#D9D9D9] rounded-[6px] text-sm">
                                            <option value="в день">в день</option>
                                            <option value="через">через</option>
                                            <option value="никогда">никогда</option>
                                        </select>
                                        <input
                                            type="date"
                                            className="p-2 border border-[#D9D9D9] rounded-[6px] text-sm"
                                            defaultValue="2025-05-02"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label className='font-montserrat text-[13px]'>
                            <input
                                type="checkbox"
                                checked={remindChecked}
                                onChange={() => setRemindChecked(!remindChecked)}
                            />
                            Напомнить
                        </label>
                        {remindChecked && (
                            // <div className={styles.remindOptions}>
                            //     <select {...register('remindUnit')}>
                            //         <option value="minutes">минуты</option>
                            //         <option value="hours">часы</option>
                            //         <option value="days">дни</option>
                            //     </select>
                            //     <input
                            //         type="number"
                            //         min="1"
                            //         defaultValue={1}
                            //         {...register('remindBefore')}
                            //     />
                            // </div>
                            //
                            //   Здесь тоже регистр неправильный, на макете 2 селекта, отредачь
                            //
                            <div className='bg-[#F3F3F3] rounded-[6px] mt-[10px] flex justify-between py-[10px] px-[30px]'>
                                <label className="font-montserrat text-[13px]">За</label>
                                <div className='flex gap-[10px]'>
                                    <select className="p-2 border border-[#D9D9D9] rounded-[6px] text-sm" {...register('repeatInterval')}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                    <select className="p-2 border border-[#D9D9D9] rounded-[6px] text-sm" {...register('remindBefore')}>
                                        <option value="день">дня</option>
                                        <option value="неделя">недели</option>
                                        <option value="месяц">месяца</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex mt-[20px] justify-end gap-[10px] border-t border-[#CACACA] pt-[10px] font-montserrat font-semibold'>
                        <button className='px-[20px] py-[10px] text-[16px] text-[#525252] text' type="button" onClick={onClose}>Отмена</button>
                        <button className='px-[20px] py-[10px] text-[16px] text-white bg-[#EA660C] rounded-[6px]' type="submit">Готово</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddMeetModal;
