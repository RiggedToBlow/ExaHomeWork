import { Component, OnInit } from '@angular/core';
import { UsersService } from './Services/users.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Free-for-all Social, where you can delete your friends';
  constructor(private userService: UsersService, private translate: TranslateService){
    translate.setDefaultLang('ar')
  }
  ngOnInit(){
    this.userService.isLogged()
  }
}
