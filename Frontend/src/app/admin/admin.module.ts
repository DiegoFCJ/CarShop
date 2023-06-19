import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminProfiloUpdateComponent } from './admin-profilo-update/admin-profilo-update.component';
import { AdminAllProductsComponent } from './admin-all-products/admin-all-products.component';
import { AdminProfiloUpdateAnagComponent } from './admin-profilo-update-anag/admin-profilo-update-anag.component';
import { ChartComponent } from './components/chart/chart.component';
import { ClarityModule } from '@clr/angular';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { AggiungiAutoComponent } from './aggiungi-auto/aggiungi-auto.component';
import { ModificaAutoComponent } from './modifica-auto/modifica-auto.component';
import { CommonComponentModule } from '../common-component/common-component.module';

/**
 * Modulo dell'admin, qui vengono dichiarate le component che utilizza 
 * l'admin. Questo modulo importa AdminRoutingModule.
 * 
 * @author Vittorio Valent
 * 
 * @see AdminRoutingModule
 */
@NgModule({
  declarations: [
    AdminDashboardComponent, 
    UsersComponent,   
    WorkInProgressComponent,
    AdminProfiloUpdateComponent,
    AdminAllProductsComponent,
    AdminProfiloUpdateAnagComponent,
    ChartComponent,
    UpdateUsersComponent,
    AggiungiAutoComponent,
    ModificaAutoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    CommonComponentModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminProfiloUpdateComponent,
    AdminProfiloUpdateAnagComponent
  ]
})
export class AdminModule { }
