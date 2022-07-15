import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { Band, BandInputDTO } from "../model/Band";

export class UserBusiness {
    constructor(
     private userDatabase: UserDatabase,
     private idGenerator: IdGenerator,
     private hashManager: HashManager,
     private authenticator: Authenticator
    ){}

    async createUser(user: UserInputDTO) {

        
        const id = this.idGenerator.generate();

        
        const hashPassword = await this.hashManager.hash(user.password);

        
        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

       
        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        
        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        
        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        
        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }

    createBand = async (band: BandInputDTO, token: string) => {
        const { name, music_genre, responsible } = band;

        if(!name || !music_genre || !responsible || !token ){
            throw new Error("Invalid inputs or authorization");
        };

        const tokenData = this.authenticator.getData(token);
        
        if(!tokenData){
            throw new Error("Invalid token");
        };
        
        const id = this.idGenerator.generate();

        const inputsBand = Band.toBandModel({
            id, 
            name, 
            music_genre, 
            responsible
        });

        await this.userDatabase.insertBandDB(inputsBand);
    };

    public getBandDetails = async (input: string, token: string) => {
        if(!token || input){
            throw new Error("Invalid input or authorization");
        };

        const tokenData = this.authenticator.getData(token);
        
        if(!tokenData){
            throw new Error("Invalid token");
        };

        const band: Band = await this.userDatabase.getBandDetailsByIdOrName(input);

        return band;
    };
};