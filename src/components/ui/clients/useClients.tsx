import { useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetClients } from '@/api/hooks/customer/useGetClients'
import { IClientsState } from '@/components/ui/clients/types'
import { EMPTY_OPTS_KEY, INITIAL_STATE } from '@/components/ui/clients/consts'

export const useClients = () => {
  const [clientsState, setClientsState] = useState<IClientsState>(INITIAL_STATE)

  const debouncedName = useDebounce(clientsState.filters.customerName, 500)

  const queryBody = useMemo(() => {
    const { filters } = clientsState

    return Object.fromEntries(
      Object.entries({ ...filters, customerName: debouncedName }).filter(([key, value]) => {
        if (key === 'customerName' && typeof value === 'string') {
          return value.trim().length >= 3
        }

        return value !== EMPTY_OPTS_KEY && value !== ''
      }),
    )
  }, [clientsState, debouncedName])

  const {
    data: clients,
    isLoading,
    isFetching,
    isPending,
  } = useGetClients({
    params: {
      limit: clientsState.pagination.pageSize,
      offset: clientsState.pagination.currentPage,
    },
    queryBody,
  })

  const handleFilterChange = useCallback((key: keyof IClientsState['filters'], value: string) => {
    setClientsState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        [key]: value,
      },
    }))
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setClientsState((prevState) => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        currentPage: page - 1,
      },
    }))
  }, [])

  const isLoadingClients = isLoading || isFetching || isPending

  return {
    clients,
    filters: clientsState.filters,
    pagination: clientsState.pagination,
    handleFilterChange,
    handlePageChange,
    isLoadingClients,
  }
}
