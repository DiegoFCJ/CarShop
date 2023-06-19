import { Component, OnInit, Input } from '@angular/core';
import { ConcessionariaDTO } from 'src/dto/concessionariadto';
import { UserDTO } from 'src/dto/userdto';
import { ConcessionariaService } from 'src/service/concessionaria.service';
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2'

@Component({
    selector: 'app-admin-profilo-update',
    templateUrl: './admin-profilo-update.component.html',
    styleUrls: ['./admin-profilo-update.component.css']
})
export class AdminProfiloUpdateComponent implements OnInit {

    @Input() conc: ConcessionariaDTO;

    id: number;
    nome: HTMLInputElement;
    indirizzo: HTMLInputElement;
    nazione: HTMLInputElement;
    provincia: HTMLInputElement;
    citta: HTMLInputElement;
    descrizione: HTMLInputElement;
    user: UserDTO;
    concessionaria: ConcessionariaDTO;

    constructor(private service: ConcessionariaService) { }

    ngOnInit() {
        this.nome = document.getElementById("nome") as HTMLInputElement;
        this.indirizzo = document.getElementById("indirizzo") as HTMLInputElement;
        this.nazione = document.getElementById("nazione") as HTMLInputElement;
        this.provincia = document.getElementById("provincia") as HTMLInputElement;
        this.citta = document.getElementById("citta") as HTMLInputElement;
        this.descrizione = document.getElementById("descrizione") as HTMLInputElement;
    }

    update() {
        this.id = this.conc.id;
        this.user = this.conc.user;
        console.log(this.nome)
        this.concessionaria = new ConcessionariaDTO(this.id, this.nome.value, this.descrizione.value, this.provincia.value, this.citta.value, this.indirizzo.value, this.nazione.value, this.user);
        console.log(this.concessionaria)
        this.service.update(this.concessionaria).subscribe();

        Swal.fire({
            icon: 'success',
            title: 'Concessionaria modificata con successo',
            text: "Hai modificato la tua concessionaria",
            showConfirmButton: false,
            timer: 1500
        })
    }

}
