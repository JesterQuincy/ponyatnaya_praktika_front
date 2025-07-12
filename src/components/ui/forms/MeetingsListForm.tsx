'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { useMeet } from '@/app/context/meetContext'
import TripleDots from '@/public/icon/tripleDots.svg'

import { Button } from '../buttons/Button'
import { Pagination } from '../Pagination'
import { DropdownMenu } from './DropDownMenu'

import { clientService } from '@/services/clients.service'
import { useGetProjMethodsByCustomerId } from '@/api/hooks/methods/useGetProjMethodsByCustomerId'
import { Spinner } from '@/components/Spinner'
import { ViewMethodicModal } from '@/components/ui/forms/MeetForm/modals/components'
import { useGetTypePhoto } from '@/api/hooks/photoMethods/useGetTypePhoto'
import { toast } from 'react-toastify'
import { IMethod, IPhotoProjectiveMethod } from '@/types/methods/meetMethods'

interface IMethodState {
  methodId: number
  photos: IPhotoProjectiveMethod[]
}

interface ICardFormProps {
  user: any
}

export function MeetingsListForm({ user }: ICardFormProps) {
  const router = useRouter()
  const params = useParams()

  const id = useMemo(() => {
    const { id } = params
    return typeof id === 'string' ? id : undefined
  }, [params])

  const { setMeet } = useMeet()

  const [currentPage, setCurrentPage] = useState(1)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [meetsList, setMeetsList] = useState<any[]>([]) // Состояние для хранения встреч
  const [showAll, setShowAll] = useState(false)
  const [method, setMethod] = useState<IMethodState | null>(null)
  const [loadingMethodId, setLoadingMethodId] = useState<number | null>(null) // Состояние для отслеживания загружающегося метода

  const { data: projMethods, isLoading: isProjMethodsLoading } = useGetProjMethodsByCustomerId(id ?? '')
  const { mutateAsync: typePhotos } = useGetTypePhoto()

  const itemsPerPage = 7
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  useEffect(() => {
    clientService
      .getUserMeets(0, 150, user.id)
      .then((response) => {
        setMeetsList(response.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении встреч:', error)
      })
  }, [user?.id])

  const currentMeets = meetsList.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(meetsList.length / itemsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleClick = (meet: any): void => {
    setMeet(meet)
    router.push(`/meet?id=${meet.id}`)
  }

  const handleDropdownToggle = (id: number) => {
    if (activeDropdown === id) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(id)
    }
  }

  const handleMethodClick = async (item: IMethod) => {
    setLoadingMethodId(item.id)

    try {
      const photos = await typePhotos({ customerId: user.id, typeMethodId: item.id })

      setMethod(() => ({ methodId: item.id, photos }))
    } catch {
      toast.error('Произошла ошибка')
    } finally {
      setLoadingMethodId(null)
    }
  }

  const visibleMetodics = showAll ? projMethods?.data : projMethods?.data?.slice(0, 5)

  return (
    <div className="flex gap-[15px]">
      <div className="bg-[#F1F1F1] w-[60%] px-[16px] py-[25px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px] flex flex-col gap-[25px] relative">
        {currentMeets.map((meet) => (
          <div key={meet.id} className="bg-white rounded-[6px] flex gap-[10px] px-[10px] py-[11px] relative">
            <div className="flex flex-col gap-[4px]">
              <span
                onClick={(): void => handleClick(meet)}
                className="text-[#EA660C] text-[22px] underline underline-offset-[2.5px] cursor-pointer">
                {meet.nameMeet}
              </span>
              <span className="text-[12px] flex gap-[5px]">
                <span className="text-[#7E7E7E]">Дата:</span>
                <span className="font-semibold">{meet.dateMeet}</span>
              </span>
            </div>
            <div className="flex flex-col gap-[5px]">
              <div className="flex gap-[5px] items-center">
                <span
                  className={
                    meet.status === 'Онлайн'
                      ? 'bg-[#CFEFFD] max-w-fit rounded-[4px] text-[13px] px-[11px] py-[5px]'
                      : 'bg-[#FDDCC6] max-w-fit rounded-[4px] text-[13px] px-[11px] py-[5px]'
                  }>
                  {meet.formatMeet}
                </span>
              </div>
              <span className="text-[13px]">{meet.clientSessionRequest}</span>
            </div>
            <Button
              onClick={() => handleDropdownToggle(meet.id)}
              className="absolute bg-[#E4E4E4] right-[20px] text-[#7E7E7E] text-[20px] flex items-center p-[10px] rounded-[6px]">
              <Image src={TripleDots} alt="TripleDots" />
            </Button>
            <div>
              {activeDropdown === meet.id && <DropdownMenu id={meet.id} onClose={() => setActiveDropdown(null)} />}
            </div>
          </div>
        ))}
        <div className="absolute  bottom-[30px] left-[50%] right-[50%]">
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
      <div className="bg-[#F1F1F1] w-[40%] rounded-[4px] py-[25px] px-[11px]">
        {isProjMethodsLoading && <Spinner />}
        {!isProjMethodsLoading && !!projMethods?.data?.length && (
          <div>
            <span className="font-bold text-[20px]">Проективные методики</span>
            <div className="flex flex-col gap-[10px] mt-[10px]">
              {visibleMetodics?.map((item) => (
                <div key={item.id} className="bg-white rounded-[6px] p-[5px] flex items-center gap-[10px] pl-4">
                  <span
                    className="text-[15px] hover:underline cursor-pointer"
                    onClick={() => {
                      return handleMethodClick(item)
                    }}>
                    {item.nameMethod}
                  </span>
                  {loadingMethodId === item.id && <Spinner />}
                </div>
              ))}
            </div>
            {!showAll && projMethods?.data?.length > 5 && (
              <div className="mt-[9px]">
                <Button
                  className="border border-[#D9D9D9] px-[10px] py-[5px] rounded-[6px]"
                  onClick={() => {
                    setShowAll(true)
                  }}>
                  Ещё
                </Button>
              </div>
            )}
          </div>
        )}
        <div className="mt-[27px]">
          <span className="font-bold text-[20px]">Основные терапевтические гипотезы</span>
          <div className="mt-[5px]">
            <textarea className="border border-[#D9D9D9] rounded-[6px] w-[90%] min-h-[110px]" />
          </div>
        </div>
      </div>
      {method && (
        <ViewMethodicModal
          id={method.methodId}
          onClose={() => setMethod(null)}
          isOpen={!!method}
          allPhotos={method.photos}
        />
      )}
    </div>
  )
}
