'use client'

import {useEffect, useState} from "react";
import Image from "next/image";

import { useUser } from "@/app/context/userContext";

import HumanIcon from "@/public/icon/humanIcon.svg";

import { Heading } from "@/components/ui/Heading";
import { CardForm } from "@/components/ui/forms/CardForm";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { MeetingsListForm } from "@/components/ui/forms/MeetingsListForm";
import { SurveysListForm } from "@/components/ui/forms/SurveysListForm";

import styles from "@/styles/card.module.css";
import {clientService} from "@/services/clients.service";


export function Card(id: any) {
    const { user } = useUser();
    const [client, setClient] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('card');

    useEffect(() => {
        clientService.getClientById(id.id)
            .then(data => {
                setClient(data.data);
            })
            .catch(error => {
                console.error("Ошибка при получении данных клиента:", error);
            });
    }, [id]);

    console.log(client);
    return (
        <div className={styles.card}>
            <Heading title={client?.fullName}/>
            <div className="flex items-center space-x-4 mt-[7px] text-gray-700">
                <div className="flex items-center space-x-2 bg-gray-200 text-gray-700 py-1 rounded-full">
                    <div className="text-[11px] bg-[#E4E4E4] px-[12px] py-[3px] rounded-[30px] flex">
                        <Image src={HumanIcon} alt="Human" className="mr-2"/> {client?.clientType}
                    </div>
                </div>
                <div className="text-[11px]">
                    <span className="text-[#7E7E7E]">Возраст:</span> {client?.years}
                </div>
                <div className="text-[11px]">
                    <span className="text-[#7E7E7E]">Всего встреч:</span> {client?.countMeet}
                </div>
                <div className="text-[11px]">
                    <span className="text-[#7E7E7E]">Последняя:</span> {client?.lastMeeting || null}
                </div>
                <div className="text-[11px]">
                    <span className="text-[#7E7E7E]">Следующая:</span> {client?.nextMeeting || null}
                </div>
            </div>
            <Tabs changeActiveTab={setActiveTab} />
            {activeTab === 'card' && <CardForm user={client}/>}
            {activeTab === 'meetingsList' && <MeetingsListForm user={client}/>}
            {activeTab === 'surveys' && <SurveysListForm user={client}/>}
        </div>
    );
}
