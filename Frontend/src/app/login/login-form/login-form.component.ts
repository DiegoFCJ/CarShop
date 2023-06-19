import { Component, OnInit } from '@angular/core';
import { LoginDTO } from 'src/dto/logindto';
import {NgForm } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import { Router } from '@angular/router';
import { Usertype } from 'src/dto/usertype';
import { UserDTO } from 'src/dto/userdto';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

    hide = true;

    email: string;
    password: string;
    rememberMe: boolean;

    constructor(private service: UserService, private router: Router) { }

    loginDTO: LoginDTO;

    ngOnInit()
    {
        let user = JSON.parse(localStorage.getItem('login'));

        if (user.rememberMe) {
            this.autologin();
        }
        else {
            localStorage.clear();
        }
    }

    login(f: NgForm): void {

        this.loginDTO = new LoginDTO(f.value.email, f.value.password, f.value.rememberMe);


        this.service.login(this.loginDTO).subscribe((jwtToken) => {

            if (jwtToken != null) {
                const usertype = <Usertype><unknown>jwtToken.usertype;
                console.log("usertype: "+usertype)

                console.log("jwtEmail: "+jwtToken.email)
                let user: UserDTO = new UserDTO(jwtToken.id, jwtToken.email, jwtToken.password, usertype);
                let jwt = jwtToken.token;
                localStorage.setItem("jwt", jwt)
                localStorage.setItem("currentUser",JSON.stringify(user))                

                localStorage.setItem('login', JSON.stringify(this.loginDTO));
              
                switch (user.usertype.toString()) {
                    case 'ADMIN': {
                        this.router.navigate(['/admin-dashboard/users']);
                        break;
                    }
                    case 'USER': {
                        this.router.navigate(['/user/profilo']);
                        break;
                    }
                    default:
                        this.router.navigate(['/login']);
                        break;
                }
            } 
        });
    }

    autologin(): void {

        let user = JSON.parse(localStorage.getItem('login'));
        this.email = user ? user.email : '';
        this.password = user ? user.password : '';
        this.rememberMe = user ? user.rememberMe : false;
    }
}