import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/Services/users.service";
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  /// Logged and unLogged logic here
  constructor(private userService: UsersService, private router: Router) {}
  logged: boolean;
  ngOnInit() {
    this.userService.isUserLogged.subscribe(res => {
      if (res!==null)
        this.logged=true
      else
        this.logged=false
    });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate([""]);
  }
}
