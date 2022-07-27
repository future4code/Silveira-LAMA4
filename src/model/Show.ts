

export class Show {

    constructor(
        private id: string,
        private weekDay: Weekday,
        private bandId: string,
        private startTime: number,
        private endTime: number
    ) {}

    public getId(): string {
        return this.id
    }

    public getWeekDay(): Weekday {
        return this.weekDay
    }

    public getBandId(): string {
        return this.bandId
    }

    public getStartTime(): number {
        return this.startTime
    }

    public getEndTime(): number {
        return this.endTime
    }

    public setWeekDay(weekDay: Weekday) {
        this.weekDay = weekDay
    }

    public setStartTime(startTime: number) {
        this.startTime = startTime
    }

    public setEndTime(endTime: number) {
        this.endTime = endTime
    }

    public static toWeekDayEnum(data?: any): Weekday {
        switch(data) {
            case "SEXTA":
                return Weekday.SEXTA
            case "SÁBADO":
                return Weekday.SABADO
            case "DOMINGO":
                return Weekday.DOMINGO
            default:
                throw new Error("Invalid weekDay")
        }
    }

    public static toShow(data?: any) {
        return (data && new Show(
            data.id,
            Show.toWeekDayEnum(data.weekDay || data.week_day),
            data.bandId || data.band_id,
            data.startTime || data.start_time,
            data.endTime || data.end_time
        ))
    }
}

export enum Weekday {
    SEXTA = "SEXTA",
    SABADO = "SÁBADO",
    DOMINGO = "DOMINGO"
}

export interface ShowInputDTO {
    id_band: string,
    Wday: Weekday,
    start_time: number,
    end_time: number
}

export interface ShowOutputDTO {
    id: string,
    id_band: string,
    Wday: Weekday,
    start_time: number,
    end_time: number,
    mainGenre?: string,
    bandName?: string
}