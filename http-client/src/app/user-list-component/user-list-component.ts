import { Component, OnInit } from '@angular/core';
import { ApiService, User } from '../api-service';

@Component({
  imports: [],
  selector: 'app-user-list-component',
  styleUrl: './user-list-component.css',
  templateUrl: './user-list-component.html',
})
export class UserListComponent implements OnInit {
  public users:User[] =[];
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.getUsers().subscribe((data)=>{
      this.users = data;
      console.log('USERS HERE: ', data);
    });
  }
}
