import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { loginInputDTO } from "../types/loginInputDTO";
import { UserInputDTO } from "../types/userInputDTO";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    signUp = async (req: Request, res: Response) => {
        try {

            const { name, email, password, role } = req.body

            const user: UserInputDTO = {
                name,
                email,
                password,
                role
            }

            const token = await this.userBusiness.signUp(user)

            res.status(201).send({ token })
        } catch (error) {
            if(error instanceof Error ){
              throw new Error(error.message)
            }else{
              throw new Error("erro desconhecido")
            }
        }

    }

    login = async (req: Request, res: Response) => {
        try {

            const { email, password } = req.body

            const user: loginInputDTO = {
                email,
                password
            }

            const token = await this.userBusiness.login(user)

            res.status(200).send({ token })
            
        }catch (error) {
            if(error instanceof Error ){
              throw new Error(error.message)
            }else{
              throw new Error("erro desconhecido")
            }
        }
    }
}