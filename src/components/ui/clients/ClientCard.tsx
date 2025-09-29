import { FC, useState } from 'react'
import Image from 'next/image'
import { IGetClientsBySearchResponseBody } from '@/types/clients'
import HumanIcon from '@/public/icon/humanIcon.svg'
import PhoneIcon from '@/public/icon/telephoneIcon.svg'
import MailIcon from '@/public/icon/mailIcon.svg'
import { ICON_MAP } from '@/components/ui/clients/consts'
import { Button } from '../buttons/Button'
import TripleDots from '@/public/icon/tripleDots.svg'
import { DropdownMenu } from '../forms/DropDownMenu'
import { useDeleteCustomer } from '@/api/hooks/customer/useDeleteCustomer'
import dayjs from 'dayjs'

interface IClientCardProps {
  client: IGetClientsBySearchResponseBody
  onClientClick: (client: IGetClientsBySearchResponseBody) => void
}

export const ClientCard: FC<IClientCardProps> = ({ client, onClientClick }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const statusColor = client.clientStatus === 'Онлайн' ? 'bg-[#CFEFFD]' : 'bg-[#FDDCC6]'
  const { mutate: deleteCustomer } = useDeleteCustomer()

  const handleDropdownToggle = (id: number) => {
    if (activeDropdown === id) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(id)
    }
  }

  return (
    <div className="border-t border-[#6A6A6A] py-[10px]">
      <div className="flex items-start">
        <div>
          <h2
            onClick={() => onClientClick(client)}
            className="text-[18px] font-semibold underline text-orange mb-[10px] cursor-pointer">
            {client.fullName}
          </h2>
          <div className="font-montserrat flex gap-[5px] flex-wrap">
            <div className={`text-[11px] px-[11px] rounded-[4px] ${statusColor}`}>{client.clientStatus}</div>
            <div className="text-[11px] bg-[#E4E4E4] px-[11px] rounded-[4px]">{client.meetingType}</div>
            <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px]">
              Всего встреч: <div className="text-black">{client.countMeet}</div>
            </div>
            <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px]">
              Последняя:
              <div className="text-black">{client.meetDate ? dayjs(client.meetDate).format('DD-MM-YYYY') : '-'}</div>
            </div>
          </div>
        </div>

        <div className="ml-auto flex gap-8 w-[600px]">
          <div className="flex flex-row align-center items-start justify-between text-[11px] gap-[8px] w-[200px]">
            <div className="flex flex-row items-center bg-[#E4E4E4] px-[12px] py-[3px] rounded-[30px] gap-[4px]">
              <Image src={ICON_MAP[client.clientType] || HumanIcon} alt="Тип клиента" width={8} height={8} />
              {client.clientType}
            </div>
            <div className="text-[11px] text-[#E4E4E4] rounded-[4px] flex gap-[4px] mt-[4px] w-[80px]">
              Возраст: <div className="text-black">{client.years}</div>
            </div>
          </div>

          <div className="flex flex-col relative">
            <div className="flex flex-row items-center text-[11px] px-[12px] py-[3px] rounded-[30px] gap-[4px]">
              <Image src={PhoneIcon} alt="Телефон" width={12} height={12} />
              {client.phone}
            </div>
            <div className="flex flex-row items-center text-[11px] underline px-[12px] py-[3px] rounded-[30px] gap-[4px]">
              <Image src={MailIcon} alt="Почта" width={12} height={12} />
              {client.mail}
            </div>
          </div>
        </div>
        <div className="relative right-4">
          <Button
            onClick={() => handleDropdownToggle(client.customerId)}
            className=" w-7 bg-[#E4E4E4] text-[#7E7E7E] text-[20px] flex items-center p-[10px] rounded-[6px]">
            <Image src={TripleDots} alt="TripleDots" />
          </Button>
          {activeDropdown === client.customerId && (
            <DropdownMenu
              onClose={() => setActiveDropdown(null)}
              items={[
                {
                  label: 'Удалить',
                  key: 'delete',
                  onClick: () => deleteCustomer(client.customerId),
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}
