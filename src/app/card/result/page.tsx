import { Calendar } from '@/app/calendar/Calendar'
import { Wrapper } from '@/components/wrapper'
import { Result } from '@/app/card/result/result'

export default function ResultPage() {
  return (
    <Calendar>
      <Wrapper>
        <Result />
      </Wrapper>
    </Calendar>
  )
}
