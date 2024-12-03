'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import { calendarService } from '@/services/calendar.service'
import styles from '@/styles/calendarheader.module.css'
import { customStyles } from '@/constants/customStyles'

interface Option {
  value: number
  label: string
}

// @ts-ignore
export default function Header({ onOpenModal, onOpenModalMeet }) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [options, setOptions] = useState<Option[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const fetchClients = async (inputValue: string) => {
    setIsLoading(true)
    try {
      const response = await calendarService.getUsersByName(inputValue)
      const data = response.data
      const formattedOptions = data.map((client: { personId: number; fullName: string }) => ({
        value: client.personId,
        label: client.fullName,
      }))
      setOptions(formattedOptions)
    } catch (error) {
      console.error('Ошибка при поиске клиентов:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (inputValue: string) => {
    if (inputValue.trim()) {
      fetchClients(inputValue)
    }
  }

  const handleChange = (selected: Option | null) => {
    setSelectedOption(selected)
    if (selected) {
      router.push(`/card/${selected.value}`)
    }
  }

  return (
    <div className={styles.MainContainer}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        isLoading={isLoading}
        styles={customStyles}
        placeholder="Найти клиента"
        className="w-full max-w-xs"
        isSearchable
      />
      <div className={styles.buttonsGroup}>
        <button onClick={onOpenModal} className={styles.addClient}>
          Добавить клиента
        </button>
        <button className={styles.newEvent} onClick={onOpenModalMeet}>
          Назначить встречу
        </button>
        <button className={styles.addDayOff}>Нерабочие дни</button>
      </div>
    </div>
  )
}
