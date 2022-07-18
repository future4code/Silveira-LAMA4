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
exports.ShowBusiness = void 0;
const Show_1 = require("../model/Show");
const User_1 = require("../model/User");
class ShowBusiness {
    constructor(showDatabase, bandDatabase, idGenerator, authenticator) {
        this.showDatabase = showDatabase;
        this.bandDatabase = bandDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    createShow(input, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const Token = this.authenticator.getData(token);
            if (Token.role !== User_1.UserRole.ADMIN) {
                throw new Error("Only admins can access this featured!");
            }
            if (!input.id_band || !input.start_time || !input.end_time || !input.Wday) {
                throw new Error("Invalid input to create show!");
            }
            if (input.start_time < 8 || input.end_time > 23 || input.start_time >= input.end_time) {
                throw new Error("Invalid time to crete show!");
            }
            if (!Number.isInteger(input.start_time) || !Number.isInteger(input.end_time)) {
                throw new Error("Times should be integer to create show!");
            }
            const band = yield this.bandDatabase.getBandDetails(input.id_band);
            if (!band) {
                throw new Error("Band not found");
            }
            const registeredShows = yield this.showDatabase.getShowsByTimes(input.Wday);
            if (registeredShows.length) {
                throw new Error("No more shows can be created at this time!");
            }
            yield this.showDatabase.createShow(Show_1.Show.toShow(Object.assign(Object.assign({}, input), { id: this.idGenerator.generate() })));
        });
    }
    getShowsByTimes(Wday) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.showDatabase.getShowsByTimes(Wday);
            if (!result || result.length < 0) {
                throw new Error("please place a valid day.");
            }
            return result;
        });
    }
    getShowDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            const show = new Show_1.Show("01", Show_1.Weekday.SEXTA, "", 0, 0);
            const result1 = yield this.showDatabase.getShowDetail(show.getBandId);
            return result1;
        });
    }
}
exports.ShowBusiness = ShowBusiness;
