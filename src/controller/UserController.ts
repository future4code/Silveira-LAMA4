import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

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
            
            const userBusiness = new UserBusiness(
                    new UserDatabase(),
                    new IdGenerator(),
                    new HashManager(),
                    new Authenticator()
                )
            const token = await userBusiness.createUser(input);

            response.status(200).send({ token });
        } catch (error) {
            response.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(request: Request, response: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: request.body.email,
                password: request.body.password
            };

            const userBusiness = new UserBusiness(
                new UserDatabase(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            );
            const token = await userBusiness.getUserByEmail(loginData);

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
            
            const userBusiness = new UserBusiness(
                new UserDatabase(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            );
            await userBusiness.createBand(input, token);
            
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

            const userBusiness = new UserBusiness(
                new UserDatabase(),
                new IdGenerator(),
                new HashManager(),
                new Authenticator()
            );
            const band = await userBusiness.getBandDetails( input, token );

            res.status(200).send({message: "Success", band});
        } 
        catch (error) {
            res.status(400).send({ error: error.message });
        };
    };

};
