'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heading } from '@/components/ui/Heading'
import { components } from 'react-select'
import BottomArrow from '@/public/icon/bottomArrow.svg'
import { Pagination } from '@/components/ui/Pagination'
import { IGetClientsBySearchResponseBody } from '@/types/clients'
import { Spinner } from '@/components/Spinner'
import { ClientFilters } from '@/components/ui/clients/ClientsFilters'
import { ClientCard } from '@/components/ui/clients/ClientCard'
import { EmptyState } from '@/components/ui/clients/EmptyState'
import { useClients } from '@/components/ui/clients/useClients'

export const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={BottomArrow} alt="Dropdown icon" width={8} height={8} />
    </components.DropdownIndicator>
  )
}

export const Clients = () => {
  const router = useRouter()

  const { clients, filters, pagination, handleFilterChange, handlePageChange, isLoadingClients } = useClients()

  const handleRedirect = (client: IGetClientsBySearchResponseBody) => {
    router.push(`/card/${client.customerId}?clientType=${client.clientType}`)
  }

  return (
    <div className="w-full rounded-[6px]">
      <Heading title="Клиенты" />

      <ClientFilters filters={filters} onChange={handleFilterChange} />

      {isLoadingClients && !clients?.data.length && <Spinner classname={'h-full py-40'} />}

      {!isLoadingClients && clients?.data.length === 0 && (
        <EmptyState title="Клиенты не найдены" subtitle="Измените параметры фильтрации и попробуйте снова" />
      )}

      <div className={'h-full'}>
        {clients?.data.map((client) => (
          <ClientCard key={client.customerId} client={client} onClientClick={handleRedirect} />
        ))}
      </div>

      {!!clients?.data.length && (
        <Pagination
          currentPage={pagination.currentPage + 1}
          totalPages={clients?.pagination.totalPages || 0}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Clients
