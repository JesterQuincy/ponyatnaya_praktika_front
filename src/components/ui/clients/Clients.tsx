'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heading } from '@/components/ui/Heading'
import Select from 'react-select'
import { components } from 'react-select'
import { Input } from '@/components/ui/input'
import SearchUserIcon from '@/public/icon/searchUser.svg'
import FilterIcon from '@/public/icon/filterIcon.svg'
import ChildrenIcon from '@/public/icon/childrenIcon.svg'
import HumanIcon from '@/public/icon/humanIcon.svg'
import MailIcon from '@/public/icon/mailIcon.svg'
import PhoneIcon from '@/public/icon/telephoneIcon.svg'
import PairIcon from '@/public/icon/pair.svg'
import BottomArrow from '@/public/icon/bottomArrow.svg'
import { clientService } from '@/services/clients.service'
import { Pagination } from '@/components/ui/Pagination'

export const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={BottomArrow} alt="Dropdown icon" width={8} height={8} />
    </components.DropdownIndicator>
  )
}

function Clients() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterClientType, setFilterClientType] = useState({ value: 'Нет', label: 'Нет' })
  const [filterClientStatus, setFilterClientStatus] = useState({ value: 'Нет', label: 'Нет' })
  const [filterDateOrder, setFilterDateOrder] = useState({ value: 'Нет', label: 'Нет' })
  const [filterMeetingFrequency, setFilterMeetingFrequency] = useState({ value: 'Нет', label: 'Нет' })
  const [currentPage, setCurrentPage] = useState(1)
  const [clients, setClients] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const clientsPerPage = 10

  const router = useRouter()

  const handleClick = (client: any): void => {
    router.push(`card/${client.personId}?clientType=${client.clientType}`)
  }

  async function fetchClients() {
    try {
      setIsLoading(true)
      const data = await clientService.getClientByName(clientsPerPage, (currentPage - 1) * clientsPerPage, searchQuery)
      console.log('Полученные данные:', data.data)
      setClients(data.data)
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [currentPage, searchQuery])

  const filteredClients = useMemo(() => {
    return (
      clients
        // Client был с типом never, так сделал прошлый фронт. Пусть хотя бы будет `any`
        .filter((client: any) => {
          // @ts-ignore
          const matchesSearch = client.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
          // @ts-ignore
          const matchesClientType = filterClientType.value === 'Нет' || client.clientType === filterClientType.value
          // @ts-ignore
          const matchesClientStatus =
            filterClientStatus.value === 'Нет' || client.meetingType === filterClientStatus.value
          const matchesDateOrder =
            filterDateOrder.value === 'Нет' ||
            // @ts-ignore
            (filterDateOrder.value === 'Раньше' && new Date(client.meetDate) <= new Date()) ||
            // @ts-ignore
            (filterDateOrder.value === 'Позже' && new Date(client.meetDate) > new Date())
          const matchesFrequency =
            filterMeetingFrequency.value === 'Нет' ||
            // @ts-ignore
            (filterMeetingFrequency.value === 'Чаще' && client.countMeet >= 10) ||
            // @ts-ignore
            (filterMeetingFrequency.value === 'Реже' && client.countMeet < 10)

          return matchesSearch && matchesClientType && matchesClientStatus && matchesDateOrder && matchesFrequency
        })
        .sort((a, b) =>
          filterDateOrder.value === 'Раньше'
            ? // @ts-ignore
              new Date(a.meetDate) - new Date(b.meetDate)
            : // @ts-ignore
              new Date(b.meetDate) - new Date(a.meetDate),
        )
    )
  }, [clients, searchQuery, filterClientType, filterClientStatus, filterDateOrder, filterMeetingFrequency])

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage)
  const currentClients = filteredClients.slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)

  const clientTypeOptions = [
    { value: 'Нет', label: 'Нет' },
    { value: 'Взрослый', label: 'Взрослый' },
    { value: 'Пара', label: 'Пара' },
    { value: 'Ребенок', label: 'Ребенок' },
  ]

  const clientStatusOptions = [
    { value: 'Нет', label: 'Нет' },
    { value: 'Онлайн', label: 'Онлайн' },
    { value: 'Офлайн', label: 'Офлайн' },
    { value: 'Заявка', label: 'Заявка' },
    { value: 'Завершён', label: 'Завершён' },
  ]

  const dateOrderOptions = [
    { value: 'Нет', label: 'Нет' },
    { value: 'Раньше', label: 'Раньше' },
  ]

  const meetingFrequencyOptions = [
    { value: 'Нет', label: 'Нет' },
    { value: 'Чаще', label: 'Чаще' },
    { value: 'Реже', label: 'Реже' },
  ]

  const iconMap = {
    Пара: PairIcon,
    Взрослый: HumanIcon,
    Ребенок: ChildrenIcon,
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // @ts-ignore
  return (
    <div className="w-full h-full rounded-[6px] bg-white px-10 pt-[30px]">
      <Heading title="Клиенты" />
      <div className="flex flex-col items-start mb-4 mt-[10px]">
        <div className="relative flex flex-row">
          <Input
            type="text"
            placeholder="Поиск по клиентам"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
            iconSrc={SearchUserIcon}
          />
          <div className="flex flex-row items-center ml-[17px]">
            <Image src={FilterIcon} alt="filter" width={13} height={13} />
            <div className="ml-[5px]">Фильтр:</div>
            <Select
              value={filterClientStatus}
              onChange={(selectedOption) =>
                setFilterClientStatus(
                  selectedOption || {
                    value: 'Нет',
                    label: 'Нет',
                  },
                )
              }
              options={clientStatusOptions}
              className="ml-4 w-[100px]"
              placeholder="Статус клиента"
              styles={{
                indicatorSeparator: () => ({ display: 'none' }),
              }}
              components={{ DropdownIndicator }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="text-[12px]">Сортировать по дате последней встречи</div>
        <Select
          value={filterDateOrder}
          onChange={(selectedOption) =>
            setFilterDateOrder(
              selectedOption || {
                value: 'Нет',
                label: 'Нет',
              },
            )
          }
          options={dateOrderOptions}
          className="w-[100px] text-[12px] ml-2"
          placeholder="Дата встречи"
          styles={{
            indicatorSeparator: () => ({ display: 'none' }),
          }}
          components={{ DropdownIndicator }}
        />

        <div className="flex items-center ml-5">
          <div className="text-[12px]">По интенсивности встреч</div>
          <Select
            value={filterMeetingFrequency}
            onChange={(selectedOption) =>
              setFilterMeetingFrequency(
                selectedOption || {
                  value: 'Нет',
                  label: 'Нет',
                },
              )
            }
            options={meetingFrequencyOptions}
            className="ml-2 w-[80px] text-[12px]"
            placeholder="Интенсивность встреч"
            styles={{
              indicatorSeparator: () => ({ display: 'none' }),
            }}
            components={{ DropdownIndicator }}
          />
        </div>

        <div className="flex items-center ml-5">
          <div className="text-[12px]">Тип клиента</div>
          <Select
            value={filterClientType}
            onChange={(selectedOption) =>
              setFilterClientType(
                selectedOption || {
                  value: 'Нет',
                  label: 'Нет',
                },
              )
            }
            options={clientTypeOptions}
            className="ml-2 w-[100px] text-[12px]"
            placeholder="Тип клиента"
            styles={{
              indicatorSeparator: () => ({ display: 'none' }),
            }}
            components={{ DropdownIndicator }}
          />
        </div>
      </div>
      <div>
        {currentClients.map((client) => (
          <div
            key={
              //@ts-ignore
              client.personId
            }
            className="border-t border-[#6A6A6A] py-[10px]">
            <div className="flex justify-between items-start">
              <div>
                <h2
                  onClick={(): void => handleClick(client)}
                  className="text-[18px] font-semibold underline text-orange mb-[10px] cursor-pointer">
                  {
                    //@ts-ignore
                    client.fullName
                  }
                </h2>
                <div className="font-montserrat flex gap-[5px]">
                  <div
                    className={`text-[11px] px-[11px] rounded-[4px] ${
                      //@ts-ignore
                      client.clientStatus === 'Онлайн' ? 'bg-[#CFEFFD]' : 'bg-[#FDDCC6]'
                    }`}>
                    {
                      //@ts-ignore
                      client.clientStatus
                    }
                  </div>
                  <div className="text-[11px] bg-[#E4E4E4] px-[11px] rounded-[4px]">
                    {
                      //@ts-ignore
                      client.meetingType
                    }
                  </div>
                  <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px]">
                    Всего встреч:
                    <div className="text-black">
                      {
                        //@ts-ignore
                        client.countMeet
                      }
                    </div>
                  </div>
                  <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px]">
                    Последняя:{' '}
                    <div className="text-black">
                      {
                        //@ts-ignore
                        client.meetDate
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-1/3">
                <div className="flex flex-row align-center items-start text-[11px] gap-[8px]">
                  <div className="flex flex-row items-center bg-[#E4E4E4] px-[12px] py-[3px] rounded-[30px] gap-[4px]">
                    <Image
                      src={
                        //@ts-ignore
                        iconMap[client.clientType] || HumanIcon
                      }
                      alt="logo"
                      width={8}
                      height={8}
                    />
                    {
                      //@ts-ignore
                      client.clientType
                    }
                  </div>
                  <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px] mt-[4px]">
                    {' '}
                    Возраст:{' '}
                    <div className="text-black">
                      {
                        //@ts-ignore
                        client.years
                      }
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center  text-[11px] px-[12px] py-[3px] rounded-[30px] gap-[4px]">
                    <Image src={PhoneIcon} alt="logo" width={12} height={12} />
                    {
                      //@ts-ignore
                      client.phone
                    }
                  </div>
                  <div className="flex flex-row items-center text-[11px] underline px-[12px] py-[3px] rounded-[30px] gap-[4px]">
                    <Image src={MailIcon} alt="logo" width={12} height={12} />
                    {
                      //@ts-ignore
                      client.mail
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="bottom-[30px] left-[50%] right-[50%]">
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
    </div>
  )
}

export default Clients
