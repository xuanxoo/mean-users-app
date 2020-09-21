import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { User } from "../../core/types/user.interface";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private usreService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.usreService.getCurrentUser();
  }

}
