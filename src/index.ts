import { UserBusiness } from "./business/UserBusiness";
import { app } from "./controller/app";
import { UserController } from "./controller/UserController";
import { UserDatabase } from "./data/UserDatabase";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

const userController = new UserController(
    new UserBusiness(
        new IdGenerator(),
        new HashManager(),
        new UserDatabase(),
        new Authenticator()
    )
)




app.post("/signup", userController.signUp)
app.post("/login", userController.login)

