import { UserDTO } from "./userdto";

export class ConcessionariaDTO {
    id: number;
    nome: String;
    descrizione: String;
    provincia: String;
    citta: String;
    indirizzo: String;
    nazione: String;
    user: UserDTO;

    constructor(id: number,
                nome: String,
                descrizione: String,
                provincia: String,
                citta: String,
                indirizzo: String,
                nazione: String,
                user: UserDTO){
        this.id = id;
        this.nome = nome;
        this.descrizione = descrizione;
        this.provincia = provincia;
        this.citta = citta;
        this.indirizzo = indirizzo;
        this.nazione = nazione;
        this.user = user
    }
}