import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AutoDTO } from 'src/dto/auto';
import { UserDTO } from 'src/dto/userdto';
import { AutoService } from 'src/service/auto.service';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {
  @Input() item: AutoDTO; // Input property che riceve l'oggetto item
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<AutoDTO>;
  autos: AutoDTO[];
  user: UserDTO;
  
  constructor(public autoServ: AutoService) {
    this.dataSource = new MatTableDataSource(this.autos);
  }

  ngOnInit() {
    this.readAll();
  }

  readAll() {
    this.autoServ.getAll().subscribe((autos) => {
      this.autos = autos;
      this.dataSource.data = this.autos;
      this.dataSource.paginator = this.paginator;
    })
  }
}