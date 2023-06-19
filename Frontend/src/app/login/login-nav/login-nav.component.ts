import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user.service';


@Component({
  selector: 'app-login-nav',
  templateUrl: './login-nav.component.html',
  styleUrls: ['./login-nav.component.css']
})

export class LoginNavComponent implements OnInit {

    constructor(public usServ: UserService){
    }

    ngOnInit() {
    }
}
