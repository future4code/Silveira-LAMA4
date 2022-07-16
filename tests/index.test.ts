import {ShowMock} from "../tests/Mocks/ShowMock"
import {ShowBusiness} from "../src/business/ShowBusiness"
import { response } from "express";
import { UserBusiness } from "../src/business/UserBusiness";
import { BandDatabase } from "../src/data/BandDatabase";
import { HashManagerMock } from "../tests/Mocks/hashGeneratorMock";
import { IdGeneratorMock } from "../tests/Mocks/idGeneratorMock";
import { TokenGeneratorMock } from "../tests/Mocks/tokenGeneratorMock";
import { BandDatabaseMock } from "./Mocks/BandDatabaseMock";
import { ShowDatabaseMock } from "./Mocks/ShowDatabaseMock";
import { ShowDatabase } from "../src/data/ShowDatabase";
import { Show } from "../src/model/Show";
import { Authenticator } from "../src/services/Authenticator";
import { Weekday } from "../src/model/Show";


const BandBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashManagerMock(),
    new BandDatabaseMock() as BandDatabase,
    new TokenGeneratorMock()
)
const ShowBusinessMock = new ShowBusiness(
    new ShowDatabaseMock() as ShowDatabase,
    new BandDatabaseMock() as BandDatabase,
    new IdGeneratorMock(),
    new TokenGeneratorMock() as Authenticator,
    new ShowMock() as Show
)

const bandad = {
    "id_band": "band_1" ,
    "name": "loucura",
    "music_genre": "rock",
    "responsible": "Italo",
} as any

const bandadi = {
    "id_band": "band_1" ,
    "name": "",
    "music_genre": "rock",
    "responsible": "Italo",
}
const show = {
    "id": "1",
    "Wday": Weekday.SEXTA,
    "id_band": "band_1",
    "start_time": 09,
    "end_time": 13
}
const show2 = {
    "id": "1",
    "Wday": Weekday.SEXTA,
    "id_band": "",
    "start_time": 09,
    "end_time": 13
}

test("registerBand", () => {

    test("Should sucess when register Band", async () => {
     expect.assertions(2)
 
     try {
       await BandBusinessMock.createBand(bandad, "1231412")
       expect(response.status(201))
     } catch (error:any) {
       expect(error.statusCode).toBe(400)
       expect(error.message).toBe("Invalid inputs or authorization")
     }
   })
 }

 )

 describe("registerBand", () => {

    test("Should catch error when register Band", async () => {
     expect.assertions(2)
 
     try {
       await BandBusinessMock.createBand(bandadi, "1231412")
     } catch (error:any) {
       expect(error.statusCode).toBe(400)
       expect(error.message).toBe("Invalid inputs or authorization")
     }
   })
 }
 )

 test("Should return respective when createShow", async () => {
    expect.assertions(2)

    try {
      const createShow = jest.fn(
        (id_band: string, Wday:string, start_time:string, end_time:string) => ShowBusinessMock.createShow(show, "1234214")
      )

      const result = await createShow("1", Weekday.SEXTA, "band_1", "09",)

      
      expect(result).toEqual({
        message: "Show created successfully"
      })
    } catch (error) {
      console.log(error.message)
    }
  })

  describe("Should error respective when createShow", async () => {
    expect.assertions(2)

    try {
      const createShow = jest.fn(
        (id:string, id_band: string, Wday:string, start_time:string, end_time:string) => ShowBusinessMock.createShow(show2, "1234214")
      )

      const result = await createShow("1", Weekday.SEXTA, "", "09", "13")

      
      expect(result).toEqual({
        message: "Show created successfully"
      })
    } catch (error) {
      console.log(error.message)
    }
  })