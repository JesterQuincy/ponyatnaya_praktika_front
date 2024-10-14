'use client'

import Image from "next/image";

import ImageIcon from "@/public/icon/imageWhite.svg";

import { Button } from "../../buttons/Button";

import { projectMetodics } from "../mocks/projectMetodics";
import { meetData } from "../mocks/meetsList";

interface IMeetFormProps {
    content: any,
    modalOpen: () => void
}

export function MeetContent({ content, modalOpen }: IMeetFormProps) {

    return (
        <div className="flex gap-[15px] mt-[13px]">
            <div className="bg-[#F1F1F1] w-[60%] px-[16px] py-[25px] rounded-tr-[4px] rounded-[4px] flex flex-col gap-[25px] relative">
                {meetData.map((meet) => (
                    <div key={meet.fieldName}>
                        <span className="font-semibold">
                            {meet.fieldName}
                        </span>
                        <div>
                            <textarea className="border border-[#D9D9D9] mt-[5px] rounded-[6px] w-full min-h-[46px]"/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-[#F1F1F1] w-[40%] rounded-[4px] py-[29px] px-[11px] h-fit">
                <div>
                    <span className="font-bold text-[20px]">
                        Проективные методики
                    </span>
                    <div className="flex flex-col gap-[10px] mt-[10px]">
                        {projectMetodics.map((item) => (
                            <div key={item.id} className="bg-white rounded-[6px] p-[5px] flex items-center gap-[10px]">
                                <span className="bg-[#6E6E6E] text-white text-[12px] p-[2px] rounded-[3px] text-center min-w-[75px]">
                                    {item.date}
                                </span>
                                <span className="text-[15px]">
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-[9px]">
                        <Button className="border border-[#D9D9D9] px-[10px] py-[5px] rounded-[6px]">
                            Ещё
                        </Button>
                    </div>
                </div>
                <div className="mt-[13px]">
                    <Button onClick={modalOpen} className="bg-[#5A5A5A] text-white px-[10px] py-[5px] rounded-[6px] flex items-center">
                        <Image src={ImageIcon} alt="CorrectFile" className="mr-2"/>
                        <span>
                            Добавить методику
                        </span>
                    </Button>
                </div>
                <div className="mt-[27px]">
                    <span className="font-bold text-[20px]">
                        Дополнительная заметка
                    </span>
                    <div className="mt-[5px]">
                        <textarea className="border border-[#D9D9D9] rounded-[6px] w-[90%] min-h-[110px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
