import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstractservice';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FotoDTO } from 'src/dto/fotodto';

@Injectable({
    providedIn: 'root'
})
export class FotoService extends AbstractService<FotoDTO> {
    constructor(http: HttpClient) {
        super(http);
        this.type = 'carShop/foto';
    }
    getAllByAutoId(id_auto: number):Observable<FotoDTO[]> {
        return this.http.get<FotoDTO[]>(environment.APIEndpoint + this.type + '/getAllByAutoId?id=' + id_auto)
    }
    getFotoByUserId(id_user: number):Observable<FotoDTO> {
        return this.http.get<FotoDTO>(environment.APIEndpoint + this.type + '/getFotoByUserId?id=' + id_user)
    }
}