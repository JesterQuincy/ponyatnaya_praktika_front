'use client'

import Image from 'next/image'
import PhoneIcon from '@/public/icon/phone.svg'
import MessageIcon from '@/public/icon/message.svg'
import { IMeetingDetails } from '@/types/meet/getMeetById'
import { emptyRowField } from '@/constants'

interface IMeetFormProps {
  headerData: IMeetingDetails
}

export function MeetHeader({ headerData }: IMeetFormProps) {
  return (
    <div className="border-t border-b border-[#E9E9EA] mt-[7px] py-[4px] px-[6px] w-full flex">
      <div className="flex justify-between items-center w-[50%] gap-x-3">
        <div className="flex flex-col">
          <div className="text-sm">
            <span className="text-[#7E7E7E]">Дата: </span>
            <span>{headerData.dateMeet}</span>
          </div>
          <div className="text-sm">
            <span className="text-[#7E7E7E]">Время: </span>
            <span>
              {headerData.startMeet}-{headerData.endMeet}
            </span>
          </div>
          <div className="bg-[#FDDCC6] text-[#EA660C] flex justify-center px-[11px] py-[5px] text-center text-sm rounded max-w-[69px]">
            <span>{headerData.formatMeet}</span>
          </div>
        </div>

        <div>
          <div className="text-[#EA660C] text-[18px] font-semibold underline underline-offset-[3.5px]">
            {headerData.customer.fullName}
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-2">
              <Image src={PhoneIcon} alt="PhoneIcon" />
              {headerData.customer.phoneNumber}
            </span>
            <span className="flex items-center gap-2">
              <Image src={MessageIcon} alt="MessageIcon" />
              <a href={`mailto:${headerData.customer.mail}`} className="text-sm text-[#7E7E7E]">
                {headerData.customer.mail}
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
              <span>{headerData.paymentType || emptyRowField}</span>
            </div>
            <div className="text-sm">
              <span className="text-[#7E7E7E]">Сумма: </span>
              <span>{headerData.customer.financialCondition ?? emptyRowField}</span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-sm">
              <span className="text-[#7E7E7E]">Следующая встреча: </span>
              <span>{headerData.nextDayMeet ?? emptyRowField}</span>
            </div>
            <div className="text-sm">
              <span className="text-[#7E7E7E]">Время: </span>
              <span>
                {headerData.nextStartMeet}-{headerData.nextEndMeet}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
