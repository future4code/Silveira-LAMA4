import { Request, Response } from "express";
import { UserInputDTO} from "../types/userInputDTO";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { loginInputDTO } from "../types/loginInputDTO";


export class UserController {
    constructor(
        private userBusiness: UserBusiness

    ){};

    async signup(request: Request, response: Response) {
        try {
            const input: UserInputDTO = {
                email: request.body.email,
                name: request.body.name,
                password: request.body.password,
                role: request.body.role
            }
            
            
            const token = await this.userBusiness.signUp(input);

            response.status(200).send({ token });
        } catch (error) {
            response.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(request: Request, response: Response) {

        try {

            const loginData: loginInputDTO = {
                email: request.body.email,
                password: request.body.password
            };

            const token = await this.userBusiness.login(loginData);

            response.status(200).send({ token });

        } catch (error) {
            response.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    createBand = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;

            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            };
            
            
            await this.userBusiness.createBand(input, token);
            
            res.status(201).send({message: "Band created successfully"});
        } 
        catch (error) {
            res.status(400).send({ error: error.message });
        };
    };

    getBandDetails = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const input = req.params.input as string;

            
            const band = await this.userBusiness.getBandDetails( input, token );

            res.status(200).send({message: "Success", band});
        } 
        catch (error) {
            res.status(400).send({ error: error.message });
        };
    };

};
