import { Component, OnInit, OnDestroy,  } from "@angular/core";
import { UsersService } from "src/app/Services/users.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription
  users=[]
  constructor(private fetchService: UsersService, private router: Router) {
  }
  
  ngOnInit() {
    this.subscription=this.fetchService.usersInPage.subscribe((res:any)=>console.log(this.users=res.data))
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  onDelete(user:any){
    this.fetchService.deleteUser(user)
  }
  onView(user:any){
    this.router.navigate(["user/"+user.id])
  }

  onNext(){
    this.fetchService.nextUsersPage()
  }

  onBack(){
    this.fetchService.backUsersPage()
  }

}
