import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  /// Logged and unLogged logic here
  constructor(private userService:UsersService) { }
  user:any
  
  ngOnInit() {
    this.userService.isUserLogged.subscribe(res=>this.user=res)
  }
  logOut(){
    this.userService.logOut()
  }

}
