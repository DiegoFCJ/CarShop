import { Component, OnInit } from '@angular/core';
import { FotoDTO } from 'src/dto/fotodto';
import { UserDTO } from 'src/dto/userdto';
import { FotoService } from 'src/service/foto.service';

@Component({
  selector: 'app-immagine-profilo',
  templateUrl: './immagine-profilo.component.html',
  styleUrls: ['./immagine-profilo.component.css']
})
export class ImmagineProfiloComponent implements OnInit {
  user: UserDTO
  imgDTO: FotoDTO
  imgURL: String

  constructor(private service: FotoService) { 
  }

  ngOnInit() {
    let idJSON = localStorage.getItem('currentUser')
    this.user = JSON.parse(idJSON);
    this.service.getFotoByUserId(Number(this.user.id)).subscribe((foto) => {
      this.imgDTO = foto;
    });

  }

}
