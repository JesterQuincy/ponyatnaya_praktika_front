import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { profileLinkService } from '@/services/profile-link.service'
import { BASE_HOST } from '@/api/interceptors'

export function useGetLink(id: string | number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['link', id],
    mutationFn: (id: string) => profileLinkService.getLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['link'] })
    },
  })
}
