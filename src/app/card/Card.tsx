'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import HumanIcon from '@/public/icon/humanIcon.svg'
import { Heading } from '@/components/ui/Heading'
import { CardFormAdult } from '@/components/layout/card-page/Adult'
import { Tabs, TTab } from '@/components/ui/tabs/Tabs'
import { MeetingsListForm } from '@/components/ui/forms/MeetingsListForm'
import { SurveysListForm } from '@/components/ui/forms/SurveysListForm'
import styles from '@/styles/card.module.css'
import { clientService } from '@/services/clients.service'
import { useSearchParams } from 'next/navigation'
import { IClient } from '@/types/clients'
import { Spinner } from '@/components/Spinner'
import { IChild } from '@/types/child'
import { CardFormChild } from '@/components/layout/card-page/Child'
import { EClientType } from '@/types/common'
import { CardFormCouple } from '@/components/layout/card-page/Couple'
import { ICouple } from '@/types/couple'
import { getAge } from '@/helpers/utils/getAge'

type TUserType =
  | { type: EClientType.ADULT; client: IClient }
  | { type: EClientType.CHILD; client: IChild }
  | { type: EClientType.COUPLE; client: ICouple }

export function Card(id: any) {
  const searchParams = useSearchParams()
  const clientType = searchParams.get('clientType')

  const [isLoading, setIsLoading] = useState(false)
  const [clientData, setClientData] = useState<TUserType>()
  const [activeTab, setActiveTab] = useState<TTab>('card')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        let data
        if (clientType === 'Взрослый') {
          data = await clientService.getClientById(id.id)
          setClientData({ type: EClientType.ADULT, client: data.data })
        } else if (clientType === 'Ребенок') {
          data = await clientService.getChildById(id.id)
          setClientData({ type: EClientType.CHILD, client: data.data })
        } else if (clientType === 'Пара') {
          data = await clientService.getPairById(id.id)
          setClientData({ type: EClientType.COUPLE, client: data.data })
        }
      } catch (error) {
        console.error('Ошибка при получении данных клиента:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, clientType])

  return (
    <div className={styles.card}>
      {isLoading && <Spinner />}
      {!isLoading && clientData && (
        <>
          <Heading title={clientData?.client.fullName} />
          <div className="flex items-center space-x-4 mt-[7px] text-gray-700">
            <div className="flex items-center space-x-2 bg-gray-200 text-gray-700 py-1 rounded-full">
              <div className="text-[11px] bg-[#E4E4E4] px-[12px] py-[3px] rounded-[30px] flex">
                <Image src={HumanIcon} alt="Human" className="mr-2" /> {clientData?.client.clientType}
              </div>
            </div>
            {/*TODO: вернуть, когда обновят сваггер*/}
            {/*<div className="text-[11px]">*/}
            {/*  <span className="text-[#7E7E7E]">Возраст:</span> {getAge(clientData.client?.birth)}*/}
            {/*</div>*/}
            {/*<div className="text-[11px]">*/}
            {/*  <span className="text-[#7E7E7E]">Всего встреч:</span> {client?.countMeet}*/}
            {/*</div>*/}
            {/*<div className="text-[11px]">*/}
            {/*  <span className="text-[#7E7E7E]">Последняя:</span> {client?.lastMeeting || null}*/}
            {/*</div>*/}
            {/*<div className="text-[11px]">*/}
            {/*  <span className="text-[#7E7E7E]">Следующая:</span> {client?.nextMeeting || null}*/}
            {/*</div>*/}
          </div>
          <Tabs changeActiveTab={setActiveTab} activeTab={activeTab} />
          {activeTab === 'card' && clientData.type === EClientType.ADULT && <CardFormAdult user={clientData.client} />}
          {activeTab === 'card' && clientData.type === EClientType.CHILD && <CardFormChild user={clientData.client} />}
          {activeTab === 'card' && clientData.type === EClientType.COUPLE && (
            <CardFormCouple user={clientData.client} />
          )}
          {activeTab === 'meetingsList' && <MeetingsListForm user={clientData.client} />}
          {activeTab === 'surveys' && <SurveysListForm user={clientData.client} />}
        </>
      )}
    </div>
  )
}
