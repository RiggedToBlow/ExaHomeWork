import { Component, OnInit } from '@angular/core';
import { UsersService } from './Services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Free-for-all Social, where you can delete your friends';
  constructor(private userService: UsersService){
  }
  ngOnInit(){
    this.userService.isLogged()
  }
}
