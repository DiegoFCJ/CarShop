import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeroComponent } from "./components/hero/hero.component";
import { ProductsComponent } from "./components/prod-filter/prod-filter.component";
import { ProdListComponent } from "./components/prod-list/prod-list.component";
import { ConfermaOrdineComponent } from "./pages/conferma-ordine/conferma-ordine.component";
import { DettaglioComponent } from "./pages/dettaglio/dettaglio.component";
import { UserRoutingModule } from "./user-routing.module";
import { HomeComponent } from './pages/home/home.component';
import { CommonComponentModule } from "../common-component/common-component.module";
import { ProfiloUserComponent } from "./pages/profilo-user/profilo-user.component";
import { DettaglioUserComponent } from './pages/profilo-user/dettaglio-user/dettaglio-user.component'
import { ProdCardComponent } from './components/prod-card/prod-card.component'
import { QuantityComponent } from './components/quantity/quantity.component'
import { StoricoAcquistiComponent } from "./pages/profilo-user/storico-acquisti/storico-acquisti.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModificaProfiloComponent } from "./pages/profilo-user/modifica-profilo/modifica-profilo.component";
import { ModificaUserFormComponent } from "../user/components/modifica-user-form/modifica-user-form.component";
import { ClarityModule } from "@clr/angular";
import { DettaglioOrdineComponent } from "./pages/profilo-user/dettaglio-ordine/dettaglio-ordine.component";
@NgModule({
  declarations: [
    HeroComponent,
    ProductsComponent,
    ProdListComponent,
    DettaglioComponent,
    ConfermaOrdineComponent,
    HomeComponent,
    ProfiloUserComponent,
    DettaglioUserComponent,
    ProdCardComponent,
    QuantityComponent,
    StoricoAcquistiComponent,
    ModificaProfiloComponent,
    ModificaUserFormComponent,
    DettaglioOrdineComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NgbModule,
    CommonComponentModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule 
  ],
  exports: [
    ModificaProfiloComponent
  ]
})
export class UserModule { }
