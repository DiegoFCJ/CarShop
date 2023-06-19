import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AutoService } from 'src/service/auto.service';
import { AutoDTO } from 'src/dto/auto';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { AcquistiService } from 'src/service/acquisti.service';
import { AcquistiDTO } from 'src/dto/acquistidto';
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2';


@Component({
  selector: 'app-admin-all-products',
  templateUrl: './admin-all-products.component.html',
  styleUrls: ['./admin-all-products.component.css']
})
export class AdminAllProductsComponent implements OnInit {

  data:any;
  options:any;

  displayedColumns: string[] = ['select', 'id', 'modello', 'prezzo', 'quantita', 'eye', 'trash'];
  dataSource: MatTableDataSource<AutoDTO>;
  selection = new SelectionModel<AutoDTO>(true, []);

  autos: AutoDTO[];
  
  
  //autotoinsert: AutoDTO = new AutoDTO();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private autoService: AutoService, private acquistiServ: AcquistiService) { }

  @Input() item: AcquistiDTO; // Input property che riceve l'oggetto item
  acquisti: AcquistiDTO[];
  acquistiData: Map<string, number>;
  summedQuantities = new Map<string, number>();
  venduti: number[];
  dailyQuantities: number[] = [];

  getAllByAcquistato(){
    this.acquistiServ.getAllByAcquistato().subscribe((acquisti) => {
      let acquistiData = new Map<string, number>();
      acquisti.forEach((e) => {
        let day = e.dataAcquisto.split("/")[0]; // get the day from the date string
        if (acquistiData.has(day)) {
          let currentQuantity = acquistiData.get(day)!;
          acquistiData.set(day, currentQuantity + e.quantita);
        } else {
          acquistiData.set(day, e.quantita);
        }
      });
      this.summedQuantities = acquistiData;
      for(let i = 0; i < 31; i++) {
        let day = (i + 1).toString().padStart(2, "0");
        this.summedQuantities.get(day) ? this.dailyQuantities.push(this.summedQuantities.get(day)) : this.dailyQuantities.push(0)
      }
      this.data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        datasets: [{
          label: 'Number of Items Sold in Days',
          data: this.dailyQuantities,
          backgroundColor: [
            'rgba(206, 234, 254,1)',
            'rgba(16, 152, 252,1)',
            'rgba(166, 15, 15,1)',
            'rgba(255, 99, 132, 1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(255, 159, 64, 1)',
            'rgba(210, 59, 102, 1)',
            'rgba(10, 112, 205, 1)',
            'rgba(0, 128, 0, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(110, 102, 255, 1)',
            'rgba(255, 0, 0, 1)' ],
        borderColor: [
          'rgba(16, 152, 252,1)',
          'rgba(166, 15, 15,1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
  ],
          fill: true,
          lineTension: 0,
          borderWidth: 2,
          weight: 1
        }]
      }
      this.options = {
        title: {
          text: "Line Chart",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  ngOnInit() {
    this.getAutos();
    this.getAllByAcquistato();
  }

  getAutos() {
    this.autoService.getAll().subscribe(autos => {
      this.autos = autos;
      this.dataSource = new MatTableDataSource<AutoDTO>(this.autos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(auto: AutoDTO) {

    Swal.fire({
      title: "Sei sicuro di voler eliminare la macchina?",
      text: "Procedendo eliminerai in via definitiva la macchina selezionata",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Elimina'
  }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire(
              'Cancellato!',
              "la macchina selezionata e` stata cancellata",
              'success'
          )

    this.autoService.delete(auto.id).subscribe(() => this.getAutos());
  }
})

}

  update(auto: AutoDTO) {
    this.autoService.update(auto).subscribe(() => this.getAutos());
  }

  insert(auto: AutoDTO) {
    this.autoService.insert(auto).subscribe(() => this.getAutos());
  }

  /*clear(){
    this.autotoinsert = new AutoDTO();
  }*/

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource === undefined) {
      return false;
    }
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AutoDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}



