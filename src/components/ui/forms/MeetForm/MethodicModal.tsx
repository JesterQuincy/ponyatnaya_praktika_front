import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import Select from "react-select";

import ImageIcon from "@/public/icon/image.svg";

import { Button } from '../../buttons/Button';

import { methodicOptions } from '../constants/selectOptions';

import styles from '@/styles/AddMeetModal.module.css';
import { Heading } from '../../Heading';


interface IMeetingModalProps {
    isOpen: boolean,
    onClose: () => void
}

const MethodicModal = ({ isOpen, onClose }: IMeetingModalProps) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Добавить методику"
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >
            <div className="text-black font-ebgaramond font-bold text-[33px]">Добавить методику</div>
            <div className='mt-[18px] mb-[31px] flex flex-col gap-[5px]'>
                <span className='font-montserrat text-[12px] font-medium'>Название</span>
                <Select
                    options={methodicOptions}
                    placeholder='Выберете методику'
                    styles={{
                        control: (base) => ({
                            ...base,
                            height: '36px',
                            minHeight: '36px',
                            padding: '0 0 5px 0',
                            borderRadius: '12px',
                        }),
                        indicatorSeparator: () => ({display: "none"}),
                    }}
                />
            </div>
            <div className="border-2 border-dashed border-[#5A5A5A] rounded-[6px] mt-[21px] p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-[7px]">
                    <Image src={ImageIcon} alt="ImageIcon" className="mr-2"/>
                </div>
                <p className="font-semibold">Перетащите изображение сюда</p>
                <p className="text-[#5A5A5A] text-sm">или нажмите кнопку</p>
                <div className="mt-4 flex gap-4">
                    <Button className="bg-[#5A5A5A] text-white py-1 px-4 rounded-[6px]">Выбрать файл</Button>
                    <Button className="border border-[#5A5A5A] text-[#5A5A5A] py-1 px-4 rounded-[6px]">Вставить из буфера</Button>
                </div>
            </div>
            <div className='border-t border-[#CACACA] mt-[25px] w-full flex gap-[15px] justify-end pt-[10px]'>
                <Button onClick={onClose} className='text-[#525252] font-montserrat font-semibold'>
                    Отмена
                </Button>
                <Button onClick={onClose} className='bg-[#EA660C] py-[5px] px-[10px] rounded-[6px] text-white font-montserrat font-semibold'>
                    Готово
                </Button>
            </div>
        </Modal>
    );
};

export default MethodicModal;
