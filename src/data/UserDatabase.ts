import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";

export class UserDatabase extends BaseDatabase {

  private static TABLE_USER = "User_show";
  private static TABLE_BAND = "Bands";

  public signUp = async(
    user: User
 ): Promise<void> => {
    try {
       await this.getConnection()
       .insert({
          id: user.getId,
          name: user.getName,
          email: user.getEmail,
          password: user.getPassword
       }).into(UserDatabase.TABLE_USER)

    } catch (error) {
       if(error instanceof Error ){
          throw new Error(error.message)
        }else{
          throw new Error("erro desconhecido")
        }
    }

 }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_USER)
      .where({ email });

    console.log("result", result[0]);
    const user: User = User.toUserModel(result[0]);
    console.log("user", user);
    return user
  };

  public insertBandDB = async (band: Band): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: band.getId(),
          name: band.getName(),
          music_genre: band.getMusicGenre(),
          responsible: band.getResponsible()
        })
        .into(UserDatabase.TABLE_BAND);
    } 
    catch (error) {
      throw new Error(error.sqlMessage || error.message);
    };
  };

  public getBandDetailsByIdOrName = async ( input: string ): Promise<Band> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_BAND)
        .where({ id: input })
        .orWhere({ name: input});

      return Band.toBand(result[0]);
    } 
    catch (error) {
      throw new Error(error.sqlMessage || error.message);
    };
  };
};

