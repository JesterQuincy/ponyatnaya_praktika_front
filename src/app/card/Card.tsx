'use client'

import { useState } from "react";
import Image from "next/image";

import { useUser } from "@/app/context/userContext";

import HumanIcon from "@/public/icon/humanIcon.svg";

import { Heading } from "@/components/ui/Heading";
import { CardForm } from "@/components/ui/forms/CardForm";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { MeetingsListForm } from "@/components/ui/forms/MeetingsListForm";
import { SurveysListForm } from "@/components/ui/forms/SurveysListForm";

import styles from "@/styles/card.module.css";


export function Card() {
    const { user } = useUser();
    const [ activeTab, setAvtiveTab ] = useState('card');

    console.log('tab', activeTab);

    return (
        <div className={styles.card}>
            <Heading title={user.fullName || null}/>
            <div className="flex items-center space-x-4 mt-[7px] text-gray-700">
                <div className="flex items-center space-x-2 bg-gray-200 text-gray-700 py-1 rounded-full">
                    <div className="text-[11px] bg-[#E4E4E4] px-[12px] py-[3px] rounded-[30px] flex">
                        <Image src={HumanIcon} alt="Human" className="mr-2"/> {user.clientType || null}
                    </div>
                </div>
                <div className="text-[11px]">
                    <span className="text-[#7E7E7E]">Возраст:</span> {user.years}
                </div>
                <div className="text-[11px]">
                    <span className="text-[#7E7E7E]">Всего встреч:</span> {user.countMeet}
                </div>
                <div className="text-[11px]">
                    <span className="text-[#7E7E7E]">Последняя:</span> {user.lastMeeting || null}
                </div>
                <div className="text-[11px]">
                    <span className="text-[#7E7E7E]">Следующая:</span> {user.nextMeeting || null}
                </div>
            </div>
            <Tabs changeActiveTab={setAvtiveTab} />
            {activeTab === 'card' && <CardForm user={user}/>}
            {activeTab === 'meetingsList' && <MeetingsListForm user={user}/>}
            {activeTab === 'surveys' && <SurveysListForm user={user}/>}
        </div>
    );
}
