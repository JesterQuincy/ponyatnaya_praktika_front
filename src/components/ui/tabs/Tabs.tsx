'use client'

interface ITabsProps {
    changeActiveTab: (tab: string) => void
}

export function Tabs({ changeActiveTab }: ITabsProps) {
    return (
        <div className="bg-inherit mt-[30px] flex gap-[4px]">
            <button 
                className="bg-[#F1F1F1] rounded-tl-[4px] rounded-tr-[4px] py-2 px-4 hover:text-[#EA660C]"
                onClick={() => {
                    changeActiveTab('card')
                }}
            >
                    Карта клиента
            </button>
            <button
                className="bg-[#F1F1F1] rounded-tl-[4px] rounded-tr-[4px] py-2 px-4 hover:text-[#EA660C]"
                onClick={() => {
                    changeActiveTab('meetingsList')
                }}
            >    
                    Список встреч
            </button>
            <button
                className="bg-[#F1F1F1] rounded-tl-[4px] rounded-tr-[4px] py-2 px-4 hover:text-[#EA660C]"
                onClick={() => {
                    changeActiveTab('surveys')
                }}
            >
                    Опросники и тесты
            </button>
        </div>
    );
}
