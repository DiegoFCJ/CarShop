import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { AdminAllProductsComponent } from './admin-all-products/admin-all-products.component';
import { AdminProfiloUpdateComponent } from './admin-profilo-update/admin-profilo-update.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { AggiungiAutoComponent } from './aggiungi-auto/aggiungi-auto.component';
import { ModificaAutoComponent } from './modifica-auto/modifica-auto.component';

/**
 * Modulo di routing dell'admin. Qui ci sono i percorsi che un admin può seguire:
 * appena fa il login viene caricato nel <router-outlet> di app-component il layout e nel 
 * <router-outlet> del layout (come percorsi "children") vengono visualizzati gli altri 
 * (qui sotto sono indentati).
 * 
 * @author Vittorio Valent
 * 
 * @see AdminLayoutComponent
 * 
 * @see layout
 */
const routes: Routes = [
  { path: 'admin-dashboard', component: AdminLayoutComponent, children:[
    { path: '', component: AdminDashboardComponent},
    { path: 'users', component: UsersComponent},
    { path: 'update-users/:id', component: UpdateUsersComponent },
    { path: 'work-in-progress', component: WorkInProgressComponent, children:[
      { path: 'modifica', component: AdminProfiloUpdateComponent }
    ]},
    { path: 'admin-all-products', component: AdminAllProductsComponent},
    { path: 'aggiungi-auto', component: AggiungiAutoComponent},
    { path: 'modifica-auto/:id', component: ModificaAutoComponent},


  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }