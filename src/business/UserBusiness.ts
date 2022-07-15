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
        if(!user.email || !user.name || !user.password || !user.role){
            throw new Error("Invalid inputs");
        };

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);
        
        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);
       
        const accessToken = this.authenticator.generateToken({ id, role: user.role });
        console.log("business token:", accessToken);

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        if(!user.email || !user.password){
            throw new Error("Invalid inputs");
        };
        
        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);
        console.log("user from db",userFromDB);
        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());
        console.log("aquiROLEEEEE:",userFromDB.getRole())
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

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
        
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const inputsBand = Band.toBandModel({
            id, 
            name, 
            music_genre, 
            responsible
        });
        const userDatabase = new UserDatabase();
        await userDatabase.insertBandDB(inputsBand);
    };

    public getBandDetails = async (input: string, token: string) => {
        if(!token || !input){
            throw new Error("Invalid input or authorization");
        };

        const authenticator = new Authenticator();
        const tokenData = authenticator.getData(token);
        
        if(!tokenData){
            throw new Error("Invalid token");
        };
        const userDatabase = new UserDatabase();
        const band: Band = await userDatabase.getBandDetailsByIdOrName(input);

        return band;
    };
};