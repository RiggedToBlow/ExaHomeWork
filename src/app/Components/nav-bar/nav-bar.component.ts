import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/Services/users.service";
import { RouterLink, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  /// Logged and unLogged logic here
  constructor(private userService: UsersService, private router: Router, private translate: TranslateService) {}
  logged: boolean;
  ngOnInit() {
    this.userService.isUserLogged.subscribe(res => {
      console.log(res);
      if (res !== null && res !== undefined) this.logged = true;
      else this.logged = false;
    });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate([""]);
  }
  changeLangToAr() {
    if (this.translate.currentLang!='ar')
      this.translate.use('ar')
  }
  changeLangToEn() {
    if(this.translate.currentLang!='en')
      this.translate.use('en')
  }
}
