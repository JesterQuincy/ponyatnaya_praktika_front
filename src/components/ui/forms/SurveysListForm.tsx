'use client'

import { useState } from "react";
import Image from "next/image";
import Select from "react-select";

import TaskIcon from "@/public/icon/task.svg";
import TripleDots from "@/public/icon/tripleDots.svg";

import { Button } from "../buttons/Button";
import { Pagination } from "../Pagination";

import { surveysList } from "./mocks/surveysList";
import { filterOptions } from "./constants/selectOptions";


interface ICardFormProps {
    user: any,
}

export function SurveysListForm({ user }: ICardFormProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = surveysList.slice(indexOfFirstItem, indexOfLastItem);

    // Определение количества страниц
    const totalPages = Math.ceil(surveysList.length / itemsPerPage);

    // Функция для смены страницы
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getItemStyle = (type: string) => {
        switch (type) {
            case 'Тест':
                return 'bg-[#D7E1AF]';  // Зеленый
            case 'Опрос':
                return 'bg-[#FFCBCB]';  // Красный/розовый
            case 'Анкета':
                return 'bg-[#E1CBFF]';  // Фиолетовый
            default:
                return '';
        }
    };
    
    return (
        <div className="flex gap-[15px]">
            <div className="bg-[#F1F1F1] w-[70%] px-[16px] py-[25px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px] flex flex-col justify-between gap-[25px] relative">
                {currentItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-[6px] flex gap-[10px] px-[10px] py-[11px] relative">
                        <div className="flex flex-col gap-[10px]">
                            <span className={`${getItemStyle(item.status)} px-[10px] py-[4px] rounded-[4px] text-[12px] text-center`}>
                                {item.status}
                            </span>
                            <span className="text-[12px] text-[#7E7E7E]">
                                Дата: {item.date}
                            </span>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <span className="text-[#EA660C] text-[18px] font-bold underline underline-offset-[3.5px]">
                                {item.title}
                            </span>
                            <span className="text-[12px] text-[#7E7E7E]">
                                Встреча: {item.meet}
                            </span>
                        </div>
                        <Button className="absolute bg-[#E4E4E4] right-[20px] text-[#7E7E7E] text-[20px] flex items-center p-[10px] rounded-[6px]">
                            <Image src={TripleDots} alt="TripleDots"/>
                        </Button>
                    </div>
                ))}
                <div className="mt-[10px]">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        paginate={paginate}
                    />
                </div>
            </div>
            <div className="w-[30%]">
                <div className="bg-[#F1F1F1] rounded-[4px] py-[29px] px-[11px]">
                    <h2 className="text-center text-lg font-semibold mb-4">Панель фильтрации</h2>
                    <div className="flex flex-col gap-4">
                        {/* Поиск */}
                        <div className="flex items-center gap-2 justify-start">
                            <label className="text-sm">Содержит</label>
                            <input 
                                type="text" 
                                placeholder="Поиск" 
                                className="p-2 border border-[#D9D9D9] rounded-[6px] flex-grow text-sm"
                            />
                        </div>

                        {/* Тип */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm min-w-[70px]">Тип</label>
                            <Select
                                options={filterOptions}
                                placeholder='Выберете'
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        height: '36px',
                                        minHeight: '36px',
                                        padding: '0 0 5px 0',
                                        borderRadius: '6px',
                                    }),
                                    indicatorSeparator: () => ({display: "none"}),
                                }}
                            />
                        </div>

                        {/* В период */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm min-w-[70px]">В период</label>
                            <input 
                                type="date" 
                                className="p-2 border border-[#D9D9D9] rounded-[6px] text-sm"
                            />
                            <span className="text-sm">по</span>
                            <input 
                                type="date" 
                                className="p-2 border border-[#D9D9D9] rounded-[6px] text-sm"
                            />
                        </div>

                        {/* Кнопки */}
                        <div className="flex justify-center gap-4 mt-4">
                            <Button className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px]">Отфильтровать</Button>
                            <Button className="border border-[#5A5A5A] text-[#5A5A5A] py-2 px-4 rounded-[6px]">Сбросить фильтр</Button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-[20px]">
                    <div className="flex items-center">
                        <Image src={TaskIcon} alt="TaskIcon" className="mr-2"/>
                        <span className="text-[#EA660C] underline underline-offset-[3.5px] hover:cursor-pointer">К моим материалам</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
