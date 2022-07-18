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
exports.ShowController = void 0;
class ShowController {
    constructor(showBusiness, band) {
        this.showBusiness = showBusiness;
        this.band = band;
        this.createShow = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = request.headers.authorization;
                const input = {
                    id_band: request.body.idband,
                    Wday: request.body.Wday,
                    start_time: request.body.start_time,
                    end_time: request.body.end_time
                };
                yield this.showBusiness.createShow(input, token);
                response.status(201).send({ message: "Show created successfully" });
            }
            catch (error) {
                response.status(400).send({ error: error.message });
            }
            ;
        });
        this.getShowsByTimes = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = request.body.input;
                const result = yield this.showBusiness.getShowsByTimes(input);
                const infoShow = result.filter((this.band.getId));
                const showDetail = yield this.showBusiness.getShowsByTimes(infoShow);
                response.status(200).send({ message: result, showDetail });
            }
            catch (error) {
                response.status(400).send({ error: error.message });
            }
            ;
        });
    }
    ;
}
exports.ShowController = ShowController;
;
