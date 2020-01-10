import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/Services/users.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {


  users=[]
  constructor(private fetchService: UsersService) {
  }
  
  ngOnInit() {
    this.fetchService.usersInPage.subscribe((res:any)=>console.log(this.users=res.data))
  }
  onDelete(user:any){
    this.fetchService.deleteUser(user)
  }
  onView(user:any){
    this.fetchService.getUserById(user.id).subscribe((res:any)=>{

    })
  }

  onNext(){
    this.fetchService.nextUsersPage()
  }
  
  onBack(){
    this.fetchService.backUsersPage()
  }

}
