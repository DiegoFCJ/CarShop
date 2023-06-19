import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/dto/userdto';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-profilo-user',
  templateUrl: './profilo-user.component.html',
  styleUrls: ['./profilo-user.component.css']
})
export class ProfiloUserComponent implements OnInit {
  userDTO: UserDTO
  storico: boolean = true;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userDTO = JSON.parse(localStorage.getItem("currentUser"))
    this.userService.read(this.userDTO.id).subscribe((userTemp) => {
      this.userDTO = userTemp
      localStorage.setItem('currentUser', JSON.stringify(this.userDTO));
    });

    localStorage.setItem('storico',JSON.stringify(this.storico))
  }

  ngDoCheck() {
    this.storico = JSON.parse(localStorage.getItem('storico'))
  }

}
