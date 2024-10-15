import { axiosWithAuth} from "@/api/interceptors";


export const clientService = {
    async getClientByName(limit: number, offset: number, personName: string): Promise<any> {
        return await axiosWithAuth.get(`/api/v1/General/searchPersons/${offset}/${limit}`);
    },
    async getClientById(id: number): Promise<any> {
        return await axiosWithAuth.get(`/api/customer/get/${id}`);
    },

    async getUserMeets(limit: number, offset: number, personId: number): Promise<any> {
        return await axiosWithAuth.get(`/api/v1/General/searchMeet/${personId}/${offset}/${limit}`);
    },
};
