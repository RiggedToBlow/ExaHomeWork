import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"user/:id",
    component:UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
