import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO } from 'src/dto/userdto';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from 'src/dto/logindto';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { JwtTokenDTO } from 'src/dto/jwtTokenDTO';

/**
 * I service sono decorati da @Injectable. 
 * Qui trovate, oltre ai metodi ereditati dall'Abstract,
 *  il metodo per il login (in mirror con il backend).
 * 
 * @author Vittorio Valent
 * 
 * @see AbstractService
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<UserDTO>{
  isAdmin: boolean;

  constructor(http: HttpClient) {
    super(http);
    this.type = 'carShop/userController';
  }

  login(loginDTO: LoginDTO): Observable<JwtTokenDTO> {
    return this.http.post<any>(environment.APIEndpoint + "user" + '/login', loginDTO)
  }

  doesEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(environment.APIEndpoint + this.type + '/doesEmailExists?email=' + email);
  }

  insert(userdto: UserDTO): Observable<any> {
    return this.http.post(environment.APIEndpoint + "user" + '/insert', userdto);
  }
}
