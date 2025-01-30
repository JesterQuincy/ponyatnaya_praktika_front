import { axiosWithAuth } from '@/api/interceptors'
import { IAccount } from '@/types/account'

export const accountService = {
  async updateAccount(data: IAccount) {
    return await axiosWithAuth.put('/api/user', data)
  },
  async getAccount() {
    const { data } = await axiosWithAuth.get<IAccount>('/api/user/get')
    return data
  },
}
