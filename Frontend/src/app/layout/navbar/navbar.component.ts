import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserDTO } from 'src/dto/userdto';
import { UserService } from 'src/service/user.service';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavVisitorComponent implements OnInit {

    constructor(public dialog: MatDialog, public usServ: UserService, private service: AnagraficaService, private router: Router) { }

    nome: String = "n";
    cognome: String = "one";

    nomeUser: String;
    unlogged: Boolean = true;

    hideLogin: Boolean;
    showLogin: Boolean;

    anagrafica: AnagraficaDTO;
    user: UserDTO;

    visibile: boolean;

    ButtonState() {
        let userString = localStorage.getItem("currentUser")
        this.user = JSON.parse(userString); //convertiamo da Stringa JSON in oggetto TS
        this.service.findAnagraficaByUserId(this.user.id).subscribe((UserAnagrafica) => {
            this.anagrafica = UserAnagrafica;
            this.nome = this.anagrafica.nome;
            console.log(this.nome);
            this.cognome = this.anagrafica.cognome;
            this.nomeUser = this.nome + " " + this.cognome;
        });
    }

    ngOnInit() {
        this.hideLogin = this.unlogged;
        this.showLogin = !this.unlogged;

        if (localStorage.getItem("currentUser") != null) {
            this.unlogged = false;
            this.hideLogin = this.unlogged;
            this.showLogin = !this.unlogged;

            this.ButtonState();
        }
/* 
        if (this.user.usertype.toString() === 'ADMIN') {
        this.visibile = false;
        } else {
        this.visibile = true;
        } */
    }

    logoutUser() {
        localStorage.removeItem("currentUser");
    }

    ProfiloClick() {
        let userString = localStorage.getItem("currentUser")
        this.user = JSON.parse(userString); 
        console.log(this.user.usertype);
        if (this.user.usertype.toString() === "ADMIN") {
            this.router.navigateByUrl("/admin-dashboard/users", { replaceUrl: true }).then(() => {
                window.location.reload();
            });
        }
        else {
            this.router.navigateByUrl("/user/profilo", { replaceUrl: true }).then(() => {
                window.location.reload();
            });
        }

    }

}
