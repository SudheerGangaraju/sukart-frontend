import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { usersData } from './testData';

import { MatPaginator } from '@angular/material/paginator';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit, AfterViewInit {

  users$!: Observable<User[]>;
  todos = ['Learn Angular'];
  users = new MatTableDataSource<User>();

  options = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    showFirstLastButtons: true,
  };

  displayedColumns = ['id', 'name', 'email'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.users$ = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
    // }, 4000)
   // this.users$ = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
    //this.users$.pipe().subscribe(users => console.log(users));

    // this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe(users => {
    //   this.users.data = users;
    // });

    this.users.data = usersData;

      this.users.filterPredicate =
  (data, filter) => {
     return data.name
       .toLowerCase()
       .includes(filter);
  };

  }

  addTodo() {
    this.todos.push('New Task');
   this.todos = [...this.todos]; // Trigger change detection for OnPush strategy
  }

//   applyFilter(event: Event) {

//   const value = (event.target as HTMLInputElement).value;

//    this.users.filter = value.trim().toLowerCase(); 

//    //By default Angular Material searches ALL columns. To search only specific columns, we can define a custom filterPredicate.


// }

// ngAfterViewInit() {
//   this.users.paginator = this.paginator;
// }

ngAfterViewInit() {
 // this.users.paginator = this.paginator;

}
}
