import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/Services/users.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

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
  editable = new BehaviorSubject(false);
  editButtonText="Edit Email and Password"
  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.editable.subscribe((res:boolean)=>{
      if (res){
        this.email.enable()
        this.password.enable()
        this.editButtonText="Undo"
      } else {
        this.email.disable()
        this.password.disable()
        this.editButtonText="Edit Email and Password"
      }

    })
  }
  onEdit() {
    this.editable.next(!this.editable.getValue())
  }
  submitData() {
    let user = {
      email: this.email.value,
      password: this.password.value
    };
    this.userService.editUser(user)
  }
}
