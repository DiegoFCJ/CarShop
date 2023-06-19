import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';


import { AcquistiDTO } from 'src/dto/acquistidto';
import { StoricoAcquistiDTO } from 'src/dto/storicoacquistidto';
import { UserDTO } from 'src/dto/userdto';
import { AcquistiService } from 'src/service/acquisti.service';

@Component({
  selector: 'app-storico-acquisti',
  templateUrl: './storico-acquisti.component.html',
  styleUrls: ['./storico-acquisti.component.css']
})
export class StoricoAcquistiComponent implements OnInit {
  user: UserDTO
  acquisti: AcquistiDTO[]
  displayedColumns: string[] = ['idOrdine', 'dataOrdine', 'costo', 'dettagliOrdine'];
  dataSource: MatTableDataSource<StoricoAcquistiDTO>;

  storico: boolean = false;


  storicoDTO: StoricoAcquistiDTO[]
  
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: AcquistiService) {
  }

  
  ngOnInit() {
    let userString = localStorage.getItem("currentUser")
    this.user = JSON.parse(userString)
    
    this.service.getAllByUserId(this.user.id).subscribe((UserAcquisti) => { //tutti acquisti di uno user
      this.acquisti = UserAcquisti

      //this.storicoDTO = new Array(this.acquisti.length);
      
      /*
      for(let j=0; j<this.acquisti.length-1; j++) {
        if(this.acquisti[j].idOrdine != null) {
          
        }
      }
      for(let i=0; i<this.acquisti.length;i++) {
        if(this.acquisti[i].idOrdine != null) {
          if (i==0) {
            if (!this.storicoDTO[i]) {
              this.storicoDTO[i] = { idOrdine: null, dataOrdine: null, costo: null };
            }

            this.storicoDTO[i].idOrdine = this.acquisti[i].idOrdine;
            this.storicoDTO[i].dataOrdine = this.acquisti[i].dataAcquisto;
            this.storicoDTO[i].costo = this.acquisti[i].prezzo;

            console.log("storicoDTO["+i+"] "+this.storicoDTO[i].costo+" acquistiDTO["+i+"]: "+this.acquisti[i].prezzo)
        } else {
          this.storicoDTO[i].costo = this.storicoDTO[i].costo + this.acquisti[i].prezzo;
        }
      }
    } */


    this.storicoDTO = [];
    this.acquisti.forEach(acquisto => {
      if(acquisto.idOrdine != null) {
        let storicoAcquisto = this.storicoDTO.find(storico => storico.idOrdine === acquisto.idOrdine); //cerca se ci sono acquisti con lo stesso idOrdine di storicoAcquisto
        if (storicoAcquisto) {
          storicoAcquisto.costo += acquisto.prezzo;
        } else {
          this.storicoDTO.push({ //se non esiste, aggiunge i dettagli
            idOrdine: acquisto.idOrdine,
            dataOrdine: acquisto.dataAcquisto,
            costo: acquisto.prezzo  
          });
        }
      }
    });
    
    this.dataSource = new MatTableDataSource<StoricoAcquistiDTO>(this.storicoDTO);
    this.dataSource.sort = this.sort;

      
        
    });
  }

  cambioComponent(idOrdine:number) {
    console.log("id: "+idOrdine);
    localStorage.setItem('storico',JSON.stringify(this.storico))
    localStorage.setItem('storicoDTO',JSON.stringify(this.storicoDTO))
    localStorage.setItem('idOrdine',JSON.stringify(idOrdine))
  }

}
