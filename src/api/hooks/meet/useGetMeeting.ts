import { useQuery } from '@tanstack/react-query'
import { meetingService } from '@/services/meet.sevice'
import { toast } from 'react-toastify'
import { EInvalidationTags } from '@/api/hooks/constants'

export const useGetMeeting = (id: string) => {
  const query = useQuery({
    queryKey: [EInvalidationTags.MEET_ID],
    queryFn: () => meetingService.getMeetingById(id),
    enabled: !!id,
  })

  if (query.isError) {
    toast.error('Произошла ошибка')
  }

  return query
}