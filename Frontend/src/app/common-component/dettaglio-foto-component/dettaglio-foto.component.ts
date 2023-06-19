import { Component, OnInit, Input } from '@angular/core';
import { AutoDTO } from 'src/dto/auto';
import { FotoService } from 'src/service/foto.service';

@Component({
  selector: 'app-dettaglio-foto',
  templateUrl: './dettaglio-foto.component.html',
  styleUrls: ['./dettaglio-foto.component.css']
})
export class DettaglioFotoComponent implements OnInit {
  @Input() singleAuto: AutoDTO; // Input property che riceve l'oggetto item
  fotoUrl: string;
  constructor(private fotoServ: FotoService) {}

  ngOnInit() {
    this.readFoto(this.singleAuto.id);
  }

  readFoto(id: number){
    this.fotoServ.getAllByAutoId(id).subscribe(data => {
      this.fotoUrl = data[0].url;
    });
  }

}