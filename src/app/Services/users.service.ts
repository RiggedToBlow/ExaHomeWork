import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { MatSnackBarRef, MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
const loggedUserKey = "LoggedInUser";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  currentPage: number;
  usersInPage: BehaviorSubject<any> = new BehaviorSubject({});
  isUserLogged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    public notifcate: MatSnackBar,
    private translate: TranslateService
  ) {
    this.currentPage = 1;
    this.moveUsersPage(this.currentPage);
  }

  backUsersPage() {
    if (this.currentPage - 1 < 1)
      this.translate.get("noMoreUsers").subscribe(transText => {
        this.notifcate.open(transText);
      });
    else this.moveUsersPage(--this.currentPage);
  }
  nextUsersPage() {
    let totalPages = this.usersInPage.getValue().total_pages;
    if (this.currentPage + 1 > totalPages)
      this.translate.get("noMoreUsers").subscribe(transText => {
        this.notifcate.open(transText);
      });
    else this.moveUsersPage(++this.currentPage);
  }
  moveUsersPage(page: number) {
    this.http
      .get("https://reqres.in/api/users?page=" + page)
      .subscribe((res: []) => {
        this.usersInPage.next(res);
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
      this.isUserLogged.next(user);
    }
  }

  logOut() {
    localStorage.removeItem(loggedUserKey);
    this.isUserLogged.next(null);
    this.translate.get("logOutMessage").subscribe(s => this.notifcate.open(s));
  }

  deleteUser(userToDelete) {
    this.http
      .delete("https://reqres.in/api/users/" + userToDelete.id)
      .subscribe(res =>
        this.translate.get("userDelete").subscribe(s => this.notifcate.open(s))
      );

    let users = { ...this.usersInPage.getValue() };
    users.data = [
      ...users.data.filter((user: any) => user.id !== userToDelete.id)
    ];
    this.usersInPage.next(users);
  }

  editUser(userToEdit) {
    this.http.put("https://reqres.in/api/users/1", userToEdit).subscribe(
      (res: any) => {
        if (res.updatedAt) {
          this.translate
            .get("userUpdate")
            .subscribe(s => this.notifcate.open(s + res.updatedAt));
        }
      },
      error =>
        this.translate.get("errorUpdate").subscribe(s => this.notifcate.open(s))
    );
  }
}
