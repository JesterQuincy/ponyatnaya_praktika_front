import {axiosWithAuth} from "@/api/interceptors";


export const meetingService = {
    async getMeetingInfo(data: any): Promise<any> {
        const response = await axiosWithAuth.get('meet/',data)
    },
    async createMeetingId(data: any): Promise<any> {
        await axiosWithAuth.post('meet/',data)
    },
    async deleteMeeting(id: number): Promise<any> {
      await axiosWithAuth.delete(`meet/delete/${id}`)
    }

}