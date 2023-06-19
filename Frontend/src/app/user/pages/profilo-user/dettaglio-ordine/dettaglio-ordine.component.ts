import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AcquistiDTO } from 'src/dto/acquistidto';
import { AutoDTO } from 'src/dto/auto';
import { FotoDTO } from 'src/dto/fotodto';
import { AcquistiService } from 'src/service/acquisti.service';
import { AutoService } from 'src/service/auto.service';
import { FotoService } from 'src/service/foto.service';

@Component({
  selector: 'app-dettaglio-ordine',
  templateUrl: './dettaglio-ordine.component.html',
  styleUrls: ['./dettaglio-ordine.component.css']
})
export class DettaglioOrdineComponent implements OnInit {
  idOrdine: number;
  acquistiDTO: AcquistiDTO[];
  displayedColumns: string[] = ['immagine','prodotto', 'quantita', 'prezzo'];
  dataSource: MatTableDataSource<AcquistiDTO>;
  storico: boolean = false
  auto: AutoDTO[];
  foto: FotoDTO[];
  somma: number = 0;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: AcquistiService, private fotoService: FotoService, private autoService: AutoService, private router: Router) { }

  ngOnInit() {
    this.idOrdine = JSON.parse(localStorage.getItem('idOrdine'))
    this.service.findAllByIDOrdine(this.idOrdine).subscribe((Acquisti) => {
      this.acquistiDTO = Acquisti; //Ricevo gli acquisti con lo stesso IDOrdine

      console.log("array:",this.acquistiDTO)
      this.auto = []; // Inizializza l'array auto vuoto
      this.foto = []
      //carico l'array che contiene tutte le auto
      for(let i=0; i<this.acquistiDTO.length; i++) {
        this.autoService.read(this.acquistiDTO[i].auto.id).subscribe((autoTemp) => {
          this.auto.push(autoTemp)
          this.fotoService.getAllByAutoId(this.auto[i].id).subscribe((fotoTemp) => {
            let foto = fotoTemp[0]
            this.foto.push(foto)
          })
        })
      }
      this.dataSource = new MatTableDataSource<AcquistiDTO>(this.acquistiDTO);
      this.dataSource.sort = this.sort;


      this.getTotale()
    })
  }

  getImmagine(element: AcquistiDTO):string {
    for (let i=0; i<this.foto.length; i++) {
      if (this.foto[i].auto.id == element.auto.id) {
        return this.foto[i].url
      }
    }
    return
  }

  getTotale() {
    this.acquistiDTO.forEach(element => {
      if(element.idOrdine != null) {
        this.somma += element.prezzo
      }
    });    
  }


  
  
  backComponent() {
    this.router.navigateByUrl("/user/profilo", { replaceUrl: true }).then(() => {
      window.location.reload();
  });
  }

}
