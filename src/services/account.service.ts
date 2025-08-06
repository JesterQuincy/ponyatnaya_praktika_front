import { axiosWithAuth } from '@/api/interceptors'
import { IAccount, IUserInfo } from '@/types/account'

export const accountService = {
  async updateAccount(data: IAccount) {
    return await axiosWithAuth.put('/api/user', data)
  },

  async getAccount() {
    const { data } = await axiosWithAuth.get<IAccount>('/api/user/get')
    return data
  },

  async getUserInfo() {
    return await axiosWithAuth.get<IUserInfo>(`/api/v1/General/leftMenu/userInfo`)
  },
}
