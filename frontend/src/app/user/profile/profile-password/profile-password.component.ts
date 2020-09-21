import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ValidationService } from "src/app/core/components";
import { UserService } from "src/app/core/services";
import { User } from "src/app/core/types/user.interface";

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {
  @Input() userData: User;
  passwordForm: FormGroup;

  constructor(
    private usreService: UserService,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private toastrService: ToastrService,
    private router: Router) { }

  createPasswordForm(): void {
    this.passwordForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: this.validationService.mustMatch("password", "confirmPassword")
      }
    );
  }

  updatePassword(): void {
    console.log(this.userData._id);
    this.usreService.changePassword(this.userData._id, this.passwordForm.get("password").value).subscribe(
      () => {
        this.toastrService.success("Profile updated successful");
        this.router.navigate(["/login"]);
      },
      (error) => { console.log(error); this.toastrService.error("Error updating password: " + error.message); }
    );
  }

  ngOnInit(): void {
    this.createPasswordForm();
    this.passwordForm.get("username").patchValue(this.userData.username);
  }

}
