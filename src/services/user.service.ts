import {axiosWithAuth} from "@/api/interceptors";

export const userService = {
    async userList(data:any): Promise<any> {
        return await axiosWithAuth.get('/users', data);
    },
    async createUser(data:any): Promise<any> {
      return await axiosWithAuth.post('/users', data);
    },
    async searchPerson(personName: string ): Promise<any> {
        return await axiosWithAuth.get(`/api/v1/General/searchPersons/${personName}/10/0`);
    }
}