import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnagraficaService extends AbstractService<AnagraficaDTO>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'carShop/anagrafica';
  }

  findAnagraficaByUserId(user_id: number): Observable<AnagraficaDTO>{
    return this.http.get<AnagraficaDTO>(environment.APIEndpoint + this.type + '/findAnagraficaByUserId?user_id=' + user_id);
  }
}
