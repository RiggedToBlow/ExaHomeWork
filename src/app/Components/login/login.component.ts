import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "src/app/Services/users.service";
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  
  email = new FormControl("",[
    Validators.required,
    Validators.email
  ]);
  password = new FormControl("",[
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
    
    this.userService.loginUser(user).subscribe(
      (res: any) => {
        this.userService.saveUser(user);
        console.log("Logged");
        this.router.navigate([""])
      },
      error => {
        this.userService.notifcate.open("Error: email or password is incorrect")
        console.log("Not Logged");
      }
    );
  }
}
