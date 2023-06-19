import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AcquistiDTO } from 'src/dto/acquistidto';
import { AcquistiService } from 'src/service/acquisti.service';
import { FotoService } from 'src/service/foto.service';
import { DialogShopDialogComponent } from '../dialog-shop/dialog-shop-dialog/dialog-shop-dialog.component';

@Component({
  selector: 'app-shop-prod-list',
  templateUrl: './shop-prod-list.component.html',
  styleUrls: ['./shop-prod-list.component.css']
})
export class ShopProdListComponent implements OnInit {
  @Input() auto: AcquistiDTO; // Input property che riceve l'oggetto item
  fotoUrl: string;
  op = false;

  currentPage: string;
  constructor(private router: Router, 
              private fotoServ: FotoService, 
              private acq: AcquistiService,
              public dialog: MatDialog) {
    this.currentPage = this.router.url;
  }

  hideConfermaOrdine:Boolean

  ngOnInit() {
    this.readFoto(this.auto.auto.id);
  }

  readFoto(id: number){
    this.fotoServ.getAllByAutoId(id).subscribe(data => {
      this.fotoUrl = data[0].url;
    });
  }

  scegliColonna():String {
    if(this.currentPage == "/user/conferma-ordine")
    {
      return "col-1"
    }
    else {
      return "col-3"
    }
  }

  scegliOffset():String {
    if(this.currentPage == "/user/conferma-ordine")
    {
      this.hideConfermaOrdine = false
      return "col-4 text-end"
    } else {
      this.hideConfermaOrdine = true
      return "col-4 text-end"
    }
  }
  
  deleteAcquisti(id: number){
    console.log(id);
    this.acq.delete(id).subscribe(data=> {
      this.acq.totale -= (this.auto.prezzo + (this.acq.iva / 100 * this.auto.prezzo));
      this.acq.subTotale -= this.auto.prezzo
      this.acq.ivaTemp -= (this.acq.iva / 100 * this.auto.prezzo)
      // Apri di nuovo il dialog con i dati aggiornati
      this.openDialog();
    })
  }

  openDialog() {
    if (this.op != true) {
      this.op = true;

      const dialogRef = this.dialog.open(DialogShopDialogComponent, { 
        position: {
          top: '54px',
          right: '0'
        },
        width: '26%',
        height: '94%',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog chiuso con il risultato: ${result}`);
        this.op = false;
      });
    } 
    
  }
}