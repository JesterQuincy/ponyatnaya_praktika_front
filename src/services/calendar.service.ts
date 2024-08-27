import {axiosClassic} from "@/api/interceptors";
import {UserMeeting} from "@/types/calendar.types";

export const calendarService = {
    async createMeeting(data: UserMeeting): Promise<any> {
        const response = await axiosClassic.post('meet', data)
        return response;
    },
    async getMeetingById(id: number): Promise<any> {
        const response = await axiosClassic.get(`meet/get/${id}`)
        return response;
    },
    async deleteMeeting(id: number): Promise<any> {
        await axiosClassic.delete(`meet/${id}`)
    },
    async createUser(data: UserMeeting): Promise<any> {
        const response = await axiosClassic.post('customer', data)
        return response;
    },
    async getUserById(id: number): Promise<any> {
        const response = await axiosClassic.get(`customer/get/${id}`)
        return response;
    },
    async createChild(data: UserMeeting): Promise<any> {
        const response = await axiosClassic.post('child', data)
        return response;
    }

}