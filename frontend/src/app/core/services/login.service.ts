import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { UserService } from "src/app/core/services";
import { User } from "../types/user.interface";
import { Observable } from "rxjs";

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<any>(environment.apiEndpoint + "/user/authenticate", {
        username: username,
        password: password
      })
      .pipe(
        map((rs: any) => {
          // logged
          if (rs && rs.data && rs.data.token) {
            // save user in local storage to keep it between screens
            if (typeof window !== "undefined") {
              this.userService.updateCurrentUser(rs.data);
            }
          }
          return rs.data;
        })
      );
  }

  logout() {
    // remove user from local storage
    if (typeof window !== "undefined") {
      this.userService.removeCurrentUser();
    }
  }
}
