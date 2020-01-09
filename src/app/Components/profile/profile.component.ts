import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/Services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  email = new FormControl({ value: "", disabled: true }, [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl({ value: "", disabled: true }, [
    Validators.required,
    Validators.minLength(8)
  ]);
  editable = false;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {}
  onEdit() {
    this.editable = true;
  }
  submitData() {
    let user = {
      email: this.email.value,
      password: this.password.value
    };
  }
}
