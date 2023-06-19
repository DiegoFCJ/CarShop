import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfermaOrdineComponent } from './pages/conferma-ordine/conferma-ordine.component';
import { DettaglioComponent } from './pages/dettaglio/dettaglio.component';
import { UserLayoutComponent } from '../layout/user-layout/user-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfiloUserComponent } from './pages/profilo-user/profilo-user.component';
import { ModificaProfiloComponent } from './pages/profilo-user/modifica-profilo/modifica-profilo.component';
import { DettaglioOrdineComponent } from './pages/profilo-user/dettaglio-ordine/dettaglio-ordine.component';


const routes: Routes = [
  { path: 'user', component: UserLayoutComponent, children:[
    { path: '', component: HomeComponent },
    { path: 'dettaglio/:id', component: DettaglioComponent },
    { path: 'conferma-ordine', component: ConfermaOrdineComponent },
    { path: 'profilo', component: ProfiloUserComponent },
    { path: 'modifica-profilo', component: ModificaProfiloComponent},
    { path: 'dettaglio-ordine', component: DettaglioOrdineComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
