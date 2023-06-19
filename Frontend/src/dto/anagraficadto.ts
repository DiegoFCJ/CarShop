import { UserDTO } from "./userdto";

export class AnagraficaDTO{
    id: number;
    nome: String;
    cognome: String;
    genere: String;
    nazione: String;
    provincia: String;
    cittaResidenza: String;
    indirizzo: String;
    dataNascita: String;
    user: UserDTO;

    constructor(id: number,
                nome: String,
                cognome: String,
                genere: String,
                nazione: String,
                provincia: String,
                cittaResidenza: String,
                indirizzo: String,
                dataNascita: String,
                user: UserDTO){
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.genere = genere;
        this.nazione = nazione;
        this.provincia = provincia;
        this.cittaResidenza = cittaResidenza;
        this.indirizzo = indirizzo;
        this.dataNascita = dataNascita;
        this.user = user;
    }
}