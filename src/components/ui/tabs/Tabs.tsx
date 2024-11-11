import { cn } from '@/lib/utils'
import { Dispatch, FC, SetStateAction } from 'react'

interface ITabsProps {
  changeActiveTab: Dispatch<SetStateAction<TTab>>
  activeTab: TTab
}

export type TTab = 'card' | 'meetingsList' | 'surveys'

export const Tabs: FC<ITabsProps> = ({ changeActiveTab, activeTab }) => {
  return (
    <div className="bg-inherit mt-[30px] flex gap-[4px]">
      <button
        className={cn(
          'bg-white rounded-tl-[4px] rounded-tr-[4px] py-2 px-4 hover:text-[#EA660C]',
          activeTab === 'card' && 'bg-[#F1F1F1]',
        )}
        onClick={() => {
          changeActiveTab('card')
        }}>
        Карта клиента
      </button>
      <button
        className={cn(
          'bg-white rounded-tl-[4px] rounded-tr-[4px] py-2 px-4 hover:text-[#EA660C]',
          activeTab === 'meetingsList' && 'bg-[#F1F1F1]',
        )}
        onClick={() => {
          changeActiveTab('meetingsList')
        }}>
        Список встреч
      </button>
      <button
        className={cn(
          'bg-white rounded-tl-[4px] rounded-tr-[4px] py-2 px-4 hover:text-[#EA660C]',
          activeTab === 'surveys' && 'bg-[#F1F1F1]',
        )}
        onClick={() => {
          changeActiveTab('surveys')
        }}>
        Опросники и тесты
      </button>
    </div>
  )
}
