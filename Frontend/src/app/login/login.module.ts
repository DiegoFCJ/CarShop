import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { CommonComponentModule } from '../common-component/common-component.module';


/**
 * Questo modulo serve unicamente Login e Registrazione (non implementata)
 * Importa il suo modulo di routing
 * 
 * @author Vittorio Valent
 */
@NgModule({
    declarations: [
        LoginFormComponent, 
        LoginNavComponent,
        LoginComponent,
        FormRegisterComponent
    ],

    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        CommonComponentModule
    ],
    providers: [
      DatePipe
    ]

})
export class LoginModule { }
