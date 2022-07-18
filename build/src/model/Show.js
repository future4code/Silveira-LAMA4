"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weekday = exports.Show = void 0;
class Show {
    constructor(id, weekDay, bandId, startTime, endTime) {
        this.id = id;
        this.weekDay = weekDay;
        this.bandId = bandId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    getId() {
        return this.id;
    }
    getWeekDay() {
        return this.weekDay;
    }
    getBandId() {
        return this.bandId;
    }
    getStartTime() {
        return this.startTime;
    }
    getEndTime() {
        return this.endTime;
    }
    setWeekDay(weekDay) {
        this.weekDay = weekDay;
    }
    setStartTime(startTime) {
        this.startTime = startTime;
    }
    setEndTime(endTime) {
        this.endTime = endTime;
    }
    static toWeekDayEnum(data) {
        switch (data) {
            case "SEXTA":
                return Weekday.SEXTA;
            case "SÁBADO":
                return Weekday.SABADO;
            case "DOMINGO":
                return Weekday.DOMINGO;
            default:
                throw new Error("Invalid weekDay");
        }
    }
    static toShow(data) {
        return (data && new Show(data.id, Show.toWeekDayEnum(data.weekDay || data.week_day), data.bandId || data.band_id, data.startTime || data.start_time, data.endTime || data.end_time));
    }
}
exports.Show = Show;
var Weekday;
(function (Weekday) {
    Weekday["SEXTA"] = "SEXTA";
    Weekday["SABADO"] = "S\u00C1BADO";
    Weekday["DOMINGO"] = "DOMINGO";
})(Weekday = exports.Weekday || (exports.Weekday = {}));
