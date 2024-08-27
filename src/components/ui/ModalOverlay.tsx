import React, { useState } from 'react';
import Modal from 'react-pure-modal';
import styles from '@/styles/AddClientModal.module.css';
import PureModal from "react-pure-modal/src/react-pure-modal";
import {calendarService} from "@/services/calendar.service";

// @ts-ignore
const AddClientModal = ({ isOpen, onClose }) => {
    const [clientType, setClientType] = useState('adult');

    // @ts-ignore
    const handleTypeChange = (e) => {
        setClientType(e.target.value);
    };

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault();
        calendarService.createMeeting(data)
        console.log("Form submitted");
        onClose();
    };

    return (
        <PureModal
            isOpen={isOpen}
            onClose={onClose}
            closeButton={<span>×</span>}
            closeButtonPosition="header"
        >
            <div className={styles.modalContent}>
                <h2>Добавить клиента</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.clientType}>
                        <label>
                            <input
                                type="radio"
                                value="adult"
                                checked={clientType === 'adult'}
                                onChange={handleTypeChange}
                            />
                            Взрослый
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="child"
                                checked={clientType === 'child'}
                                onChange={handleTypeChange}
                            />
                            Ребёнок
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="couple"
                                checked={clientType === 'couple'}
                                onChange={handleTypeChange}
                            />
                            Пара
                        </label>
                    </div>

                    {/* Форма для взрослого */}
                    {clientType === 'adult' && (
                        <div className={styles.formGroup}>
                            <label>ФИО</label>
                            <input type="text" placeholder="Введите ФИО клиента" required />

                            <label>Дата рождения</label>
                            <input type="date" required />

                            <label>Пол</label>
                            <select required>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>

                            <label>Формат коммуникации</label>
                            <select required>
                                <option value="offline">Офлайн</option>
                                <option value="online">Онлайн</option>
                            </select>

                            <label>Телефон</label>
                            <input type="tel" placeholder="Введите номер телефона" required />

                            <label>Электронная почта</label>
                            <input type="email" placeholder="Введите адрес электронной почты" required />
                        </div>
                    )}

                    {/* Форма для ребенка */}
                    {clientType === 'child' && (
                        <div className={styles.formGroup}>
                            <label>ФИО ребёнка</label>
                            <input type="text" placeholder="Введите ФИО ребёнка" required />

                            <label>Дата рождения</label>
                            <input type="date" required />

                            <label>Пол</label>
                            <select required>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>

                            <label>Формат коммуникации</label>
                            <select required>
                                <option value="offline">Офлайн</option>
                                <option value="online">Онлайн</option>
                            </select>

                            <label>Телефон ребёнка</label>
                            <input type="tel" placeholder="Введите номер телефона" required />

                            <label>Электронная почта ребёнка</label>
                            <input type="email" placeholder="Введите адрес электронной почты" required />

                            <label>ФИО родителя</label>
                            <input type="text" placeholder="Введите ФИО родителя" required />

                            <label>Телефон родителя</label>
                            <input type="tel" placeholder="Введите номер телефона родителя" required />
                        </div>
                    )}

                    {/* Форма для пары */}
                    {clientType === 'couple' && (
                        <>
                            <div className={styles.formGroup}>
                                <label>ФИО клиента №1</label>
                                <input type="text" placeholder="Введите ФИО клиента №1" required />

                                <label>Дата рождения</label>
                                <input type="date" required />

                                <label>Пол</label>
                                <select required>
                                    <option value="male">Мужской</option>
                                    <option value="female">Женский</option>
                                </select>

                                <label>Формат коммуникации</label>
                                <select required>
                                    <option value="offline">Офлайн</option>
                                    <option value="online">Онлайн</option>
                                </select>

                                <label>Телефон клиента №1</label>
                                <input type="tel" placeholder="Введите номер телефона" required />

                                <label>Электронная почта клиента №1</label>
                                <input type="email" placeholder="Введите адрес электронной почты" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label>ФИО клиента №2</label>
                                <input type="text" placeholder="Введите ФИО клиента №2" required />

                                <label>Дата рождения</label>
                                <input type="date" required />

                                <label>Пол</label>
                                <select required>
                                    <option value="male">Мужской</option>
                                    <option value="female">Женский</option>
                                </select>

                                <label>Формат коммуникации</label>
                                <select required>
                                    <option value="offline">Офлайн</option>
                                    <option value="online">Онлайн</option>
                                </select>

                                <label>Телефон клиента №2</label>
                                <input type="tel" placeholder="Введите номер телефона" required />

                                <label>Электронная почта клиента №2</label>
                                <input type="email" placeholder="Введите адрес электронной почты" required />
                            </div>
                        </>
                    )}

                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose}>Отмена</button>
                        <button type="submit">Готово</button>
                    </div>
                </form>
            </div>
        </PureModal>
    );
};

export default AddClientModal;
