import { Band } from "../model/Band";
import { Show, ShowOutputDTO, Weekday } from "../model/Show";
import { BandDatabase } from "./BandDatabase";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
    private static TABLE_BAND = "Bands";

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


    public async getShowsByTimes(Wday: Weekday): Promise<ShowOutputDTO[]> {

        const Shows = await this.getConnection()
            .select("*")
            .where(Wday)
            .from(this.tableNames.shows)

        return Shows.map((show: any) => {
            return {
                id: show.id,
                id_band: show.id_band,
                start_time: show.start_time,
                end_time: show.end_time,
                Wday: show.Wday
            }
        })
    }
    public getShowDetail = async ( input: string ): Promise<Band> => {
        try {
          const result = await this.getConnection()
            .select("name", "music_genre")
            .from(ShowDatabase.TABLE_BAND)
            .where({ id: input })
            
          return Band.toBand(result[0]);
        } 
        catch (error) {
          throw new Error(error.sqlMessage || error.message);
        };
      };
    };
}

//.where("end_time", ">", `${start_time}`)
//.andWhere("start_time", "<", `${end_time}`)