import { Calendar } from '@/app/calendar/Calendar'
import { Wrapper } from '@/components/wrapper'
import { ResultWithSuspense } from '@/app/card/result/result'

export default function ResultPage() {
  return (
    <Calendar>
      <Wrapper>
        <ResultWithSuspense />
      </Wrapper>
    </Calendar>
  )
}
