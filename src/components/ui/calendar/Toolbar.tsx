import { FC, MutableRefObject } from 'react'
import FullCalendar from '@fullcalendar/react'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface IToolbarProps {
  calRef: MutableRefObject<FullCalendar | null>
  title: string
}

export const Toolbar: FC<IToolbarProps> = ({ calRef, title }) => {
  const handlePrev = () => {
    calRef.current?.getApi().prev()
  }

  const handleNext = () => {
    calRef.current?.getApi().next()
  }

  const handleToday = () => {
    calRef.current?.getApi().today()
  }

  const handleMonth = () => {
    calRef.current?.getApi().changeView('dayGridMonth')
  }

  const handleWeek = () => {
    calRef.current?.getApi().changeView('timeGridWeek')
  }

  const handleDay = () => {
    calRef.current?.getApi().changeView('timeGridDay')
  }

  return (
    <div className={'flex items-center justify-between p-4'}>
      <div className={'flex gap-2'}>
        <Button variant={'secondary'} onClick={handlePrev}>
          <ChevronLeftIcon />
        </Button>
        <Button variant={'secondary'} onClick={handleNext}>
          <ChevronRightIcon />
        </Button>
        <Button variant={'secondary'} onClick={handleToday}>
          Сегодня
        </Button>
      </div>

      <h3 className={'text-2xl font-bold'}>{title}</h3>

      <ToggleGroup type="single" defaultValue={'month'}>
        <ToggleGroupItem onClick={handleDay} value="day" aria-label="day">
          День
        </ToggleGroupItem>
        <ToggleGroupItem onClick={handleWeek} value="week" aria-label="week">
          Неделя
        </ToggleGroupItem>
        <ToggleGroupItem onClick={handleMonth} value="month" aria-label="month">
          Месяц
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
