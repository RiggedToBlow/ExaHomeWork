import { Component, OnInit } from "@angular/core";
import { UsersService } from 'src/app/Services/users.service';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  imageLink: string;
  firstName: string;
  lastName: string;
  email: string;
  id : number
  constructor(private userService:UsersService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id")
    this.userService.getUserById(this.id).subscribe((res:any)=>{
      this.imageLink=res.data.avatar
      this.firstName=res.data.first_name
      this.lastName=res.data.last_name
      this.email=res.data.email
    })
  }
}
