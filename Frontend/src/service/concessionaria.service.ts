import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstractservice';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConcessionariaDTO } from 'src/dto/concessionariadto';

@Injectable({
    providedIn: 'root'
})
export class ConcessionariaService extends AbstractService<ConcessionariaDTO> {
    constructor(http: HttpClient) {
        super(http);
        this.type = 'carShop/concessionaria';
    }
    findConcessionariaByUserId(id_user: number):Observable<ConcessionariaDTO> {
        return this.http.get<ConcessionariaDTO>(environment.APIEndpoint + this.type + '/findConcessionariaByUserId?id=' + id_user)
    }
}