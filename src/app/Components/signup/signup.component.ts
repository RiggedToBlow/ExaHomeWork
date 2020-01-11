import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/Services/users.service";
import { Router } from "@angular/router";

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

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {}

  submitData() {
    let user = {
      email: this.email.value,
      password: this.password.value
    };

    this.userService.registerUser(user).subscribe((res: any) => {
      if (res.token) {
        this.userService.notifcate.open(
          "User Registerd Successfully and your id is " + res.id
        );
        this.router.navigate([""])
      } else this.userService.notifcate.open("Error in Registering User");
    });
  }
}
