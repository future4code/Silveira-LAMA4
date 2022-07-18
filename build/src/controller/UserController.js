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
exports.UserController = void 0;
const BaseDatabase_1 = require("../data/BaseDatabase");
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.createBand = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = request.headers.authorization;
                const input = {
                    name: request.body.name,
                    music_genre: request.body.music_genre,
                    responsible: request.body.responsible
                };
                yield this.userBusiness.createBand(input, token);
                response.status(201).send({ message: "Band created successfully" });
            }
            catch (error) {
                response.status(400).send({ error: error.message });
            }
            ;
        });
        this.getBandDetails = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = request.headers.authorization;
                const input = request.body.input;
                const band = yield this.userBusiness.getBandDetails(input, token);
                response.status(200).send({ message: "Success", band });
            }
            catch (error) {
                response.status(400).send({ error: error.message });
            }
            ;
        });
    }
    ;
    signup(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    email: request.body.email,
                    name: request.body.name,
                    password: request.body.password,
                    role: request.body.role
                };
                const token = yield this.userBusiness.signUp(input);
                response.status(200).send({ token });
            }
            catch (error) {
                response.status(400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = {
                    email: request.body.email,
                    password: request.body.password
                };
                const token = yield this.userBusiness.login(loginData);
                response.status(200).send({ token });
            }
            catch (error) {
                response.status(400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.UserController = UserController;
;
