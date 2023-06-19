import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FotoDTO } from 'src/dto/fotodto';
import { AutoDTO } from 'src/dto/auto';
import { AutoService } from 'src/service/auto.service';
import { FotoService } from 'src/service/foto.service';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { promise } from 'protractor';
import { forkJoin } from 'rxjs';
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2'

@Component({
    selector: 'app-aggiungi-auto',
    templateUrl: './aggiungi-auto.component.html',
    styleUrls: ['./aggiungi-auto.component.css']
})
export class AggiungiAutoComponent implements OnInit {

    selectedLevel = "";
    hideicon1: boolean = true;
    hideicon2: boolean = true;
    hideicon3: boolean = true;
    hideicon4: boolean = true;

    myfile: string;
    Anno: number;
    Modello: string;
    Costo: number;
    CodiceProdotto: number;
    Quantita: number;
    Descrizione: string;

    constructor(public dialogRef: MatDialog,
        private fotoService: FotoService,
        private autoService: AutoService,
        public fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private router: Router) { }

    autoDTO: AutoDTO;
    fotoDTO: FotoDTO;

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
        let reader = new FileReader(); // HTML5 FileReader API
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
        }
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

    }

    InsertAuto(f: NgForm): void {
       /*  console.log("file immagine: "+this.registrationForm.get('file').value)

        const base64IMG = this.registrationForm.get('file').value; */

        const placeholder = "../../../assets/assets-auto/car (1).jpg"

        let adminUser = JSON.parse(localStorage.getItem('currentUser'));
        this.autoDTO = new AutoDTO(0, f.value.Quantita, f.value.Anno, f.value.CodiceProdotto, f.value.Modello, f.value.Costo, f.value.Descrizione, adminUser);


        /*  const AutoObservable = this.autoService.insert(this.autoDTO);
          const FotoObservable = this.fotoService.insert(this.fotoDTO);
        
        forkJoin([AutoObservable, FotoObservable]).subscribe(results => {
          this.insertSuccessfully();
         })*/

         
       /* this.autoService.insert(this.autoDTO).subscribe(() => {
            this.autoService.findAutoByCodice(this.autoDTO.codice).subscribe((ret) => {

                this.fotoDTO = new FotoDTO(0, placeholder, ret, null);
                this.fotoService.insert(this.fotoDTO).subscribe();
              /*   this.router.navigateByUrl("/admin-dashboard/admin-all-products", { replaceUrl: true }).then(() => {
                    window.location.reload();
                }); 
                this.insertSuccessfully();
            });
        }) */

        this.autoService.findAutoByCodice(this.autoDTO.codice).subscribe((autoFind) => {
            if (!autoFind) {
                this.insertSuccessfully()
                this.autoService.insert(this.autoDTO).subscribe(() =>{
                    this.autoService.findAutoByCodice(this.autoDTO.codice).subscribe((ret) => {
                        this.fotoDTO = new FotoDTO(0, placeholder, ret, null);
                        this.fotoService.insert(this.fotoDTO).subscribe();
                        this.router.navigateByUrl("/admin-dashboard/admin-all-products", { replaceUrl: true }).then(() => {
                            window.location.reload();
                        })
                    })
                }) 
            } else {
                this.insertError()
            }
        })
    }

    insertSuccessfully() {
        Swal.fire({
            icon: 'success',
            title: 'Auto aggiunta con successo',
            text: "Hai aggiunto una nuova auto.",
            showConfirmButton: false,
            timer: 1500
        })
    }

    insertError() {
        Swal.fire({
            icon: 'error',
            title: 'Errore nel codice',
            text: "Il codice dell'automobile esiste già.",
            showConfirmButton: false,
            timer: 1500
        })
    }
}

