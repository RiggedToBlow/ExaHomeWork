import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { MatSnackBarRef, MatSnackBar } from "@angular/material/snack-bar";
const loggedUserKey = "LoggedInUser";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  currentPage: number;
  usersInPage: BehaviorSubject<any[]> = new BehaviorSubject([]);
  isUserLogged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient, public notifcate: MatSnackBar) {
    this.currentPage = 1;
    this.moveUsersPage(this.currentPage);
  }
  
  backUsersPage() {
    this.usersInPage.subscribe((res: any) => {
      if (this.currentPage - 1 < 1)
        this.notifcate.open("Sorry there's no pages left, that's all we know");
      else this.moveUsersPage(--this.currentPage);
    });
  }
  nextUsersPage() {
    this.usersInPage.subscribe((res: any) => {
      if (res.total_pages < this.currentPage + 1)
        this.notifcate.open("Sorry there's no pages left, that's all we know");
      else this.moveUsersPage(++this.currentPage);
    });
  }
  moveUsersPage(page: number) {
    this.http
      .get("https://reqres.in/api/users?page=" + page)
      .subscribe((res: []) => {
        this.usersInPage.next(res);
        console.log(this.usersInPage);
      });
  }

  getUserById(id: number) {
    return this.http.get("https://reqres.in/api/users/" + id);
  }

  registerUser(user: { email; password }) {
    return this.http.post("https://reqres.in/api/register", user);
  }

  loginUser(user: { email; password }) {
    return this.http.post("https://reqres.in/api/login", user);
  }

  isLogged() {
    return this.isUserLogged.next(
      JSON.parse(localStorage.getItem(loggedUserKey))
    );
  }

  saveUser(user: any) {
    if (!localStorage.getItem(loggedUserKey)) {
      localStorage.setItem(loggedUserKey, JSON.stringify(user));
      this.isUserLogged.next(user)
    }
  }

  logOut() {
    localStorage.removeItem(loggedUserKey);
    this.isUserLogged.next(null);
    console.log(this.isUserLogged.getValue());
    this.notifcate.open("You Logged Out Successfully", "Ok")
  }

  deleteUser(userToDelete) {
    this.http.delete("https://reqres.in/api/users/" + userToDelete.id);
    let arr = [
      ...this.usersInPage
        .getValue()
        .filter((user: any) => user.id !== userToDelete.id)
    ];
    this.usersInPage.next(arr);
  }

  editUser(userToEdit, id) {
    this.http.post("https://reqres.in/api/user/" + id, userToEdit);
  }
}
