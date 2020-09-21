import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { User } from "../types/user.interface";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): User {
    if (localStorage.getItem("currentUser")) {
      return JSON.parse(localStorage.getItem("currentUser"));
    }
  }

  removeCurrentUser(): void {
    localStorage.removeItem("currentUser");
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  create(user: User): Observable<User> {
    return this.http.post(environment.apiEndpoint + "/users", user).pipe(
      map((user: any) => {
        return user.data;
      })
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(environment.apiEndpoint + "/user/" + user._id, user).pipe(
      map((user: any) => {
        return user.data;
      })
    );
  }

  changePassword(id: string, password: string): Observable<User> {
    return this.http.put(environment.apiEndpoint + "/user/changepassword/" + id, { password: password }).pipe(
      map((res: any) => res.data));
  }

  delete(_id: string) {
    return this.http.delete(environment.apiEndpoint + "/user/" + _id);
  }
}
