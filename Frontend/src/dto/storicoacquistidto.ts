

export class StoricoAcquistiDTO {
    idOrdine: number;
    dataOrdine: string;
    costo: number;

    constructor (
        idOrdine: number,
        dataOrdine: string,
        costo: number
    ) {
        this.idOrdine = idOrdine;
        this.dataOrdine = dataOrdine;
        this.costo = costo;
    }
}