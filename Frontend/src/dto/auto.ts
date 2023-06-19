import { UserDTO } from "./userdto";

export class AutoDTO {

    id: number;
    anno: number;
    codice: string;
    modello: string;
    prezzo: number;
    quantita: number;
    descrizione: string;
    user: UserDTO;

    constructor(autoId: number, 
                quantita: number, 
                anno: number, 
                codice: string, 
                modello: string, 
                prezzo: number,
                descrizione: string,
                user: UserDTO) {
        this.id = autoId;
        this.quantita = quantita;
        this.anno = anno;
        this.codice = codice;
        this.modello = modello;
        this.prezzo = prezzo;
        this.descrizione = descrizione;
        this.user = user;
    }
}