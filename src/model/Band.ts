
export class Band{
    constructor(
        private id: string, 
        private name: string, 
        private music_genre: string, 
        private responsible: string
    ){};

    getId(){
        return this.id;
    };

    getName(){
        return this.name
    };

    getMusicGenre(){
        return this.music_genre;
    };

    getResponsible(){
        return this.responsible;
    };

    setId(id: string){
        this.id = id;
    };

    setName(name: string){
        this.name = name;
    };

    setEmail(musicGenre: string){
        this.music_genre = musicGenre;
    };

    setPassword(responsible: string){
        this.responsible = responsible;
    };

 public static toBand(data?: any): Band | undefined {
        return (data && new Band(
            data.id,
            data.name,
            data.mainGenre || data.main_genre || data.music_genre || data.musicGenre,
            data.responsible
        ))
    }
}



export interface BandInputDTO{
    name: string;
    music_genre: string;
    responsible: string;
};

   

