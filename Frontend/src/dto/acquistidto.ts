import { AutoDTO } from "./auto";
import { UserDTO } from "./userdto";

export class AcquistiDTO {

    id: number;
    idOrdine: number;
    quantita: number;
    prezzo: number;
    acquistato: boolean;
    dataAcquisto: string;
    orarioAcquisto: string;
    user: UserDTO;
    auto: AutoDTO;

    constructor(
                id: number,
                idOrdine: number,
                quantita: number,
                prezzo: number,
                isAcquistato: boolean,
                dataAcquisto: string,
                orarioAcquisto: string,
                user: UserDTO,
                auto: AutoDTO){
        this.id = id;
        this.idOrdine = idOrdine;
        this.quantita = quantita;
        this.prezzo = prezzo;
        this.acquistato = isAcquistato;
        this.dataAcquisto = dataAcquisto;
        this.orarioAcquisto = orarioAcquisto;
        this.user = user;
        this.auto = auto;
    }
}