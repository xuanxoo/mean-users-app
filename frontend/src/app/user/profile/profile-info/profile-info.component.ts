import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/core/services";
import { User } from "src/app/core/types/user.interface";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @Input() userData: User;
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router) { }

  createProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      _id: [""],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      mobile: ["", [Validators.required, Validators.minLength(9)]],
      country: [""],
      postalCode: [""]
    });
  }

  updateProfile(): void {
    this.userService.update(this.profileForm.value).subscribe(
      (user: User) => {
        this.toastrService.success("Profile updated successful");
        user.token = user.token;
        this.userService.updateCurrentUser(user);
      },
      (error) => { this.toastrService.error("Error update profile: " + error); }
    );
  }

  deleteProfile(): void {
    this.userService.delete(this.profileForm.value._id).subscribe(
      () => {
        this.toastrService.success("Profile removed successful");
        this.userService.removeCurrentUser();
        this.router.navigate(["/login"]);
      },
      (error) => { this.toastrService.error("Error removing profile: " + error); }
    );
  }

  ngOnInit(): void {
    this.createProfileForm();
    this.profileForm.patchValue(this.userData);
  }

}
