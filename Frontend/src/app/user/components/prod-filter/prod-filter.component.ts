import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutoDTO } from 'src/dto/auto';
import { AutoService } from 'src/service/auto.service';

@Component({
  selector: 'app-prod-filter',
  templateUrl: './prod-filter.component.html',
  styleUrls: ['./prod-filter.component.css']
})
export class ProductsComponent implements OnInit {
  ob = [
    {btn:"Modello"},
    {btn:"Costo"},
    {btn:"Anno"}
  ]
  modelli = ["Tesla", "Lamborghini", "Mercedes", "Cherokee", "Ford", "Porsche", "Volkswagen"];
  costi = [5500, 6000, 11000, 13000];
  anni =  [1956, 1957, 2001, 2002, 2003];
  
  valoreScelto: number;
  prezzoMax: number = 0;
  prezzoMin: number = 9999999999;
  annoMax: number = 0;
  annoMin: number = 9999999999;
  autos: AutoDTO[];
  type: string;
  modello: string;
  costo: number;
  anno: number;
  
  constructor(private autoServ: AutoService) {}

  ngOnInit() {
    this.readAll()
  }

  readAll(){
    this.autoServ.getAll().subscribe((autos) => {
      this.autos = null;
      this.autos = autos;
    })
  }

  formatLabelYear(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1) {
      this.valoreScelto = value;
      return 'year ' + Math.round(value / 1);
    }

    return value;
  }

  formatLabelPrice(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 100) {
      return Math.round(value / 1) + '€';
    }

    return value;
  }

  search(f: NgForm) {
    this.autoServ.isFiltered = true;
    this.autoServ.filteredAutos = [];
    
    this.autoServ.search(f.value.search).subscribe(data => {
      console.log(data);
      this.autoServ.filteredAutos = data;
    })
  }

  filters(modello: string, costo: number, anno:number){
    this.type = '?';
    this.autoServ.isFiltered = true;
    
    console.log(modello);
    console.log(costo);
    console.log(anno);
    this.modello = modello;
    this.costo = costo;
    this.anno = anno;

    if(this.modello != null)
      this.type += 'modello=' + modello; 

    if(this.costo != null)
      this.type += '&costo=' + costo; 

    if(this.anno != null)
      this.type += '&anno=' + anno; 

    this.autoServ.filters(this.type).subscribe(data => {
      console.log(this.type);
      console.log(data);
      this.autoServ.filteredAutos = data;
      console.log(data);
    })

  }
  
}
