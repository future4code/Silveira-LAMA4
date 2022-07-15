import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{

    private static TABLE_NAME = "User_show"

    signUp = async (newUser: User) => {
        try {
            await this.getConnection()
                    .insert({
                        id: newUser.getId(),
                        name: newUser.getName(),
                        email: newUser.getEmail(),
                        password: newUser.getPassword(),
                        role: newUser.getRole()
                    })
                    .into(UserDatabase.TABLE_NAME)

        } catch (error) {
            if(error instanceof Error ){
              throw new Error(error.message)
            }else{
              throw new Error("erro desconhecido")
            }
        }
    }

    selectUserByEmail = async (email: string) => {
        try {
            const result = await this.getConnection()
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({email})

            return result[0] && User.toUserModel(result[0])

        } catch (error) {
            if(error instanceof Error ){
              throw new Error(error.message)
            }else{
              throw new Error("erro desconhecido")
            }
        }
    }
}