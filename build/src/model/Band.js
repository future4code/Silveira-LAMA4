"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Band = void 0;
class Band {
    constructor(id, name, music_genre, responsible) {
        this.id = id;
        this.name = name;
        this.music_genre = music_genre;
        this.responsible = responsible;
    }
    ;
    getId() {
        return this.id;
    }
    ;
    getName() {
        return this.name;
    }
    ;
    getMusicGenre() {
        return this.music_genre;
    }
    ;
    getResponsible() {
        return this.responsible;
    }
    ;
    setId(id) {
        this.id = id;
    }
    ;
    setName(name) {
        this.name = name;
    }
    ;
    setEmail(musicGenre) {
        this.music_genre = musicGenre;
    }
    ;
    setPassword(responsible) {
        this.responsible = responsible;
    }
    ;
    static toBand(data) {
        return (data && new Band(data.id, data.name, data.mainGenre || data.main_genre || data.music_genre || data.musicGenre, data.responsible));
    }
}
exports.Band = Band;
;
