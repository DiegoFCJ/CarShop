import { Component, OnInit } from '@angular/core';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { UserDTO } from 'src/dto/userdto';
import { AcquistiService } from 'src/service/acquisti.service';
import { AnagraficaService } from 'src/service/anagrafica.service';

@Component({
  selector: 'app-conferma-ordine',
  templateUrl: './conferma-ordine.component.html',
  styleUrls: ['./conferma-ordine.component.css']
})
export class ConfermaOrdineComponent implements OnInit {
  orderUser: UserDTO;
  anagOrdUser: AnagraficaDTO;

  constructor(public acquistiService: AcquistiService, public anagServ: AnagraficaService) { 
    
  }

  ngOnInit() {
    this.orderUser = this.acquistiService.datoAcquisto.user;
    this.findAnagraficaByUserId(this.orderUser.id);
    this.acquistiService.ivaTemp = 0;
    this.acquistiService.subTotale = 0;
    this.acquistiService.totale = 0;

  }

  orderId(){
    return this.acquistiService.datoAcquisto.orarioAcquisto + this.acquistiService.datoAcquisto.id;
  }

  findAnagraficaByUserId(id: number){
    this.anagServ.findAnagraficaByUserId(id).subscribe((anag) => {
      this.anagOrdUser = anag;
    })
  }
}
