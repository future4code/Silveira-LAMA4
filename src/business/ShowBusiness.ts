import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInputDTO, Weekday } from "../model/Show";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {

    constructor(
        private showDatabase: ShowDatabase,
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private show: Show
    ) {}

    async createShow(input: ShowInputDTO, token: string) {

        const Token = this.authenticator.getData(token)

        if (Token.role !== UserRole.ADMIN) {
            throw new Error("Only admins can access this featured!")
        }

        if (!input.id_band || !input.start_time || !input.end_time || !input.Wday) {
            throw new Error("Invalid input to create show!")
        }

        if (input.start_time < 8 || input.end_time > 23 || input.start_time >= input.end_time) {
            throw new Error("Invalid time to crete show!")
        }

        if (!Number.isInteger(input.start_time) || !Number.isInteger(input.end_time)) {
            throw new Error("Times should be integer to create show!")
        }

        const band = await this.bandDatabase.getBandDetails(input.id_band)

        if (!band) {
            throw new Error("Band not found")
        }

        const registeredShows = await this.showDatabase.getShowsByTimes(input.Wday)

        if(registeredShows.length) {
            throw new Error("No more shows can be created at this time!")
        }

        await this.showDatabase.createShow(
            Show.toShow({
                ...input,
                id: this.idGenerator.generate()
            })
        )
        
        }
        async getShowsByTimes(Wday:Weekday) {

            const result = await this.showDatabase.getShowsByTimes(Wday)

            
           

            if(!result || result.length<0){
                throw new Error("please place a valid day.")
            }
            
            
            return result 
       }



        async getShowDetail(){
 
            const result1 = await this.showDatabase.getShowDetail(this.show.getBandId as any) 
        
            return result1

        }

}