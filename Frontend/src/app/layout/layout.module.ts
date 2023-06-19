import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminMenuComponent } from './admin-layout/admin-menu/admin-menu.component';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { NavVisitorComponent } from './navbar/navbar.component';
import { DialogShopDialogComponent } from './navbar/dialog-shop/dialog-shop-dialog/dialog-shop-dialog.component';
import { DialogShopComponent } from './navbar/dialog-shop/dialog-shop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CommonComponentModule } from '../common-component/common-component.module';

/**
 * Modulo di layout. Viene caricato nel rputer outlet padre e poi 
 * non viene più ricaricato. Quando clicchiamo su un link ricarichiamo solo l'outlet
 * che sta dentro AdminLayoutComponent
 * 
 * @author Vittorio Valent
 * 
 * @see AdminLayoutComponent
 */
@NgModule({
  entryComponents: [
    DialogShopComponent, 
    DialogShopDialogComponent
  ],
  declarations: [
    DialogShopComponent, 
    DialogShopDialogComponent,
    AdminLayoutComponent, 
    AdminMenuComponent, 
    UserLayoutComponent,
    NavVisitorComponent
  ],
  imports: [
    RouterModule,
    NgbModule,
    CommonModule,
    CommonComponentModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LayoutModule { }
