import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";

export class UserDatabase extends BaseDatabase {

  private static TABLE_USER = "User_show";
  private static TABLE_BAND = "Bands";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_USER);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

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

      return Band.toBandModel(result[0]);
    } 
    catch (error) {
      throw new Error(error.sqlMessage || error.message);
    };
  };
};

