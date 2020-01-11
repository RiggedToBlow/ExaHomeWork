import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "src/app/Services/users.service";
import { RouterLink, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(8)
  ]);

  constructor(
    private userService: UsersService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  submitData() {
    let user = {
      email: this.email.value,
      password: this.password.value
    };

    this.userService.loginUser(user).subscribe(
      (res: any) => {
        this.userService.saveUser(user);
        //this.userService.notifcate.open("You Have Logged in successfully")
        this.translate
          .get("logInMessage")
          .subscribe(s => this.userService.notifcate.open(s));
        this.router.navigate([""]);
      },
      error => {
        this.translate
          .get("loginError")
          .subscribe(s => this.userService.notifcate.open(s));
        console.log("Not Logged");
      }
    );
  }
}
