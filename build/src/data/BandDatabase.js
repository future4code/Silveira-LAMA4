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
exports.BandDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Band_1 = require("../model/Band");
class BandDatabase extends BaseDatabase_1.BaseDatabase {
    registerBand(band) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: band.getId(),
                    name: band.getName(),
                    music_genre: band.getMusicGenre(),
                    responsible: band.getResponsible()
                })
                    .into(BandDatabase.TABLE_NAME);
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
    }
    getBandDetails(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const band = yield this.getConnection()
                .select("*")
                .from(BandDatabase.TABLE_NAME)
                .where({ id: input })
                .orWhere({ name: input });
            if (!band[0]) {
                throw new Error(`Unable to found band with input: ${input}`);
            }
            return Band_1.Band.toBand(band[0]);
        });
    }
}
exports.BandDatabase = BandDatabase;
BandDatabase.TABLE_NAME = "NOME_TABELA_BANDAS";
