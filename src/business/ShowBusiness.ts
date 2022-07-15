import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInputDTO } from "../model/Show";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {

    constructor(
        private showDatabase: ShowDatabase,
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}

    async createShow(input: ShowInputDTO, token: string) {

        const Token = this.authenticator.getTokenData(token)

        if (Token.role !== UserRole.ADMIN) {
            throw new Error("Only admins can access this featured!")
        }

        if (!input.bandId || !input.startTime || !input.endTime || !input.weekDay) {
            throw new Error("Invalid input to create show!")
        }

        if (input.startTime < 8 || input.endTime > 23 || input.startTime >= input.endTime) {
            throw new Error("Invalid time to crete show!")
        }

        if (!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)) {
            throw new Error("Times should be integer to create show!")
        }

        const band = await this.bandDatabase.getBandDetails(input.bandId)

        if (!band) {
            throw new Error("Band not found")
        }

        const registeredShows = await this.showDatabase.getShowsByTimes(input.weekDay, input.startTime, input.endTime)

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
}