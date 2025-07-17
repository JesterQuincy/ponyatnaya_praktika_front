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
import { IGetClientsBySearch } from '@/types/clients'
import { toast } from 'react-toastify'
import { Button } from '../buttons/Button'
import TripleDots from '@/public/icon/tripleDots.svg'
import { DropdownItemProps, DropdownMenu } from '../forms/DropDownMenu'
import { useDeleteCustomer } from '@/api/hooks/customer/useDeleteCustomer'

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
  const [clients, setClients] = useState<IGetClientsBySearch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const clientsPerPage = 8
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const deleteCustomer = useDeleteCustomer()

  const router = useRouter()

  const handleClick = (client: any): void => {
    router.push(`/card/${client.customerId}?clientType=${client.clientType}`)
  }

  async function fetchClients() {
    try {
      setIsLoading(true)
      const { data } = await clientService.getClientByName(
        clientsPerPage,
        (currentPage - 1) * clientsPerPage,
        searchQuery,
      )

      setClients(data)
    } catch {
      toast.error('Ошибка при загрузке клиентов')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDropdownToggle = (id: number) => {
    if (activeDropdown === id) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(id)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [currentPage, searchQuery])

  const filteredClients = useMemo(() => {
    return clients
      .filter((client) => {
        const matchesClientType = filterClientType.value === 'Нет' || client.clientType === filterClientType.value
        const matchesClientStatus =
          filterClientStatus.value === 'Нет' || client.meetingType === filterClientStatus.value
        const matchesFrequency =
          filterMeetingFrequency.value === 'Нет' ||
          filterMeetingFrequency.value === 'Чаще' ||
          filterMeetingFrequency.value === 'Реже'

        return matchesClientType && matchesClientStatus && matchesFrequency
      })
      .sort((a, b) => {
        if (filterMeetingFrequency.value === 'Чаще') {
          return b.countMeet - a.countMeet
        } else if (filterMeetingFrequency.value === 'Реже') {
          return a.countMeet - b.countMeet
        } else {
          return 0
        }
      })
      .sort((a, b) => {
        const dateA = a.meetDate ? new Date(a.meetDate).getTime() : null
        const dateB = b.meetDate ? new Date(b.meetDate).getTime() : null

        if (filterDateOrder.value === 'Раньше') {
          if (dateA === null && dateB === null) return 0
          if (dateA === null) return 1
          if (dateB === null) return -1

          return dateA - dateB
        } else if (filterDateOrder.value === 'Позже') {
          if (dateA === null && dateB === null) return 0
          if (dateA === null) return 1
          if (dateB === null) return -1

          return dateB - dateA
        } else {
          return 0
        }
      })
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

  const iconMap: { [key: string]: any } = {
    Пара: PairIcon,
    Взрослый: HumanIcon,
    Ребенок: ChildrenIcon,
  }

  const dropDownItems: DropdownItemProps[] = [{ onClick: (id) => deleteCustomer.mutate(id), label: 'Удалить' }]

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="w-full rounded-[6px]">
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
          <div key={client.customerId} className="border-t border-[#6A6A6A] py-[10px] relative">
            <div className="flex justify-between items-start">
              <div>
                <h2
                  onClick={(): void => handleClick(client)}
                  className="text-[18px] font-semibold underline text-orange mb-[10px] cursor-pointer">
                  {client.fullName}
                </h2>
                <div className="font-montserrat flex gap-[5px]">
                  <div
                    className={`text-[11px] px-[11px] rounded-[4px] ${
                      client.clientStatus === 'Онлайн' ? 'bg-[#CFEFFD]' : 'bg-[#FDDCC6]'
                    }`}>
                    {client.clientStatus}
                  </div>
                  <div className="text-[11px] bg-[#E4E4E4] px-[11px] rounded-[4px]">{client.meetingType}</div>
                  <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px]">
                    Всего встреч:
                    <div className="text-black">{client.countMeet}</div>
                  </div>
                  <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px]">
                    Последняя: <div className="text-black">{client.meetDate}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-1/3">
                <div className="flex flex-row align-center items-start text-[11px] gap-[8px]">
                  <div className="flex flex-row items-center bg-[#E4E4E4] px-[12px] py-[3px] rounded-[30px] gap-[4px]">
                    <Image src={iconMap[client.clientType] || HumanIcon} alt="logo" width={8} height={8} />
                    {client.clientType}
                  </div>
                  <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px] mt-[4px]">
                    {' '}
                    Возраст: <div className="text-black">{client.years}</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center  text-[11px] px-[12px] py-[3px] rounded-[30px] gap-[4px]">
                    <Image src={PhoneIcon} alt="logo" width={12} height={12} />
                    {client.phone}
                  </div>
                  <div className="flex flex-row items-center text-[11px] underline px-[12px] py-[3px] rounded-[30px] gap-[4px]">
                    <Image src={MailIcon} alt="logo" width={12} height={12} />
                    {client.mail}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleDropdownToggle(client.customerId)}
                className="absolute bg-[#E4E4E4] right-[20px] text-[#7E7E7E] text-[20px] flex items-center p-[10px] rounded-[6px]">
                <Image src={TripleDots} alt="TripleDots" />
              </Button>
              <div>
                {activeDropdown === client.customerId && (
                  <DropdownMenu
                    onClose={() => setActiveDropdown(null)}
                    items={dropDownItems}
                    customerId={client.customerId}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)' }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      </div>
    </div>
  )
}

export default Clients
