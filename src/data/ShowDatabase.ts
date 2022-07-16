import { Show, ShowOutputDTO, Weekday } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {

    public async createShow(show: Show): Promise<void> {

        await this.getConnection()
        .insert({
            id: show.getId(),
            band_id: show.getBandId(),
            start_time: show.getStartTime(),
            end_time: show.getEndTime(),
            week_day: show.getWeekDay()
        })
        .into(this.tableNames.shows)
    }


    public async getShowsByTimes(weekDay: Weekday, startTime: number, endTime: number): Promise<ShowOutputDTO[]> {

        const shows = await this.getConnection()
            .select("*")
            .where("end_time", ">", `${startTime}`)
            .andWhere("start_time", "<", `${endTime}`)
            .from(this.tableNames.shows)

        return shows.map((show: any) => {
            return {
                id: show.id,
                bandId: show.bandId,
                startTime: show.startTime,
                endTime: show.endTime,
                weekDay: show.weekDay
            }
        })
    }
}