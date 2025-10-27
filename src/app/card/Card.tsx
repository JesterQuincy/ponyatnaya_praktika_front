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
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Spinner } from '@/components/Spinner'
import { CardFormChild } from '@/components/layout/card-page/Child'
import { EClientType } from '@/types/common'
import { CardFormCouple } from '@/components/layout/card-page/Couple'
import { getAge } from '@/helpers/utils/getAge'
import { useGetMeetingCustomer } from '@/api/hooks/meet/useGetMeetingCustomer'
import { emptyRowField } from '@/constants'
import dayjs from 'dayjs'
import { useClientByType } from '@/api/hooks/client/useGetClientById'
import type { IClient } from '@/types/clients'
import type { IChild } from '@/types/child'
import type { ICouple } from '@/types/couple'

export function Card({ id }: { id: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const clientType = searchParams.get('clientType')
  const tabFromUrl = searchParams.get('tab') as TTab | null

  const TYPE_LABELS = ['Взрослый', 'Ребенок', 'Пара'] as const
  type ClientTypeLabel = (typeof TYPE_LABELS)[number]

  const TYPE_MAP: Record<ClientTypeLabel, EClientType> = {
    Взрослый: EClientType.ADULT,
    Ребенок: EClientType.CHILD,
    Пара: EClientType.COUPLE,
  }

  const isClientTypeLabel = (s: string): s is ClientTypeLabel => (TYPE_LABELS as readonly string[]).includes(s)

  const typeFromUrl: EClientType | null = clientType && isClientTypeLabel(clientType) ? TYPE_MAP[clientType] : null

  const [activeTab, setActiveTab] = useState<TTab>('card')

  const { data: meetingsInfo, status } = useGetMeetingCustomer(id)
  const isLoadingCustomerInfo = status === 'pending'

  // получаем самого клиента (без обёртки { type, client })
  const { data: clientData, isPending: isLoadingClient } = useClientByType(Number(id), typeFromUrl)

  const handleTabChange = (tab: TTab) => {
    setActiveTab(tab)
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tab)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl)
    }
  }, [activeTab, tabFromUrl])

  return (
    <div className={styles.card}>
      {isLoadingClient && <Spinner />}
      {!isLoadingClient && clientData && (
        <>
          <Heading title={clientData.fullName} />

          <div className="flex items-center space-x-4 mt-[7px] text-gray-700">
            <div className="flex items-center space-x-2 bg-gray-200 text-gray-700 py-1 rounded-full">
              <div className="text-[11px] bg-[#E4E4E4] px-[12px] py-[3px] rounded-[30px] flex">
                <Image src={HumanIcon} alt="Human" className="mr-2" /> {clientData.clientType}
              </div>
            </div>

            {isLoadingCustomerInfo && <Spinner />}

            <div className="text-[11px]">
              <span className="text-[#7E7E7E]">Возраст:</span>{' '}
              {'birth' in clientData ? getAge((clientData as IClient | IChild).birth) : emptyRowField}
            </div>

            {!isLoadingCustomerInfo && meetingsInfo?.data && (
              <>
                <div className="text-[11px]">
                  <span className="text-[#7E7E7E]">Всего встреч:</span> {meetingsInfo.data.countMeet ?? emptyRowField}
                </div>
                <div className="text-[11px]">
                  <span className="text-[#7E7E7E]">Последняя:</span>{' '}
                  {meetingsInfo.data.lastMeetDate
                    ? dayjs(meetingsInfo.data.lastMeetDate).format('DD-MM-YYYY')
                    : emptyRowField}
                </div>
                <div className="text-[11px]">
                  <span className="text-[#7E7E7E]">Следующая:</span>{' '}
                  {meetingsInfo.data.nextMeetDate
                    ? dayjs(meetingsInfo.data.nextMeetDate).format('DD-MM-YYYY')
                    : emptyRowField}
                </div>
              </>
            )}
          </div>

          <Tabs
            changeActiveTab={(value) => {
              const newTab = typeof value === 'function' ? value(activeTab) : value
              handleTabChange(newTab)
            }}
            activeTab={activeTab}
          />

          {activeTab === 'card' && typeFromUrl === EClientType.ADULT && <CardFormAdult user={clientData as IClient} />}
          {activeTab === 'card' && typeFromUrl === EClientType.CHILD && <CardFormChild user={clientData as IChild} />}
          {activeTab === 'card' && typeFromUrl === EClientType.COUPLE && (
            <CardFormCouple user={clientData as ICouple} />
          )}

          {activeTab === 'meetingsList' && <MeetingsListForm user={clientData} />}
          {activeTab === 'surveys' && <SurveysListForm user={clientData} />}
        </>
      )}
    </div>
  )
}
