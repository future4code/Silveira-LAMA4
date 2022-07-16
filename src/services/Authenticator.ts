import * as jwt from "jsonwebtoken";
import dotenv from "dotenv" 
import { authenticationData } from "../types/authenticationData"

dotenv.config()

const expiresIn = "10h";
export class Authenticator {

  getData = (token: string): authenticationData=> {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role,
      
    };
    return result;
  }


    generateToken = (input: authenticationData): string => {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role,
        
      },
      process.env.JWT_KEY as string,
      {
        expiresIn
      }
    );
    return token;
  }

}