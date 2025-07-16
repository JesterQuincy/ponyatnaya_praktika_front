import {
  EClientStatus,
  EGetClientBySearchClientType,
  EMeetingFormat,
  EOrderDate,
  EOrderMeetCount,
} from '@/types/clients'
import { EMPTY_OPTS_KEY } from '@/components/ui/clients/consts'

export interface IClientsState {
  pagination: {
    currentPage: number
    pageSize: number
  }
  filters: {
    customerName?: string
    orderDate: EOrderDate | typeof EMPTY_OPTS_KEY
    orderMeetCount: EOrderMeetCount | typeof EMPTY_OPTS_KEY
    clientStatus: EClientStatus | typeof EMPTY_OPTS_KEY
    clientType: EGetClientBySearchClientType | typeof EMPTY_OPTS_KEY
    meetingFormat: EMeetingFormat | typeof EMPTY_OPTS_KEY
  }
}
