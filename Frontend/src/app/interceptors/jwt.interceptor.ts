import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { JwtDTO } from 'src/dto/jwtdto';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Aggiunge il token JWT al campo di intestazione Authorization se l'utente è loggato
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('jwt');


    console.log(token)

    if (currentUser && token) {
    const tokenJWT: JwtDTO = new JwtDTO(token);
    const authHeader = `Bearer ${tokenJWT.token}`;

      request = request.clone({
        setHeaders: {
          Authorization: authHeader
        }   
      });
    }

    return next.handle(request);
  }
}
