import { ShowBusiness } from "./business/ShowBusiness";
import { UserBusiness } from "./business/UserBusiness";
import { app } from "./controller/app";
import { ShowController } from "./controller/ShowController";
import { UserController } from "./controller/UserController";
import { BandDatabase } from "./data/BandDatabase";
import { ShowDatabase } from "./data/ShowDatabase";
import { UserDatabase } from "./data/UserDatabase";
import { Band } from "./model/Band";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

const userController = new UserController(
    new UserBusiness(
        new IdGenerator(),
        new HashManager(),
        new UserDatabase(),
        new Authenticator(),
        new BandDatabase()
    )
)

const showController = new ShowController(
    new ShowBusiness(
        new ShowDatabase(),
        new BandDatabase(),
        new IdGenerator(),
        new Authenticator(),
    ),
    new Band("", "", "", "")
)




app.post("/signup", userController.signup)
app.post("/login", userController.login)
app.post("/createband", userController.createBand)
app.get("/getbanddetail", userController.getBandDetails)

app.post("/createshow", showController.createShow)
app.get("/getshows", showController.getShowsByTimes)

