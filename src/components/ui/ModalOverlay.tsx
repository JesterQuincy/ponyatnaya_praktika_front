import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import styles from '@/styles/AddClientModal.module.css';
import {useForm, SubmitHandler} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {calendarService} from "@/services/calendar.service";
import {toast} from "react-toastify";
import {UserMeeting} from "@/types/calendar.types";
import {Input} from "@/components/ui/input";
import Select from "react-select";
import {DropdownIndicator} from "@/components/ui/clients/Clients";


interface ClientForm {
    clientType: string;
    fullName?: string;
    birth?: string;
    gender?: string;
    meetingFormat?: string;
    phoneNumber?: string;
    mail?: string;
    parentFullName?: string;
    parentPhone?: string;
    parentBirthDate?: string;
    communicationFormat: string;
    parentGender?: string;
    parentCommunicationFormat?: string;
    parentEmail?: string;
    client2FullName?: string;
    client2BirthDate?: string;
    client2Gender?: string;
    client2CommunicationFormat?: string;
    client2Phone?: string;
    client2Email?: string;
    firstParent?: any;
}

// @ts-ignore
const AddClientModal = ({isOpen, onClose}) => {
    const [clientType, setClientType] = useState('adult');
    const {register, handleSubmit, reset, setValue} = useForm<ClientForm>();

    useEffect(() => {
        Modal.setAppElement(document.body);
    }, []);


    const handleCloseModal = () => {
        reset();
        onClose();
    };

    const {mutate} = useMutation({
        mutationKey: ['addUser'],
        mutationFn: (data: UserMeeting) => {
            if (clientType === 'adult') {
                return calendarService.createAdultUser(data);
            } else if (clientType === 'child') {
                return calendarService.createChildUser(data);
            } else if (clientType === 'couple') {
                return calendarService.createCoupleUser(data);
            }
            throw new Error('Неизвестный тип клиента');
        },
        onSuccess: () => {
            toast.success('Клиент успешно добавлен!');
            reset();
            onClose();
        },
        onError: () => {
            toast.error('Ошибка при добавлении клиента');
        }
    });

    const formatDate = (dateString: string | number | Date) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        // @ts-ignore
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const onSubmit: SubmitHandler<ClientForm> = (data) => {
        if (clientType === 'child') {
            // @ts-ignore
            mutate({
                fullName: data.fullName,
                birth: data.birth,
                phoneNumber: data.phoneNumber,
                mail: data.mail,
                gender: data.gender,
                meetingFormat: data.meetingFormat,
                // @ts-ignore
                firstParent: {
                    fullName: data.parentFullName,
                    gender: data.parentGender,
                    birth: data.parentBirthDate,
                    phoneNumber: data.parentPhone,
                    meetingFormat: data.parentCommunicationFormat,
                    mail: data.parentEmail,
                }
        })}
        if (clientType === 'couple') {
            mutate({
                fullName: data.fullName,
                birth: data.birth,
                phoneNumber: data.phoneNumber,
                mail: data.mail,
                gender: data.gender,
                meetingFormat: data.communicationFormat,
                // @ts-ignore
                secondCustomer: {
                    fullName: data.client2FullName,
                    gender: data.client2Gender,
                    birth: data.client2BirthDate,
                    phoneNumber: data.client2Phone,
                    meetingFormat: data.client2CommunicationFormat,
                    mail: data.client2Email,
                }
            })
            }
        if (clientType === 'adult') {
            mutate({...data});
        }
    };

    const genderOptions = [
        {value: 'Мужской', label: 'Мужской'},
        {value: 'Женский', label: 'Женский'}
    ];

    const communicationFormatOptions = [
        {value: 'Офлайн', label: 'Офлайн'},
        {value: 'Онлайн', label: 'Онлайн'}
    ];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Добавить клиента"
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >
            <div className="p-[26px]">
                <div className="text-black font-ebgaramond font-bold text-[33px]">Добавить клиента</div>
                <div className="h-[550px] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="flex my-[32px] space-x-[25px]">
                        <div>
                            <input
                                type="radio"
                                className="mr-[5px]"
                                value="adult"
                                checked={clientType === 'adult'}
                                onChange={(e) => setClientType(e.target.value)}
                            />
                            Взрослый
                        </div>
                        <div>
                            <input
                                type="radio"
                                className="mr-[5px]"
                                value="child"
                                checked={clientType === 'child'}
                                onChange={(e) => setClientType(e.target.value)}
                            />
                            Ребёнок
                        </div>
                        <div>
                            <input
                                type="radio"
                                className="mr-[5px]"
                                value="couple"
                                checked={clientType === 'couple'}
                                onChange={(e) => setClientType(e.target.value)}
                            />
                            Пара
                        </div>
                    </div>

                    {clientType === 'adult' && (
                        <div className="space-y-[13px]">
                            <div className="space-y-[5px]">
                                <label
                                    className="font-montserrat text-xs font-medium">ФИО</label>
                                <Input className="h-[31px] rounded-xl" type="text"
                                       placeholder='Введите ФИО клиента'
                                       required {...register('fullName')} />
                            </div>
                            <div className="flex flex-row w-full space-x-[10px]">
                                <div className="flex flex-col space-y-[5px]">
                                    <label className="font-montserrat text-xs font-medium">Дата рождения</label>
                                    <input
                                        className="flex h-[36px] w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm"
                                        type="date"
                                        required {...register('birth')} />
                                </div>
                                <div className="flex flex-col w-full space-y-[5px]">
                                    <label className="font-montserrat text-xs font-medium">Пол</label>
                                    <Select
                                        options={genderOptions}
                                        onChange={(option) => setValue('gender', option?.value)}
                                        placeholder="Выберите пол"
                                        className="rounded-[6]"
                                        components={{DropdownIndicator}}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                height: '36px',
                                                minHeight: '36px',
                                                padding: '0 0 5px 0',
                                                borderRadius: '12px'
                                            }),
                                            indicatorSeparator: () => ({display: "none"}),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-[5px]">
                                <label className="font-montserrat text-xs font-medium">Формат коммуникации</label>
                                <Select
                                    options={communicationFormatOptions}
                                    onChange={(option) => setValue('meetingFormat', option?.value)}
                                    className="w-full"
                                    placeholder="Выберите формат"
                                    components={{DropdownIndicator}}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            height: '36px',
                                            minHeight: '36px',
                                            padding: '0 0 5px 0',
                                            borderRadius: '12px'
                                        }),
                                        indicatorSeparator: () => ({display: "none"}),
                                    }}
                                />
                            </div>
                            <div>
                                <label className="font-montserrat text-xs font-medium">Телефон</label>
                                <Input type="tel" placeholder="Введите номер телефона"
                                       required {
                                           //@ts-ignore
                                           ...register('phoneNumber')} />
                            </div>
                            <div>
                                <label className="font-montserrat text-xs font-medium">Электронная почта</label>
                                <Input type="email" placeholder="Введите адрес электронной почты"
                                       required {...register('mail')} />
                            </div>
                        </div>
                    )}

                    {clientType === 'child' && (
                        <div className="space-y-[40px]">
                            <div className='space-y-[13px] '>
                                <div>
                                    <label className="font-montserrat text-xs font-medium">ФИО ребёнка</label>
                                    <Input type="text" placeholder="Введите ФИО ребёнка"
                                           required {...register('fullName')} />
                                </div>

                                <div className="flex flex-row w-full space-x-[10px]">
                                    <div className="flex flex-col space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Дата рождения</label>
                                        <input
                                            className="flex h-[36px] w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm"
                                            type="date" required {...register('birth')} />
                                    </div>
                                    <div className="flex flex-col w-full space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Пол</label>
                                        <Select
                                            options={genderOptions}
                                            onChange={(option) => setValue('gender', option?.value)}
                                            placeholder="Выберите пол"
                                            className="rounded-[6]"
                                            components={{DropdownIndicator}}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    height: '36px',
                                                    minHeight: '36px',
                                                    padding: '0 0 5px 0',
                                                    borderRadius: '12px'
                                                }),
                                                indicatorSeparator: () => ({display: "none"}),
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-[5px]">
                                    <label className="font-montserrat text-xs font-medium">Формат коммуникации</label>
                                    <Select
                                        options={communicationFormatOptions}
                                        onChange={(option) => setValue('meetingFormat', option?.value)}
                                        className="w-full"
                                        placeholder="Выберите формат"
                                        components={{DropdownIndicator}}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                height: '36px',
                                                minHeight: '36px',
                                                padding: '0 0 5px 0',
                                                borderRadius: '12px'
                                            }),
                                            indicatorSeparator: () => ({display: "none"}),
                                        }}
                                    />
                                </div>
                                <div className="space-y-[5px]">
                                    <label className="font-montserrat text-xs font-medium">Телефон ребёнка</label>
                                    <Input type="tel" placeholder="Введите номер телефона"
                                           required {
                                               //@ts-ignore
                                               ...register('phoneNumber')} />
                                </div>
                                <div className="space-y-[5px]">
                                    <label className="font-montserrat text-xs font-medium">Электронная почта ребёнка</label>
                                    <Input type="email" placeholder="Введите адрес электронной почты"
                                           required {
                                               //@ts-ignore
                                               ...register('mail')} />
                                </div>
                            </div>
                            <div>
                                <div className="space-y-[13px]">
                                    <div className="space-y-[5px]">
                                        <label
                                            className="font-montserrat text-xs font-medium">ФИО Родителя</label>
                                        <Input className="h-[31px] rounded-xl" type="text"
                                               placeholder={"Введите ФИО родителя"}
                                               required {...register('parentFullName')} />
                                    </div>
                                    <div className="flex flex-row w-full space-x-[10px]">
                                        <div className="flex flex-col space-y-[5px]">
                                            <label className="font-montserrat text-xs font-medium">Дата рождения</label>
                                            <input
                                                className="flex h-[36px] w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm"
                                                type="date"
                                                required {...register('parentBirthDate')} />
                                        </div>
                                        <div className="flex flex-col w-full space-y-[5px]">
                                            <label className="font-montserrat text-xs font-medium">Пол</label>
                                            <Select
                                                options={genderOptions}
                                                onChange={(option) => setValue('parentGender', option?.value)}
                                                placeholder="Выберите пол"
                                                className="rounded-[6]"
                                                components={{DropdownIndicator}}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        height: '36px',
                                                        minHeight: '36px',
                                                        padding: '0 0 5px 0',
                                                        borderRadius: '12px'
                                                    }),
                                                    indicatorSeparator: () => ({display: "none"}),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Формат
                                            коммуникации</label>
                                        <Select
                                            options={communicationFormatOptions}
                                            onChange={(option) => setValue('parentCommunicationFormat', option?.value)}
                                            className="w-full"
                                            placeholder="Выберите формат"
                                            components={{DropdownIndicator}}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    height: '36px',
                                                    minHeight: '36px',
                                                    padding: '0 0 5px 0',
                                                    borderRadius: '12px'
                                                }),
                                                indicatorSeparator: () => ({display: "none"}),
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Телефон</label>
                                        <Input type="tel" placeholder="Введите номер телефона"
                                               required {...register('parentPhone')} />
                                    </div>
                                    <div className="space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Электронная почта</label>
                                        <Input type="email" placeholder="Введите адрес электронной почты"
                                               required {...register('parentEmail')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {clientType === 'couple' && (
                        <div className="space-y-[40px]">
                            <div className='space-y-[13px] '>
                                <div>
                                    <label className="font-montserrat text-xs font-medium">ФИО клиента №1</label>
                                    <Input type="text" placeholder="ФИО клиента №1"
                                           required {...register('fullName')} />
                                </div>

                                <div className="flex flex-row w-full space-x-[10px]">
                                    <div className="flex flex-col space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Дата рождения</label>
                                        <input
                                            className="flex h-[36px] w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm"
                                            type="date" required {...register('birth')} />
                                    </div>
                                    <div className="flex flex-col w-full space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Пол</label>
                                        <Select
                                            options={genderOptions}
                                            onChange={(option) => setValue('gender', option?.value)}
                                            placeholder="Выберите пол"
                                            className="rounded-[6]"
                                            components={{DropdownIndicator}}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    height: '36px',
                                                    minHeight: '36px',
                                                    padding: '0 0 5px 0',
                                                    borderRadius: '12px'
                                                }),
                                                indicatorSeparator: () => ({display: "none"}),
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-[5px]">
                                    <label className="font-montserrat text-xs font-medium">Формат коммуникации</label>
                                    <Select
                                        options={communicationFormatOptions}
                                        // @ts-ignore
                                        onChange={(option) => setValue('communicationFormat', option?.value)}
                                        className="w-full"
                                        placeholder="Выберите формат"
                                        components={{DropdownIndicator}}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                height: '36px',
                                                minHeight: '36px',
                                                padding: '0 0 5px 0',
                                                borderRadius: '12px'
                                            }),
                                            indicatorSeparator: () => ({display: "none"}),
                                        }}
                                    />
                                </div>
                                <div className="space-y-[5px]">
                                    <label className="font-montserrat text-xs font-medium">Телефон клиента №1</label>
                                    <Input type="tel" placeholder="Телефон клиента №1"
                                           required {
                                               //@ts-ignore
                                               ...register('phoneNumber')} />
                                </div>
                                <div className="space-y-[5px]">
                                    <label className="font-montserrat text-xs font-medium">Электронная почта
                                        клиента №1</label>
                                    <Input type="email" placeholder="Электронная почта клиента №1"
                                           required {
                                               //@ts-ignore
                                               ...register('mail')} />
                                </div>
                            </div>
                            <div>
                                <div className="space-y-[13px]">
                                    <div className="space-y-[5px]">
                                        <label
                                            className="font-montserrat text-xs font-medium">ФИО клиента №2</label>
                                        <Input className="h-[31px] rounded-xl" type="text"
                                               placeholder={"Введите ФИО клиента №2"}
                                               required {...register('client2FullName')} />
                                    </div>
                                    <div className="flex flex-row w-full space-x-[10px]">
                                        <div className="flex flex-col space-y-[5px]">
                                            <label className="font-montserrat text-xs font-medium">Дата рождения</label>
                                            <input
                                                className="flex h-[36px] w-full rounded-xl border border-gray bg-background px-3 py-2 text-sm"
                                                type="date"
                                                required {...register('client2BirthDate')} />
                                        </div>
                                        <div className="flex flex-col w-full space-y-[5px]">
                                            <label className="font-montserrat text-xs font-medium">Пол</label>
                                            <Select
                                                options={genderOptions}
                                                onChange={(option) => setValue('client2Gender', option?.value)}
                                                placeholder="Выберите пол"
                                                className="rounded-[6]"
                                                components={{DropdownIndicator}}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        height: '36px',
                                                        minHeight: '36px',
                                                        padding: '0 0 5px 0',
                                                        borderRadius: '12px'
                                                    }),
                                                    indicatorSeparator: () => ({display: "none"}),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Формат
                                            коммуникации</label>
                                        <Select
                                            options={communicationFormatOptions}
                                            onChange={(option) => setValue('client2CommunicationFormat', option?.value)}
                                            className="w-full"
                                            placeholder="Выберите формат"
                                            components={{DropdownIndicator}}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    height: '36px',
                                                    minHeight: '36px',
                                                    padding: '0 0 5px 0',
                                                    borderRadius: '12px'
                                                }),
                                                indicatorSeparator: () => ({display: "none"}),
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Телефон клиента №2</label>
                                        <Input type="tel" placeholder="Введите номер телефона"
                                               required {...register('client2Phone')} />
                                    </div>
                                    <div className="space-y-[5px]">
                                        <label className="font-montserrat text-xs font-medium">Электронная почта клиента №2</label>
                                        <Input type="email" placeholder="Введите адрес электронной почты"
                                               required {...register('client2Email')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <hr className="mb-2 mt-[32px] border-gray"/>
                        <div className="w-full flex justify-end items-center space-x-3 font-montserrat text-xs">
                            <div
                                onClick={handleCloseModal}
                                className="flex bg-transparent rounded-[4px] text-[12px] font-semibold cursor-pointer"
                            >
                                Отмена
                            </div>
                            <button
                                type="submit"
                                className="p-[9px] px-[20px] h-fit flex text-white bg-[#EA660C] rounded-[4px] text-xs font-semibold items-center"
                            >
                                Готово
                            </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </Modal>
    );
};

export default AddClientModal;
