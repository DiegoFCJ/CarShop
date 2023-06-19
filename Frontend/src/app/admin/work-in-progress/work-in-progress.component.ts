import { Component, OnInit } from '@angular/core';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { ConcessionariaDTO } from 'src/dto/concessionariadto';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { ConcessionariaService } from 'src/service/concessionaria.service';

@Component({
  selector: 'app-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.css']
})
export class WorkInProgressComponent implements OnInit {

  case = 1;
  user: UserDTO;
  conc: ConcessionariaDTO;
  anag: AnagraficaDTO;

  constructor(private service: ConcessionariaService, private serviceAnag: AnagraficaService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log("user: "+JSON.stringify(this.user));

    
    this.serviceAnag.findAnagraficaByUserId(this.user.id).subscribe((anag) => {
      this.anag = anag;
      console.log(this.anag);
    })
    this.service.findConcessionariaByUserId(this.user.id).subscribe((conc) => {
      this.conc = conc;
      console.log(this.conc);
    });
  }

  modifyProfile(){
    this.case = 3;
  }

  modifyConc(){
    this.case = 2;
  }
}
