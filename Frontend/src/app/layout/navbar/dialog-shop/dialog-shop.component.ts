import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogShopDialogComponent } from './dialog-shop-dialog/dialog-shop-dialog.component';
import { UserDTO } from 'src/dto/userdto';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'app-dialog-shop',
  templateUrl: 'dialog-shop.component.html',
  styleUrls: ['dialog-shop.component.css'],
})
export class DialogShopComponent implements OnInit{
  @Input() user: UserDTO;

  constructor(public dialog: MatDialog) {}
  op = false;

  ngOnInit() {
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