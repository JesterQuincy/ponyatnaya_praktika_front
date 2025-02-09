'use client'

import React, { PropsWithChildren, useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/LogoSVG.svg'
import PersonPhoto from '@/public/person-default.png'
import ExitLogo from '@/public/Out.png'
import LetterLogo from '@/public/img/letterLogo.svg'
import { calendarService } from '@/services/calendar.service'
import { authService } from '@/services/auth.service'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ClientIcon, CalendarIcon, TestsIcon } from '@/components/ui/calendar/icons'

export default function SideBar({ children }: PropsWithChildren) {
  const [showAll, setShowAll] = useState(false)
  const [meetings, setMeetings] = useState([])
  const [userData, setUserData] = useState(null)

  const router = useRouter()

  const handleEventClick = (meeting: any) => {
    router.push(`/card/${meeting.id}?clientType=${meeting.clientType}`)
  }

  const currentPath = usePathname()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await calendarService.getNotifications()

        const serverData = response.data.notificationResponseList

        const transformedMeetings = serverData.map((item: any) => ({
          date: new Date(item.dateFirstRequest).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          name: item.customerFullName,
          id: item.customerId,
          clientType: item.clientType,
        }))

        setMeetings(transformedMeetings)
      } catch (error) {
        console.error('Ошибка при загрузке уведомлений:', error)
      }
    }
    const fetchUserInfo = async () => {
      try {
        const response: any = await calendarService.getUserInfo()
        setUserData(response.data)
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error)
      }
    }

    fetchNotifications()
    fetchUserInfo()
  }, [])

  const returnToCalendar = () => {
    router.push('/calendar')
  }

  // @ts-ignore
  const userName = userData?.userName || 'не удалось загрузить'
  // @ts-ignore
  const userMail = userData?.userMail || 'не удалось загрузить'
  // @ts-ignore
  const userImage = userData?.userPicture || PersonPhoto

  const displayedMeetings = showAll ? meetings : meetings.slice(0, 6)

  const handleExitOut = () => {
    authService.logout().then()

    router.push('/login')
  }

  const activeLink = (path: string) => {
    return currentPath === path ? 'bg-hoverButton text-orange' : 'hover:bg-hoverButton'
  }

  const isActivePath = (path: string) => {
    return currentPath === path
  }

  return (
    <div className="flex flex-col max-w-[300px] rounded-xl items-center bg-white shadow-lg p-4 sticky top-sidebar h-sidebar">
      <Image src={Logo} alt="Logo company" width={400} onClick={returnToCalendar} className="hover:cursor-pointer" />
      <hr className="my-4 h-0.5 w-full border-gray" />
      <div className="flex flex-col items-center">
        <div className="rounded-full overflow-hidden">
          <Image src={userImage} alt="Person Foto" width={100} height={100} />
        </div>
        <div className="text-xl font-semibold mb-1">Привет, {userName}!</div>
        <div className="text-sm text-gray-600 flex items-center">
          {userMail}
          <Image src={ExitLogo} alt="Выйти" className="ml-2 cursor-pointer" onClick={handleExitOut} />
        </div>
      </div>
      <nav className="mt-[50px] flex flex-col space-y-2 w-full">
        <Link href="/account">
          <Button
            variant="link"
            className={`p-2 flex w-full border-[1px] justify-start ${activeLink('/account')} transition-colors`}>
            <ClientIcon isActive={isActivePath('/account')} />
            Личный кабинет
          </Button>
        </Link>
        <Link href="/clients">
          <Button
            variant="link"
            className={`p-2 flex w-full border-[1px] justify-start ${activeLink('/clients')} transition-colors`}>
            <ClientIcon isActive={isActivePath('/clients')} />
            Клиенты
          </Button>
        </Link>
        <Link href="/calendar">
          <Button
            variant="link"
            className={`p-2 flex w-full border-[1px] justify-start ${activeLink('/calendar')} transition-colors`}>
            <CalendarIcon isActive={isActivePath('/calendar')} />
            Календарь
          </Button>
        </Link>
        <Link href="/tests">
          <Button
            variant="link"
            className={`p-2 flex  w-full border-[1px] justify-start ${activeLink('/tests')} transition-colors`}>
            <TestsIcon isActive={isActivePath('/tests')} />
            Опросы и тесты
          </Button>
        </Link>
      </nav>
      <div className="mt-6 w-full bg-gray-100 overflow-y-auto">
        <div className="text-sm mb-4">
          У вас <span className="text-orange-500 font-semibold">{meetings.length}</span> новых заявок:
        </div>
        <div className="relative">
          {displayedMeetings.map((meeting, index) => (
            <div
              key={index}
              //@ts-ignore
              onClick={() => handleEventClick(meeting)}
              style={{ zIndex: index }}
              className={`flex relative gap-[6px] whitespace-nowrap overflow-hidden text-ellipsis shadow-[0px_-5px_11px_0px_#0000002E] items-center rounded-t-[8px] flex-row py-[8px] pl-[8px] hover:cursor-pointer `}>
              <div className="text-[9px] rounded-[8px] text-white bg-[#6E6E6E] px-[3px]">
                {
                  //@ts-ignore
                  meeting.date
                }
              </div>
              <Image src={LetterLogo} alt="Calendar" />
              <div className="text-[12px] font-montserrat text-black font-normal">
                {
                  //@ts-ignore
                  meeting.name
                }
              </div>
            </div>
          ))}
        </div>

        {meetings.length > 6 && (
          <button onClick={() => setShowAll(!showAll)} className="text-orange-500 mt-4 underline">
            {showAll ? 'Скрыть' : 'Все'}
          </button>
        )}
      </div>
    </div>
  )
}
