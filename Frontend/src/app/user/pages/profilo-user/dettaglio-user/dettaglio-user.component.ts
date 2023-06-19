import { Component, OnInit } from '@angular/core';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-dettaglio-user',
  templateUrl: './dettaglio-user.component.html',
  styleUrls: ['./dettaglio-user.component.css']
})
export class DettaglioUserComponent implements OnInit {

  anagrafica: AnagraficaDTO;
  user: UserDTO;
  userDTO: UserDTO


  constructor(private service: AnagraficaService, private userService: UserService) { 
  }

  ngOnInit() {
    
    let userString = localStorage.getItem("currentUser")
    this.user = JSON.parse(userString); //convertiamo da Stringa JSON in oggetto TS
    this.service.findAnagraficaByUserId(this.user.id).subscribe((UserAnagrafica) => {
      this.anagrafica = UserAnagrafica;
    });
    //localStorage.setItem('idUser',String(this.user.id));
  }
}

