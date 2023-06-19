import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/service/user.service';
import { UserDTO } from 'src/dto/userdto';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2'

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['select', 'id', 'email', 'password', 'usertype', 'eye', 'trash'];
    dataSource: MatTableDataSource<UserDTO>;
    selection = new SelectionModel<UserDTO>(true, []);

    users: UserDTO[];
    user: UserDTO;
    //usertoinsert: UserDTO = new UserDTO();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private service: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.service.getAll().subscribe(users => {
            this.users = users
            this.dataSource = new MatTableDataSource<UserDTO>(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    delete(user: UserDTO) {

        Swal.fire({
            title: "Sei sicuro di voler eliminare l'account?",
            text: "Procedendo eliminerai in via definitiva l'account dell'utente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Elimina'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancellato!',
                    "L'account selezionato e` stato cancellato",
                    'success'
                )

                this.service.delete(user.id).subscribe(() => this.getUsers());
            }
        })

    }

    update(user: UserDTO) {
        this.service.update(user).subscribe(() => this.getUsers());
    }

    insert(user: UserDTO) {
        this.service.insert(user).subscribe(() => this.getUsers());
    }

    clear() {
        //this.usertoinsert = new UserDTO();
    }

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
    checkboxLabel(row?: UserDTO): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
}
