import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FotoDTO } from 'src/dto/fotodto';
import { AutoDTO } from 'src/dto/auto';
import { AutoService } from 'src/service/auto.service';
import { FotoService } from 'src/service/foto.service';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { promise } from 'protractor';
import { forkJoin } from 'rxjs';
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2'



@Component({
    selector: 'app-modifica-auto',
    templateUrl: './modifica-auto.component.html',
    styleUrls: ['./modifica-auto.component.css']
})
export class ModificaAutoComponent implements OnInit {

    selectedLevel = "";
    hideicon1: boolean = true;
    hideicon2: boolean = true;
    hideicon3: boolean = true;
    hideicon4: boolean = true;

    idauto: number;
    myfile: string;
    Anno: number;
    Modello: string;
    Costo: number;
    CodiceProdotto: string;
    Quantita: number;
    Descrizione: string;
    fotoPrincipale: string;
    idfotoPrincipale: number;

    constructor(public dialogRef: MatDialog,
        private fotoService: FotoService,
        private autoService: AutoService,
        public fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute) { }

    autoDTO: AutoDTO;
    fotoDTO: FotoDTO;
    autoDTOmod: AutoDTO;
    fotoDTOmod: FotoDTO[];


    /*##################### Registration Form #####################*/
    registrationForm = this.fb.group({
        file: [null]
    })

    /*########################## File Upload ########################*/
    @ViewChild('fileInput') el: ElementRef;
    imageUrl: any;
    editFile: boolean = true;
    removeUpload: boolean = false;

    uploadFile(event) {
        /* let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);

            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.imageUrl = reader.result;
                this.registrationForm.patchValue({
                    file: reader.result
                });
                this.editFile = false;
                this.removeUpload = true;
            }
            // ChangeDetectorRef since file is loading outside the zone
            this.cd.markForCheck();
        } */
    }

    // Function to remove uploaded file
    removeUploadedFile() {
        let newFileList = Array.from(this.el.nativeElement.files);
        this.imageUrl;
        this.editFile = true;
        this.removeUpload = false;
        this.registrationForm.patchValue({
            file: [null]
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.idauto = parseInt(params.get('id'));
            this.autoService.read(this.idauto).subscribe((autoDTOmod) => {
                this.autoDTOmod = autoDTOmod;
                this.outputAuto();
            })
        });
    }

    outputAuto() {
        this.fotoService.getAllByAutoId(this.autoDTOmod.id).subscribe((fotoDTOmod) => {
            console.log("ID auto da leggere: "+this.autoDTOmod.id)
            this.fotoDTOmod = fotoDTOmod;
            this.fotoPrincipale = this.fotoDTOmod[0].url;
            this.idfotoPrincipale = this.fotoDTOmod[0].id;

            this.Modello = this.autoDTOmod.modello;
            this.Anno = this.autoDTOmod.anno;
            this.Costo = this.autoDTOmod.prezzo;
            this.CodiceProdotto = this.autoDTOmod.codice;
            this.Quantita = this.autoDTOmod.quantita;
            this.Descrizione = this.autoDTOmod.descrizione;
            this.myfile = this.fotoPrincipale;

        });
    }

    ModAuto(f: NgForm): void {

        let adminUser = JSON.parse(localStorage.getItem('currentUser'));
        this.autoDTO = new AutoDTO(this.autoDTOmod.id, f.value.Quantita, f.value.Anno, f.value.CodiceProdotto, f.value.Modello, f.value.Costo, f.value.Descrizione, this.autoDTOmod.user);
        this.fotoDTO = new FotoDTO(this.idfotoPrincipale, f.value.myfile, this.autoDTO, null);

        this.autoService.update(this.autoDTO).subscribe(() => {
           /*  this.fotoService.update(this.fotoDTO).subscribe(() => {
                this.updateSuccessfully();
            }); */
        })
    }

    updateSuccessfully() {
        Swal.fire({
            icon: 'success',
            title: 'Auto modificata con successo',
            text: "Hai modificato la tua auto",
            showConfirmButton: false,
            timer: 1500
        })

        this.router.navigateByUrl("/admin-dashboard/admin-all-products", { replaceUrl: true }).then(() => {
            window.location.reload();
        });
    }
}

