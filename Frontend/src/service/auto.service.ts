import { Injectable } from '@angular/core';
import { AutoDTO } from 'src/dto/auto';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstractservice';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoService extends AbstractService<AutoDTO>{
  filteredAutos: AutoDTO[];
  isFiltered: boolean = false;

  constructor(http: HttpClient) {
    super(http);
    this.type = 'carShop/auto';
   }

  findAutoByUserId(idUser: number): Observable<AutoDTO[]>{
    return this.http.get<AutoDTO[]>(environment.APIEndpoint + this.type + '/getAllByID?idUser=' + idUser);
  }

  findAutoByCodice(codice: string): Observable<AutoDTO>{
    return this.http.get<AutoDTO>(environment.APIEndpoint + this.type + '/readByCodice/?codice=' + codice );
  }

  search(modello: string): Observable<AutoDTO[]>{
    return this.http.get<AutoDTO[]>(environment.APIEndpoint + 'carShop/visitor/search/?modello=' + modello );
  }

  filters(type: string): Observable<AutoDTO[]>{
    return this.http.get<AutoDTO[]>(environment.APIEndpoint + 'carShop/visitor/filters' + type);
  }
}


