'use client'

import { SelectHandler } from "./SelectHandler";

import {
    ageOptions,
    appealOptions,
    communicationFormatOptions,
    firstDateAdviceOptions,
    firstDateAppealOptions,
    firstRequestOptions,
    genderOptions,
    serviceOptions,
    statusOptions, typeOptions
} from "./constants/selectOptions";
import { cardFields } from "./constants/cardFields";

interface ICardFormProps {
    user: any,
}

export function CardForm({ user }: ICardFormProps) {

    console.log(user);
    return (
        <>
            <div className="bg-[#F1F1F1] px-[16px] py-[25px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px]">
                <div className="w-full grid grid-cols-3 gap-y-[26px]">
                    <div className="col-span-2 grid grid-cols-2 gap-y-[26px]">
                        <div className="flex flex-col gap-y-[23px] align-center justify-around">
                            {cardFields.map((field) => (
                                <label key={field.name} className="text-sm text-gray-700 mb-1">{field.name}</label>
                            ))}
                        </div>
                        <div className="flex flex-col gap-y-[10px]">
                            <SelectHandler options={typeOptions} defaultValue={user?.clientType}/>
                            <input type="text" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   placeholder="Введите" defaultValue={user?.lastName}/>
                            <input type="text" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   placeholder="Введите" defaultValue={user?.firstName}/>
                            <input type="text" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   placeholder="Введите" defaultValue={user?.secondName}/>
                            <input type="text" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   placeholder="Введите" defaultValue={user?.phoneNumber}/>
                            <input type="email" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   placeholder="Введите" defaultValue={user?.mail}/>
                            <SelectHandler options={genderOptions} defaultValue={user?.gender}/>
                            <SelectHandler options={statusOptions} defaultValue={user?.clientStatus}/>
                            <SelectHandler options={appealOptions} defaultValue={user?.contactMethod}/>
                            <input type="date" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   defaultValue={user?.dateFirstRequest}/>
                            <input type="date" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   defaultValue={user?.dateFirstConsultation}/>
                            <SelectHandler options={communicationFormatOptions} defaultValue={user?.meetingFormat}/>
                            <SelectHandler options={serviceOptions} defaultValue={user?.onlinePlatform}/>
                            <input type="text" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   placeholder="Введите" defaultValue={user?.offlineAddress}/>
                            <input type="text" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   placeholder="Введите" defaultValue={user?.clientTherapyRequest}/>
                            <input type="text" className="p-2 border rounded-xl border-[#D9D9D9] text-sm"
                                   placeholder="Введите" defaultValue={user?.clientTherapyRequest}/>
                        </div>
                    </div>
                    <div className="ml-[20px]">
                        <div className="w-full flex-col items-end p-4 flex">
                            <button className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px] mb-3">
                                Сохранить
                            </button>
                            <button className="bg-[#5A5A5A] text-white py-2 px-4 rounded-[6px]">
                                Ссылка на анкету
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-[11px] text-[#EA660C] underline underline-offset-[2.5px]">
                    Подробнее
                </div>
            </div>
        </>
    );
}