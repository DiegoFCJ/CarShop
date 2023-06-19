import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { NgForm } from "@angular/forms";
import { UserService } from "src/service/user.service";
import { LoginDTO } from "src/dto/logindto.js";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { UserDTO } from "src/dto/userdto.js";
import { AnagraficaDTO } from "src/dto/anagraficadto.js";
import { AnagraficaService } from "src/service/anagrafica.service.js";
import { ConcessionariaDTO } from "src/dto/concessionariadto.js";
import { ConcessionariaService } from "src/service/concessionaria.service.js";
import { FotoService } from "src/service/foto.service.js";
import { FotoDTO } from "src/dto/fotodto.js";

@Component({
  selector: "app-form-register",
  templateUrl: "./form-register.component.html",
  styleUrls: ["./form-register.component.css"],
})
export class FormRegisterComponent implements OnInit {
  dataRegistrazione = new Date().toLocaleDateString();
  loginDTO: LoginDTO;
  fase = 1;
  emailCheck = true;
  passwordMatch = true;
  isDisabled = true;
  first = true;
  registerUserDTO: any;
  registerAnagraficaDTO: AnagraficaDTO;
  registerAnagraficaDTO2: AnagraficaDTO;
  concessionariaDTO: ConcessionariaDTO;

  constructor(
    private service: UserService,
    private anagServ: AnagraficaService,
    public datepipe: DatePipe,
    private router: Router,
    private concServ: ConcessionariaService,
    private fotoService: FotoService
  ) {}

  ngOnInit(): void {
  }

  onClick(): void{
    const email = document.getElementById("email") as HTMLInputElement | null;
    const password = document.getElementById("passwordToVerify") as HTMLInputElement | null;
    const passwordToMatch = document.getElementById("passwordToMatch") as HTMLInputElement | null;

    if (password.value != "" && passwordToMatch.value != "") {
      if (password.value === passwordToMatch.value) {
        this.loginDTO = new LoginDTO(email.value, password.value, true);
        this.fase = 2;
      } else {
        this.noPasswordMatch();
      }
    } else {
      this.noPasswordToast();
    }
  }

  onClick2() {
    this.fase = 1;
  }

  onClick3() {
    this.fase = 2;
  }

  onClick4() {
    this.fase = 3;
  }

  onInputEmail(e: Event) {
    let emailInput = (<HTMLInputElement>e.target).value;
    const expression: RegExp =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
   if (emailInput.length === 0) {
      this.first = true;
      this.emailCheck = false;
    } else {
      this.service.doesEmailExists(emailInput).subscribe((email) => {
        if (email) {
          this.emailCheck = true;
          this.first = false;
        } else if (!expression.test(emailInput)) {
          this.emailCheck = true;
          this.first = false;
        } else {
          this.emailCheck = false;
          this.first = true;
        }
        this.emailCheck ? (this.isDisabled = false) : (this.isDisabled = true);
      });
    }
  }

  register(r: NgForm): void {
    if (
      r.value.nome === "" ||
      r.value.cognome === "" ||
      r.value.genere === "" ||
      r.value.nazione === null ||
      r.value.provincia === "" ||
      r.value.cittaResidenza === "" ||
      r.value.indirizzo === "" ||
      r.value.dataNascita === ""
    ) {
      this.invalidInput();
    } else {
      if(this.service.isAdmin){
        this.registerUserDTO = new UserDTO(
          0, 
          this.loginDTO.email, 
          this.loginDTO.password,
          0
          );
      }else{
        this.registerUserDTO = new UserDTO(0, this.loginDTO.email, this.loginDTO.password, 1);
      }
      this.registerAnagraficaDTO = new AnagraficaDTO(
        0,
        r.value.nome,
        r.value.cognome,
        r.value.genere,
        r.value.nazione,
        r.value.provincia,
        r.value.cittaResidenza,
        r.value.indirizzo,
        r.value.dataNascita,
        this.registerUserDTO
      )
      if(this.fase != 3){
        this.registerUser();
      }
    }
  }

  registerAdmin(r: NgForm): void {
    if (
      r.value.cNome === "" ||
      r.value.cDescrizione === "" ||
      r.value.cProvincia === "" ||
      r.value.cCitta === "" ||
      r.value.cIndirizzo === ""
    ) {
      this.invalidInput();
    } else {
      this.concessionariaDTO = new ConcessionariaDTO(
        0,
        r.value.cNome,
        r.value.cDescrizione,
        r.value.cProvincia,
        r.value.cCitta,
        r.value.cIndirizzo,
        this.registerAnagraficaDTO.nazione,
        this.registerUserDTO
      );
      
      this.registerConc(this.concessionariaDTO);
    }
  }

  registerConc(conc: ConcessionariaDTO){
    this.service.login(this.loginDTO).subscribe(data => {
      this.registerUserDTO = data;
      this.concServ.insert(conc).subscribe((data) => {
        this.registerSuccessfully();
      });
    });
  }

  registerUser(){
    this.service.insert(this.registerUserDTO).subscribe(data => {
    this.loginDTO = new LoginDTO(this.registerUserDTO.email, this.registerUserDTO.password, true);
      this.service.login(this.loginDTO).subscribe(data => {
        this.registerUserDTO = data;
        this.registerAnagraficaDTO2 = new AnagraficaDTO(
          0,
          this.registerAnagraficaDTO.nome,
          this.registerAnagraficaDTO.cognome,
          this.registerAnagraficaDTO.genere,
          this.registerAnagraficaDTO.nazione,
          this.registerAnagraficaDTO.provincia,
          this.registerAnagraficaDTO.cittaResidenza,
          this.registerAnagraficaDTO.indirizzo,
          this.registerAnagraficaDTO.dataNascita,
          this.registerUserDTO
        )
          let foto: FotoDTO
          foto = new FotoDTO(0, "../../../../assets/assets-user/userProfile.png",null, this.registerUserDTO)
          this.fotoService.insert(foto).subscribe();

        this.anagServ.insert(this.registerAnagraficaDTO2).subscribe(data => {
          //CONTROLLARE QUI
          if(!this.service.isAdmin){
            this.registerSuccessfully();
          }
        });
      });
    });

  }

  registerSuccessfully() {
    Swal.fire({
      icon: "success",
      title: '<span style="color: green">Profilo creato!</span>',
      text: "Account creato con successo",
      confirmButtonColor: "#c79412",
      confirmButtonText: 'Ok'
    });
    this.router.navigate(["/login"]);
  }

  acceptTerms() {
    Swal.fire(
      "Termini e condizioni",
      `Accetta i termini e le condizioni di utilizzo del prodotto.`,
      "info"
    );
  }

  noPasswordToast() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: "Imposta una password!",
    });
  }

  noPasswordMatch() {
    Swal.fire({
      icon: "error",
      title: '<span style="color: EF5F40">Errore!</span>',
      text: "Le password non corrispondono!",
      confirmButtonColor: "#AA1010",
    });
  }

  invalidInput() {
    Swal.fire({
      icon: "error",
      title: '<span style="color: EF5F40">Errore!</span>',
      text: "Non tutti i campi sono stati riempiti!",
      confirmButtonColor: "#AA1010",
    });
  } 
}