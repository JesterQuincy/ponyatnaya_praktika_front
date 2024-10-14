import { axiosWithAuth} from "@/api/interceptors";


export const clientService = {
    async getClientByName(limit: number, offset: number, personName: string): Promise<any> {
        return await axiosWithAuth.get(`/api/v1/General/searchPersons/${offset}/${limit}`);
    },
};