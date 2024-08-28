import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '@/styles/AddClientModal.module.css';
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { calendarService } from "@/services/calendar.service";
import { toast } from "react-toastify";
import {UserMeeting} from "@/types/calendar.types";

// Определение типов формы
interface ClientForm {
    clientType: string;
    fullName?: string;
    birthDate?: string;
    gender?: string;
    communicationFormat?: string;
    phone?: string;
    email?: string;
    parentFullName?: string;
    parentPhone?: string;
    client2FullName?: string;
    client2BirthDate?: string;
    client2Gender?: string;
    client2CommunicationFormat?: string;
    client2Phone?: string;
    client2Email?: string;
}

// @ts-ignore
const AddClientModal = ({ isOpen, onClose }) => {
    const [clientType, setClientType] = useState('adult');
    const { register, handleSubmit, reset } = useForm<ClientForm>();

    // Устанавливаем рут для модалки в useEffect
    useEffect(() => {
        Modal.setAppElement(document.body);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            Modal.setAppElement('#__next');
        }, 0);
    }, []);

    const handleCloseModal = () => {
        reset();  // Сбрасываем значения формы
        onClose();  // Закрываем модальное окно
    };

    const { mutate } = useMutation({
        mutationKey: ['createMeeting'],
        mutationFn: (data: UserMeeting) => calendarService.createUser(data),
        onSuccess: () => {
            toast.success('Клиент успешно добавлен!');
            reset();
            onClose();
        },
        onError: () => {
            toast.error('Ошибка при добавлении клиента');
        }
    });

    const onSubmit: SubmitHandler<ClientForm> = (data) => {
        // @ts-ignore
        mutate({ ...data, clientType });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Добавить клиента"
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >
            <div>
                <h2>Добавить клиента</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.clientType}>
                        <label>
                            <input
                                type="radio"
                                value="adult"
                                checked={clientType === 'adult'}
                                onChange={(e) => setClientType(e.target.value)}
                            />
                            Взрослый
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="child"
                                checked={clientType === 'child'}
                                onChange={(e) => setClientType(e.target.value)}
                            />
                            Ребёнок
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="couple"
                                checked={clientType === 'couple'}
                                onChange={(e) => setClientType(e.target.value)}
                            />
                            Пара
                        </label>
                    </div>

                    {/* Форма для взрослого */}
                    {clientType === 'adult' && (
                        <div className={styles.formGroup}>
                            <label>ФИО</label>
                            <input type="text" placeholder="Введите ФИО клиента" required {...register('fullName')} />

                            <label>Дата рождения</label>
                            <input type="date" required {...register('birthDate')} />

                            <label>Пол</label>
                            <select required {...register('gender')}>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>

                            <label>Формат коммуникации</label>
                            <select required {...register('communicationFormat')}>
                                <option value="offline">Офлайн</option>
                                <option value="online">Онлайн</option>
                            </select>

                            <label>Телефон</label>
                            <input type="tel" placeholder="Введите номер телефона" required {...register('phone')} />

                            <label>Электронная почта</label>
                            <input type="email" placeholder="Введите адрес электронной почты" required {...register('email')} />
                        </div>
                    )}

                    {/* Форма для ребенка */}
                    {clientType === 'child' && (
                        <div className={styles.formGroup}>
                            <label>ФИО ребёнка</label>
                            <input type="text" placeholder="Введите ФИО ребёнка" required {...register('fullName')} />

                            <label>Дата рождения</label>
                            <input type="date" required {...register('birthDate')} />

                            <label>Пол</label>
                            <select required {...register('gender')}>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>

                            <label>Формат коммуникации</label>
                            <select required {...register('communicationFormat')}>
                                <option value="offline">Офлайн</option>
                                <option value="online">Онлайн</option>
                            </select>

                            <label>Телефон ребёнка</label>
                            <input type="tel" placeholder="Введите номер телефона" required {...register('phone')} />

                            <label>Электронная почта ребёнка</label>
                            <input type="email" placeholder="Введите адрес электронной почты" required {...register('email')} />

                            <label>ФИО родителя</label>
                            <input type="text" placeholder="Введите ФИО родителя" required {...register('parentFullName')} />

                            <label>Телефон родителя</label>
                            <input type="tel" placeholder="Введите номер телефона родителя" required {...register('parentPhone')} />
                        </div>
                    )}

                    {/* Форма для пары */}
                    {clientType === 'couple' && (
                        <>
                            <div className={styles.formGroup}>
                                <label>ФИО клиента №1</label>
                                <input type="text" placeholder="Введите ФИО клиента №1" required {...register('fullName')} />

                                <label>Дата рождения</label>
                                <input type="date" required {...register('birthDate')} />

                                <label>Пол</label>
                                <select required {...register('gender')}>
                                    <option value="male">Мужской</option>
                                    <option value="female">Женский</option>
                                </select>

                                <label>Формат коммуникации</label>
                                <select required {...register('communicationFormat')}>
                                    <option value="offline">Офлайн</option>
                                    <option value="online">Онлайн</option>
                                </select>

                                <label>Телефон клиента №1</label>
                                <input type="tel" placeholder="Введите номер телефона" required {...register('phone')} />

                                <label>Электронная почта клиента №1</label>
                                <input type="email" placeholder="Введите адрес электронной почты" required {...register('email')} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>ФИО клиента №2</label>
                                <input type="text" placeholder="Введите ФИО клиента №2" required {...register('client2FullName')} />

                                <label>Дата рождения</label>
                                <input type="date" required {...register('client2BirthDate')} />

                                <label>Пол</label>
                                <select required {...register('client2Gender')}>
                                    <option value="male">Мужской</option>
                                    <option value="female">Женский</option>
                                </select>

                                <label>Формат коммуникации</label>
                                <select required {...register('client2CommunicationFormat')}>
                                    <option value="offline">Офлайн</option>
                                    <option value="online">Онлайн</option>
                                </select>

                                <label>Телефон клиента №2</label>
                                <input type="tel" placeholder="Введите номер телефона" required {...register('client2Phone')} />

                                <label>Электронная почта клиента №2</label>
                                <input type="email" placeholder="Введите адрес электронной почты" required {...register('client2Email')} />
                            </div>
                        </>
                    )}

                    <div className={styles.formActions}>
                        <button type="button" onClick={handleCloseModal}>Отмена</button>
                        <button type="submit">Готово</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddClientModal;
