import { Component, Input, OnInit } from '@angular/core';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { UserService } from 'src/service/user.service';
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2'
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-profilo-update-anag',
    templateUrl: './admin-profilo-update-anag.component.html',
    styleUrls: ['./admin-profilo-update-anag.component.css']
})
export class AdminProfiloUpdateAnagComponent implements OnInit {
    @Input() user: UserDTO;

    anag: AnagraficaDTO;
     email: HTMLInputElement;
    dataNascita: HTMLInputElement;
    indirizzo: HTMLInputElement;
    nazione: HTMLInputElement;
    provincia: HTMLInputElement;
    cittaResidenza: HTMLInputElement;
    genere: HTMLInputElement;
    password: HTMLInputElement;
     
    passwordToMatch: HTMLInputElement;

    constructor(private anagService: AnagraficaService, private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        console.log(this.user)
        this.anagService.findAnagraficaByUserId(this.user.id).subscribe((anag) => {
            this.anag = anag;
            console.log(this.anag)
        });
       this.email = document.getElementById("email") as HTMLInputElement;
        this.dataNascita = document.getElementById("dataNascita") as HTMLInputElement;
        this.indirizzo = document.getElementById("indirizzo") as HTMLInputElement;
        this.nazione = document.getElementById("nazione") as HTMLInputElement;
        this.provincia = document.getElementById("provincia") as HTMLInputElement;
        this.genere = document.getElementById("genere") as HTMLInputElement;
        this.cittaResidenza = document.getElementById("cittaResidenza") as HTMLInputElement;
        this.password = document.getElementById("password") as HTMLInputElement;
        this.passwordToMatch = document.getElementById("passwordToMatch") as HTMLInputElement;
    }

    update() {
        //Update User
        this.user.email = this.email.value;
        if (this.password.value === this.passwordToMatch.value)
            if (this.password.value != "")
                this.user.password = this.password.value;
                
        console.log(this.user)
        this.userService.update(this.user).subscribe();

        //Update Anagrafica
       /*  this.anag.dataNascita = this.dataNascita.value;
        this.anag.indirizzo = this.indirizzo.value;
        this.anag.nazione = this.nazione.value;
        this.anag.provincia = this.provincia.value;
        this.anag.genere = this.genere.value;
        this.anag.cittaResidenza = this.cittaResidenza.value; */
        console.log("anagrafica: "+this.anag.nome)
        this.anagService.update(this.anag).subscribe();
        

        Swal.fire({
            icon: 'success',
            title: 'Profilo modificato con successo',
            text: "Hai modificato il tuo profilo",
            showConfirmButton: false,
            timer: 1500
        })
    }

    delete() {

        Swal.fire({
            title: "Sei sicuro di voler eliminare l'account?",
            text: "Procedendo eliminerai in via definitiva il tuo account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Elimina'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancellato!',
                    "L'account e` stato cancellato",
                    'success'
                )

            }
            this.userService.delete(this.user.id).subscribe(() => {
                localStorage.clear();
                this.router.navigateByUrl("/login");
            });
        })
    }
}
