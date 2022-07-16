import { UserDatabase } from "../data/UserDatabase";
import { Band, BandInputDTO } from "../model/Band";
import { User, UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { loginInputDTO } from "../types/loginInputDTO";
import { UserInputDTO } from "../types/userInputDTO";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private userDatabase: UserDatabase,
        private authenticator: Authenticator
    ) {}
    signUp = async (user: UserInputDTO) => {
        try {
            
            const { name, email, password, role } = user

            if (!name || !email || !password || !role) {
                throw new Error("Porfavor insira um dos dados mencionados no body")
            }

            if (password.length < 6) {
                throw new Error("A senha precisa ter 6 ou mais caracteres!")
            }

            const id = this.idGenerator.generate()

            const cryptedPassword = this.hashManager.createHash(password)

            const newUser = new User(id, name, email, cryptedPassword, role as UserRole)

            await this.userDatabase.signUp(newUser)

            const token = this.authenticator.generateToken({id, role})

            return token

        } catch (error) {
            if(error instanceof Error ){
              throw new Error(error.message)
            }else{
              throw new Error("erro desconhecido")
            }
        }
    }

    login = async (user: loginInputDTO) => {
        try {

            const { email, password } = user

            if ( !email || !password ) {
                throw new Error("Porfavor insira um dos dados mencionados no body, nome e senha!")
            }

            const userFromDB = await this.userDatabase.getUserByEmail(email)

            if (!userFromDB) {
                throw new Error(`E-mail não cadastrado!`)
            }

            const isPasswordCorrect = this.hashManager.compareHash(password, userFromDB.getPassword())

            if (!isPasswordCorrect) {
                throw new Error(`Senha inválida!`)
            }

            const token = this.authenticator.generateToken({id: userFromDB.getId(), role: userFromDB.getRole()})

            return token

            
        }catch (error) {
            if(error instanceof Error ){
              throw new Error(error.message)
            }else{
              throw new Error("erro desconhecido")
            }
        }
    }
    
    createBand = async (band: BandInputDTO, token: string) => {
        const { name, music_genre, responsible } = band;

        if(!name || !music_genre || !responsible || !token ){
            throw new Error("Invalid inputs or authorization");
        };

        const tokenData = this.authenticator.getData(token)
        
        if(!tokenData){
            throw new Error("Invalid token");
        };
        
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const inputsBand = Band.toBand({
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
        const tokenData = authenticator.getData(token)
        
        if(!tokenData){
            throw new Error("Invalid token");
        };
        const userDatabase = new UserDatabase();
        const band: Band = await userDatabase.getBandDetailsByIdOrName(input);

        return band;
    };
};


