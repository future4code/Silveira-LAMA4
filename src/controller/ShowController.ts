import { Show, ShowInputDTO, Weekday } from "../model/Show";
import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { Band } from "../model/Band";








export class BandController {
    constructor(
        private showBusiness: ShowBusiness,
        private userBusiness: UserBusiness,
        private band: Band,
        private show: Show

    ){};

    createShow = async (request: Request, response: Response) => {
        try {
            const token = request.headers.authorization as string;

            const input: ShowInputDTO = {
                id_band: request.body.idband,
                Wday: request.body.Wday,
                start_time: request.body.start_time,
                end_time: request.body.end_time
            };
            
            
            await this.showBusiness.createShow(input, token)
            
            response.status(201).send({message: "Show created successfully"});
        } 
        catch (error) {
            response.status(400).send({ error: error.message });
        };
    };

    getShowsByTimes = async (request: Request, response: Response) => {
        try {
            const input = request.params.input as Weekday;

            
            const result = await this.showBusiness.getShowsByTimes(input)


           const infoShow =  result.filter((this.band.getId)
            )
            const showDetail = await this.showBusiness.getShowsByTimes(infoShow as any) 
           
            


            response.status(200).send({message: result, showDetail});


        } 
        catch (error) {
            response.status(400).send({ error: error.message });
        };
    };

};
