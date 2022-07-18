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
exports.UserBusiness = void 0;
const Band_1 = require("../model/Band");
const User_1 = require("../model/User");
class UserBusiness {
    constructor(idGenerator, hashManager, userDatabase, authenticator, bandDatabase) {
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.userDatabase = userDatabase;
        this.authenticator = authenticator;
        this.bandDatabase = bandDatabase;
        this.signUp = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role } = user;
                if (!name || !email || !password || !role) {
                    throw new Error("Porfavor insira um dos dados mencionados no body");
                }
                if (password.length < 6) {
                    throw new Error("A senha precisa ter 6 ou mais caracteres!");
                }
                const id = this.idGenerator.generate();
                const cryptedPassword = this.hashManager.createHash(password);
                const newUser = new User_1.User(id, name, email, cryptedPassword, role);
                yield this.userDatabase.signUp(newUser);
                const token = this.authenticator.generateToken({ id, role });
                return token;
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
        this.login = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = user;
                if (!email || !password) {
                    throw new Error("Porfavor insira um dos dados mencionados no body, nome e senha!");
                }
                const userFromDB = yield this.userDatabase.getUserByEmail(email);
                if (!userFromDB) {
                    throw new Error(`E-mail não cadastrado!`);
                }
                const isPasswordCorrect = this.hashManager.compareHash(password, userFromDB.getPassword());
                if (!isPasswordCorrect) {
                    throw new Error(`Senha inválida!`);
                }
                const token = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });
                return token;
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
        this.createBand = (band, token) => __awaiter(this, void 0, void 0, function* () {
            const { name, music_genre, responsible } = band;
            if (!name || !music_genre || !responsible || !token) {
                throw new Error("Invalid inputs or authorization");
            }
            ;
            const tokenData = this.authenticator.getData(token);
            if (!tokenData) {
                throw new Error("Invalid token");
            }
            ;
            const id = this.idGenerator.generate();
            const inputsBand = Band_1.Band.toBand({
                id,
                name,
                music_genre,
                responsible
            });
            yield this.userDatabase.insertBandDB(inputsBand);
        });
        this.getBandDetails = (input, token) => __awaiter(this, void 0, void 0, function* () {
            if (!token || !input) {
                throw new Error("Invalid input or authorization");
            }
            ;
            const tokenData = this.authenticator.getData(token);
            if (!tokenData) {
                throw new Error("Invalid token");
            }
            ;
            const band = yield this.userDatabase.getBandDetailsByIdOrName(input);
            return band;
        });
    }
}
exports.UserBusiness = UserBusiness;
;
