import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from 'src/app/layout/admin-layout/admin-menu/admin-menu.component';
import { UserDTO } from 'src/dto/userdto';

/**
 * Componente della dashboard admin. Nell'ngOnInit recupera
 * l'utente loggato per il messaggio di benvenuto.
 */
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  user: UserDTO;
  menu: AdminMenuComponent;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
  
  

}
