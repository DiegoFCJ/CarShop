import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogShopDialogComponent } from 'src/app/layout/navbar/dialog-shop/dialog-shop-dialog/dialog-shop-dialog.component';
import { AcquistiDTO } from 'src/dto/acquistidto';
import { AutoDTO } from 'src/dto/auto';
import { UserDTO } from 'src/dto/userdto';
import { AcquistiService } from 'src/service/acquisti.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {
  @Input() singleAuto: AutoDTO; // Input property che riceve l'oggetto item
  isAdded: boolean = false;
  datoAcquisto: AcquistiDTO;
  userInLocal: UserDTO = JSON.parse(localStorage.getItem('currentUser'));
  currentPage: string;
  op = false;
  
  constructor(public aqServ: AcquistiService, 
              public userServ: UserService, 
              private router: Router,
              public dialog: MatDialog) {
    this.currentPage = this.router.url;
  }

  ngOnInit() {
    this.isAddedToCart();
  }

  isDisabled(quantityToAdd: number){
    if(quantityToAdd === 0){
      return true;
    }
    else{
      return false;
    }
  }

  changeQuantity(isPlus: boolean){
    if(isPlus){
      this.aqServ.quantityToAdd += 1;
    }else if(!isPlus){
      if(this.aqServ.quantityToAdd > 0){
        this.aqServ.quantityToAdd -= 1;
      }
    }
  }

  isAddedToCart(){
    if(!this.isAdded){
      this.aqServ.quantityToAdd = 0;
    }else if(this.isAdded && this.aqServ.quantityToAdd > 0){
      this.datoAcquisto = new AcquistiDTO(
        null,
        null,
        this.aqServ.quantityToAdd,
        this.singleAuto.prezzo * this.aqServ.quantityToAdd,
        false,
        null,
        null,
        this.userInLocal,
        this.singleAuto
      )
      if(this.userInLocal === null){
        this.userServ.isAdmin = false;
        this.router.navigateByUrl("/login");
      }else if(this.userInLocal !== null){
        this.insert();
        this.openDialog();
      }
    }
  }

  insert(){
    this.aqServ.insert(this.datoAcquisto).subscribe();
  }
  
  changePath(){
    if(this.currentPage === '/user'){
      return true;
    } else if(this.currentPage === '/user/dettaglio'){
      return false;
    }
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
