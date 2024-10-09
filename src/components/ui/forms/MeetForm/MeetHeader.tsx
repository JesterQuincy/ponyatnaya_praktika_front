'use client'

import Image from "next/image";

import { useMeet } from "@/app/context/meetContext";

import PhoneIcon from '@/public/icon/phone.svg';
import MessageIcon from '@/public/icon/message.svg';

interface IMeetFormProps {
    headerData: any
}

export function MeetHeader({ headerData }: IMeetFormProps) {
    const mockData = {
        date: "20.12.2024",
        time: "11:00 – 12:00",
        status: "Офлайн",
        name: "Валиева Камила Валерьевна",
        phone: "+7 (988) 902-12-23",
        email: "valieva.kamila@yandex.ru",
        paymentMethod: "Безналичная",
        amount: "5 000 ₽",
        nextMeetingDate: "15.09.2025",
        nextMeetingTime: "18:00 – 19:00"
    };

    return (
        <div className="border-t border-b border-[#E9E9EA] mt-[7px] py-[4px] px-[6px] w-full flex">
            <div className="flex justify-between items-center w-[40%]">
                <div className="flex flex-col">
                    <div className="text-sm">
                        <span className="text-[#7E7E7E]">Дата: </span>
                        <span>{mockData.date}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-[#7E7E7E]">Время: </span>
                        <span>{mockData.time}</span>
                    </div>
                    <div className="bg-[#FDDCC6] text-[#EA660C] flex justify-center px-[11px] py-[5px] text-center text-sm rounded max-w-[69px]">
                        <span>{mockData.status}</span>
                    </div>
                </div>

                <div>
                    <div className="text-[#EA660C] text-[18px] font-semibold underline underline-offset-[3.5px]">
                        {mockData.name}
                    </div>
                    <div className="flex flex-col">
                        <span className="flex items-center gap-2">
                            <Image src={PhoneIcon} alt="PhoneIcon"/>
                            {mockData.phone}
                        </span>
                        <span className="flex items-center gap-2">
                            <Image src={MessageIcon} alt="MessageIcon"/>
                            <a href={`mailto:${mockData.email}`} className="text-sm text-[#7E7E7E]">
                                {mockData.email}
                            </a>
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-end w-[60%]">
                <div className="flex gap-[25px]">
                    <div className="flex flex-col items-start">
                        <div className="text-sm">
                            <span className="text-[#7E7E7E]">Форма оплаты: </span>
                            <span>{mockData.paymentMethod}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-[#7E7E7E]">Сумма: </span>
                            <span>{mockData.amount}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="text-sm">
                            <span className="text-[#7E7E7E]">Следующая встреча: </span>
                            <span>{mockData.nextMeetingDate}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-[#7E7E7E]">Время: </span>
                            <span>{mockData.nextMeetingTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
