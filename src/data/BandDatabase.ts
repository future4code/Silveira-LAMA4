import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";


export class BandDatabase extends BaseDatabase {

    private static TABLE_NAME = "NOME_TABELA_BANDAS"

    public async registerBand(band: Band): Promise<void> {

        try {
            await this.getConnection()
                .insert({
                    id: band.getId(),
                    name: band.getName(),
                    music_genre: band.getMusicGenre(),
                    responsible: band.getResponsible()
                })
                .into(BandDatabase.TABLE_NAME)
        } catch (error) {
            if(error instanceof Error ){
              throw new Error(error.message)
            }else{
              throw new Error("erro desconhecido")
            }
          }
    }


    public async getBandDetails(input: string): Promise<Band> {

        const band = await this.getConnection()
            .select("*")
            .from(BandDatabase.TABLE_NAME)
            .where({id: input})
            .orWhere({name: input})

        if (!band[0]) {
            throw new Error(`Unable to found band with input: ${input}`)
        }

        return Band.toBand(band[0])!
    }


}