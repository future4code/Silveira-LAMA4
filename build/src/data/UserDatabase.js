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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../model/User");
const Band_1 = require("../model/Band");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.signUp = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: user.getId,
                    name: user.getName,
                    email: user.getEmail,
                    password: user.getPassword
                }).into(UserDatabase.TABLE_USER);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("erro desconhecido");
                }
            }
        });
        this.insertBandDB = (band) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: band.getId(),
                    name: band.getName(),
                    music_genre: band.getMusicGenre(),
                    responsible: band.getResponsible()
                })
                    .into(UserDatabase.TABLE_BAND);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
            ;
        });
        this.getBandDetailsByIdOrName = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .from(UserDatabase.TABLE_BAND)
                    .where({ id: input })
                    .orWhere({ name: input });
                return Band_1.Band.toBand(result[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
            ;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(UserDatabase.TABLE_USER)
                .where({ email });
            console.log("result", result[0]);
            const user = User_1.User.toUserModel(result[0]);
            console.log("user", user);
            return user;
        });
    }
    ;
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_USER = "User_show";
UserDatabase.TABLE_BAND = "Bands";
;
