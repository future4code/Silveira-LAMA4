"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowDatabase = void 0;
const Band_1 = require("../model/Band");
const BaseDatabase_1 = require("./BaseDatabase");
class ShowDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getShowDetail = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("name", "music_genre")
                    .from(ShowDatabase.TABLE_BAND)
                    .where({ id: input });
                return Band_1.Band.toBand(result[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
            ;
        });
    }
    createShow(show) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id: show.getId(),
                band_id: show.getBandId(),
                start_time: show.getStartTime(),
                end_time: show.getEndTime(),
                week_day: show.getWeekDay()
            })
                .into(this.tableNames.shows);
        });
    }
    getShowsByTimes(Wday) {
        return __awaiter(this, void 0, void 0, function* () {
            const Shows = yield this.getConnection()
                .select("*")
                .where(Wday)
                .from(this.tableNames.shows);
            return Shows.map((show) => {
                return {
                    id: show.id,
                    id_band: show.id_band,
                    start_time: show.start_time,
                    end_time: show.end_time,
                    Wday: show.Wday
                };
            });
        });
    }
}
exports.ShowDatabase = ShowDatabase;
ShowDatabase.TABLE_BAND = "Bands";
;
//.where("end_time", ">", `${start_time}`)
//.andWhere("start_time", "<", `${end_time}`)
