import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    constructor(
     private userBusiness: UserBusiness,
  
    ){}
    async signup(request: Request, response: Response) {
        try {

            const input: UserInputDTO = {
                email: request.body.email,
                name: request.body.name,
                password: request.body.password,
                role: request.body.role
            }

            
            const token = await this.userBusiness.createUser(input);

            response.status(200).send({ token });

        } catch (error:any) {
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

            
            const token = await this.userBusiness.getUserByEmail(loginData);

            response.status(200).send({ token });

        } catch (error:any) {
            response.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}