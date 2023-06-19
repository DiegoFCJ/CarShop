import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoDTO } from 'src/dto/auto';
import { UserDTO } from 'src/dto/userdto';
import { AcquistiService } from 'src/service/acquisti.service';
import { AutoService } from 'src/service/auto.service';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.css']
})
export class DettaglioComponent implements OnInit {
  singleAuto: AutoDTO;
  autoId: number;
  user: UserDTO;
  visibile: boolean = true;

  constructor(private aqServ: AcquistiService, private autoServ: AutoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeIdAuto();
    this.read(this.autoId);
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    if (this.user.usertype.toString() === 'ADMIN') {
      this.visibile = false;
    } else {
      this.visibile = true;
    }

    console.log("usertype: "+this.user.usertype)
  }

  routeIdAuto(){
    this.route.paramMap.subscribe(params => {
      this.autoId = Number.parseInt(params.get('id'));
    })
  }

  read(id: number){
    this.autoServ.read(id).subscribe(us => {
      this.singleAuto = us;
    })
  }
}
