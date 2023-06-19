import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AnagraficaDTO } from 'src/dto/anagraficadto';
import { FotoDTO } from 'src/dto/fotodto';
import { UserDTO } from 'src/dto/userdto';
import { AnagraficaService } from 'src/service/anagrafica.service';
import { FotoService } from 'src/service/foto.service';
import { UserService } from 'src/service/user.service';
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2'

@Component({
    selector: 'app-update-users',
    templateUrl: './update-users.component.html',
    styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
    provinceItaliane: string[] = ['AG', 'AL', 'AN', 'AO', 'AQ', 'AR', 'AP', 'AT', 'AV', 'BA', 'BT', 'BL', 'BN', 'BG', 'BI', 'BO', 'BZ', 'BS', 'BR', 'CA', 'CL', 'CB', 'CI', 'CE', 'CT', 'CZ', 'CH', 'CO', 'CS', 'CR', 'KR', 'CN', 'EN', 'FM', 'FE', 'FI', 'FG', 'FC', 'FR', 'GE', 'GO', 'GR', 'IM', 'IS', 'SP', 'LT', 'LE', 'LC', 'LI', 'LO', 'LU', 'MC', 'MN', 'MS', 'MT', 'ME', 'MI', 'MO', 'MB', 'NA', 'NO', 'NU', 'OG', 'OT', 'OR', 'PD', 'PA', 'PR', 'PV', 'PG', 'PU', 'PE', 'PC', 'PI', 'PT', 'PN', 'PZ', 'PO', 'RG', 'RA', 'RC', 'RE', 'RI', 'RN', 'RM', 'RO', 'SA', 'VS', 'SS', 'SV', 'SI', 'SR', 'SO', 'TA', 'TE', 'TR', 'TO', 'TP', 'TN', 'TV', 'TS', 'UD', 'VA', 'VE', 'VB', 'VC', 'VR', 'VV', 'VI', 'VT'];
    selectedLevel = "";
    anagrafica: AnagraficaDTO;
    user: UserDTO;
    dataNascita: string;
    fotoDTO: FotoDTO;
    //route: ActivatedRoute;
    idUtente: number;

    password: String;
    confermaPassword: string;

    cognome: string;


    constructor(public dialogRef: MatDialog, private fotoService: FotoService, private anagraficaService: AnagraficaService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.idUtente = parseInt(params.get('id'));
            this.userService.read(this.idUtente).subscribe((user) => {
                this.user = user;
                this.set();
            })
        });
    }

    set() {
        this.PasswordToggle();
        this.confermaPasswordToggle();

        this.anagraficaService.findAnagraficaByUserId(this.user.id).subscribe((UserAnagrafica) => {
            this.anagrafica = UserAnagrafica;

            const dataString = this.anagrafica.dataNascita;
            const datee = new Date(dataString.toString());
            this.dataNascita = String(datee.getFullYear());



            if (datee.getMonth() >= 0 && datee.getMonth() <= 9) {
                this.dataNascita = this.dataNascita + "-0" + String(datee.getMonth() + 1);
            } else {
                this.dataNascita = this.dataNascita + "-" + String(datee.getMonth() + 1);
            }

            if (datee.getDate() >= 1 && datee.getDate() <= 9) {
                this.dataNascita = this.dataNascita + "-0" + String(datee.getDate());
                console.log("ciao");
            } else {
                this.dataNascita = this.dataNascita + "-" + String(datee.getDate());
            }

            console.log(this.anagrafica.genere)
        });
    }

    PasswordToggle() {
        const togglePassword = document
            .querySelector('#togglePassword') as HTMLElement;

        const password = document.querySelector('#password') as HTMLInputElement;

        togglePassword.addEventListener('click', () => {

            // Toggle the type attribute using
            // getAttribure() method
            const type = password
                .getAttribute('type') === 'password' ?
                'text' : 'password';

            password.setAttribute('type', type);

            // Toggle the eye and bi-eye icon
            togglePassword.classList.toggle('bi-eye');
        });
    }

    confermaPasswordToggle() {
        const togglePassword = document
            .querySelector('#toggleConfermaPassword') as HTMLElement;

        const password = document.querySelector('#confermaPassword') as HTMLInputElement;

        togglePassword.addEventListener('click', () => {

            // Toggle the type attribute using
            // getAttribure() method
            const type = password
                .getAttribute('type') === 'password' ?
                'text' : 'password';

            password.setAttribute('type', type);

            // Toggle the eye and bi-eye icon
            togglePassword.classList.toggle('bi-eye');
        });
    }

    onClick(f: NgForm): void {
        console.log("OnClick: " + f.value.nome +
            f.value.cognome +
            f.value.genere +
            f.value.nazione +
            f.value.provincia +
            f.value.cittaResidenza +
            f.value.indirizzo +
            f.value.data +
            this.anagrafica.user);


        if (f.value.password === f.value.confermaPassword) {
            const anagraficaDTO: AnagraficaDTO = new AnagraficaDTO(this.anagrafica.id,
                f.value.nome,
                f.value.cognome,
                f.value.genere,
                f.value.nazione,
                f.value.provincia,
                f.value.cittaResidenza,
                f.value.indirizzo,
                f.value.data,
                this.anagrafica.user
            )
            this.anagraficaService.update(anagraficaDTO).subscribe()

            const userDTO: UserDTO = new UserDTO(this.user.id, f.value.email, f.value.password, this.user.usertype)

            this.userService.update(userDTO).subscribe()
            this.router.navigateByUrl("/admin-dashboard/users", { replaceUrl: true }).then(() => {
                window.location.reload();
            });

            Swal.fire({
                icon: 'success',
                title: 'Profilo modificato con successo',
                text: "Hai modificato il tuo profilo",
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            alert("Le due password non corrispondono.")

        }
    }

    deleteUser() {

        Swal.fire({
            title: "Sei sicuro di voler eliminare l'account?",
            text: "Procedendo eliminerai in via definitiva l'account",
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

                this.fotoService.getFotoByUserId(this.user.id).subscribe((foto) => {
                    if (foto != null) {
                        this.fotoDTO = foto;
                        this.fotoDTO.auto = null;
                        this.fotoDTO.user = null;
                        this.fotoService.update(this.fotoDTO).subscribe(() => {
                            this.fotoService.delete(this.fotoDTO.id).subscribe(() => {
                                this.anagraficaService.delete(this.anagrafica.id).subscribe(() => {
                                    this.userService.delete(this.user.id).subscribe(() => {
                                        localStorage.clear();
                                        this.router.navigateByUrl("/login");
                                    });
                                });
                            });
                        });
                    } else {
                        this.anagraficaService.delete(this.anagrafica.id).subscribe(() => {
                            this.userService.delete(this.user.id).subscribe(() => {
                                localStorage.clear();
                                this.router.navigateByUrl("/login");
                            });
                        });
                    }
                });
            }
        })

    }
}

