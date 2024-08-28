import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '@/styles/AddMeetModal.module.css';
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { calendarService } from "@/services/calendar.service";
import { toast } from "react-toastify";
import { UserMeeting } from '@/types/calendar.types';

// Определение типов формы
interface MeetForm {
    type: string;
    clientName?: string;
    meetingName?: string;
    date: string;
    time: string;
    duration: number;
    format: string;
    location?: string;
    note?: string;
    repeat?: boolean;
    repeatInterval?: string;
    repeatFrequency?: number;
    repeatEnd?: string;
    remind?: boolean;
    remindBefore?: number;
    remindUnit?: string;
}

// @ts-ignore
const AddMeetModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset, watch } = useForm<MeetForm>({
        defaultValues: {
            type: 'client',
            format: 'offline',
            duration: 60,
        }
    });

    const [repeatChecked, setRepeatChecked] = useState(false);
    const [remindChecked, setRemindChecked] = useState(false);

    const watchType = watch("type");
    const watchFormat = watch("format");

    // @ts-ignore
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

    const onSubmit: SubmitHandler<MeetForm> = (data) => {
        // @ts-ignore
        mutate(data);
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
                <h2>Назначить встречу</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.typeSelector}>
                        <label>
                            <input
                                type="radio"
                                value="client"
                                checked={watchType === 'client'}
                                {...register('type')}
                            />
                            Встреча с клиентом
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="other"
                                checked={watchType === 'other'}
                                {...register('type')}
                            />
                            Иное
                        </label>
                    </div>

                    {watchType === 'client' ? (
                        <input
                            className={styles.input}
                            placeholder="Найти клиента"
                            {...register('clientName')}
                        />
                    ) : (
                        <input
                            className={styles.input}
                            placeholder="Введите название"
                            {...register('meetingName')}
                        />
                    )}

                    <div className={styles.dateTime}>
                        <input
                            type="date"
                            {...register('date', { required: true })}
                        />
                        <input
                            type="time"
                            {...register('time', { required: true })}
                        />
                        <input
                            type="number"
                            placeholder="минут"
                            {...register('duration')}
                        />
                    </div>

                    <select
                        className={styles.select}
                        {...register('format', { required: true })}
                    >
                        <option value="offline">Офлайн</option>
                        <option value="online">Онлайн</option>
                    </select>

                    {watchFormat === 'offline' ? (
                        <input
                            className={styles.input}
                            placeholder="Введите адрес"
                            {...register('location')}
                        />
                    ) : (
                        <input
                            className={styles.input}
                            placeholder="Введите ссылку"
                            {...register('location')}
                        />
                    )}

                    {watchType === 'other' && (
                        <textarea
                            className={styles.textarea}
                            placeholder="Комментарий"
                            {...register('note')}
                        />
                    )}

                    <div className={styles.checkboxGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={repeatChecked}
                                onChange={() => setRepeatChecked(!repeatChecked)}
                            />
                            Повторять
                        </label>
                        {repeatChecked && (
                            <div className={styles.repeatOptions}>
                                <div className={styles.repeatFrequency}>
                                    <select {...register('repeatFrequency')}>
                                        <option value="day">день</option>
                                        <option value="week">неделя</option>
                                        <option value="month">месяц</option>
                                    </select>
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue={1}
                                        {...register('repeatInterval')}
                                    />
                                </div>
                                <input
                                    type="date"
                                    {...register('repeatEnd')}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={remindChecked}
                                onChange={() => setRemindChecked(!remindChecked)}
                            />
                            Напомнить
                        </label>
                        {remindChecked && (
                            <div className={styles.remindOptions}>
                                <select {...register('remindUnit')}>
                                    <option value="minutes">минуты</option>
                                    <option value="hours">часы</option>
                                    <option value="days">дни</option>
                                </select>
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue={1}
                                    {...register('remindBefore')}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose}>Отмена</button>
                        <button type="submit">Готово</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddMeetModal;
