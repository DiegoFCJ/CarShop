import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcquistiDTO } from 'src/dto/acquistidto';
import { UserDTO } from 'src/dto/userdto';
import { AcquistiService } from 'src/service/acquisti.service';

@Component({
  selector: 'app-dialog-shop-dialog',
  templateUrl: './dialog-shop-dialog.component.html',
  styleUrls: ['./dialog-shop-dialog.component.css']
})
export class DialogShopDialogComponent implements OnInit {

  //passare da "shop-prod-list-component" la lista delle auto
  constructor(private router: Router, public acquistiService: AcquistiService) { }
  currentUser: UserDTO;
  
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.readAllByUserId(this.currentUser.id);

  }

  redirect() {
    this.router.navigate(['role']);
  }

  readAllByUserId(id: number){
    this.acquistiService.getAllByUserId(id).subscribe(data => {
      this.acquistiService.autos = data;
      this.totalAndSubTotal();
    })
  }

  totalAndSubTotal(){
    this.acquistiService.ivaTemp = 0;
    this.acquistiService.totale = 0;
    this.acquistiService.subTotale = 0;
    this.acquistiService.autos.forEach(auto => {
      if(!auto.acquistato){
        this.acquistiService.subTotale += auto.prezzo;
        this.acquistiService.totale += auto.prezzo;
      }
    });
    this.acquistiService.ivaTemp = ((this.acquistiService.iva / 100) * this.acquistiService.totale);
    this.acquistiService.totale += this.acquistiService.ivaTemp;
  }

  concludiOrdine(){
    let max = 0;
    this.acquistiService.getAllByUserId(this.currentUser.id).subscribe((autoTemp) => {  
    for(let i=0; i<autoTemp.length; i++) {
        if (autoTemp[i].idOrdine != null) {
          if(i==0) {
            max = autoTemp[i].idOrdine
          } else {
            if (max<autoTemp[i].idOrdine) {
              max = autoTemp[i].idOrdine
            }
          }
        }
      }
      max++;
    
      this.acquistiService.autos.forEach(auto => {
        if(!auto.acquistato){
    
          console.log("idMax: "+max);
    
          this.acquistiService.datoAcquisto = new AcquistiDTO(
            auto.id,
            max,
            auto.quantita,
            auto.prezzo,
            true,
            new Date().toLocaleDateString(),
            new Date().toLocaleTimeString(),
            this.currentUser,
            auto.auto
          )
          this.update(this.acquistiService.datoAcquisto);
          this.router.navigate(['/user/conferma-ordine']);
        }
      })
    })
    }

  update(datoAcquisto: AcquistiDTO){
    this.acquistiService.update(datoAcquisto).subscribe();
  }
}