import { Component, OnInit } from "@angular/core";
import { User } from "../../types/user.interface";
import { UserService } from "../../services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  onLoggedout(): void {
    this.userService.removeCurrentUser();
  }

}
