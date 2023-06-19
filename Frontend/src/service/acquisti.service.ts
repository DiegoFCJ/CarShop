import { Injectable } from '@angular/core';
import { AcquistiDTO } from 'src/dto/acquistidto';
import { AbstractService } from './abstractservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcquistiService extends AbstractService<AcquistiDTO>{
  quantityToAdd: number = 0;
  subTotale: number = 0;
  totale: number = 0;
  ivaTemp: number = 0;
  iva: number = 22;
  autos: AcquistiDTO[];
  datiPreAcquisto: AcquistiDTO[];
  datoAcquisto: AcquistiDTO;

  constructor(protected http: HttpClient) {
    super(http);
    this.type = 'carShop/acquisti';
  }

  getAllByUserId(user_id: number): Observable<AcquistiDTO[]> {
    return this.http.get<AcquistiDTO[]>(environment.APIEndpoint + this.type + '/getAllByUserId?id=' + user_id);
  }

  getAllByAcquistato(): Observable<AcquistiDTO[]> {
    return this.http.get<AcquistiDTO[]>(environment.APIEndpoint + this.type + '/getAllByAcquistato');
  }

  findAllByIDOrdine(id_ordine: number): Observable<AcquistiDTO[]> {
    return this.http.get<AcquistiDTO[]>(environment.APIEndpoint + this.type + '/findAllByIDOrdine?idOrdine=' + id_ordine); 
  }

  
}
