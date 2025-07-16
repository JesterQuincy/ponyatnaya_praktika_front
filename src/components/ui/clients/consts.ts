import { IClientsState } from '@/components/ui/clients/types'
import { EClientType } from '@/types/common'
import PairIcon from '@/public/icon/pair.svg'
import HumanIcon from '@/public/icon/humanIcon.svg'
import ChildrenIcon from '@/public/icon/childrenIcon.svg'

export const EMPTY_OPTS_KEY = 'EMPTY'

export const INITIAL_STATE: IClientsState = {
  pagination: {
    currentPage: 0,
    pageSize: 10,
  },
  filters: {
    clientStatus: EMPTY_OPTS_KEY,
    clientType: EMPTY_OPTS_KEY,
    meetingFormat: EMPTY_OPTS_KEY,
    orderDate: EMPTY_OPTS_KEY,
    orderMeetCount: EMPTY_OPTS_KEY,
    customerName: undefined,
  },
}

export const ICON_MAP: Record<EClientType, any> = {
  Пара: PairIcon,
  Взрослый: HumanIcon,
  Ребенок: ChildrenIcon,
}
