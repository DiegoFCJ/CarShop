import { Component, OnInit, Input, Output} from '@angular/core';
import { AutoDTO } from '../../../../dto/auto';
import { Router } from '@angular/router';
import { FotoService } from 'src/service/foto.service';

@Component({
  selector: 'app-prod-card',
  templateUrl: './prod-card.component.html',
  styleUrls: ['./prod-card.component.css']
})

export class ProdCardComponent implements OnInit {
  @Input() item: AutoDTO; // Input property che riceve l'oggetto item
  currentPage: string;
  fotoUrl: string;

  constructor(private router: Router, private fotoServ: FotoService) {
    this.currentPage = this.router.url;
  }
  ngOnInit() {
    this.readFoto(this.item.id);
  }
  
  changePath(id: number){
    if(this.currentPage === '/user' || this.currentPage === '/user/home'){
      console.log('dalla home')
      this.router.navigate(['/dettaglio', id]);
    } else if(this.currentPage === ('/user/dettaglio/' + id)){
      console.log('dalla dett')
      this.router.navigate(['/dettaglio/'], { queryParams: { id: id } });
    }
  }

  readFoto(id: number){
    this.fotoServ.getAllByAutoId(id).subscribe(data => {
      this.fotoUrl = data[0].url;
    });
  }

}