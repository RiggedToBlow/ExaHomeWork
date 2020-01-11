import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/Services/users.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);

  password = new FormControl("", [
    Validators.required,
    Validators.minLength(8)
  ]);

  confirmPassword = new FormControl("", [
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

    this.userService.registerUser(user).subscribe((res: any) => {
      if (res.token) {
        this.translate
          .get("userRegister")
          .subscribe(s => this.userService.notifcate.open("s" + res.id));
        this.router.navigate([""]);
      } else this.translate.get("errorRegister").subscribe(s=>this.userService.notifcate.open(s))
    });
  }
}
