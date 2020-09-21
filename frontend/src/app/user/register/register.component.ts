import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../core/services/user.service";
import { ToastrService } from "ngx-toastr";
import { ValidationService } from "src/app/core/components";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private validationService: ValidationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  register(): void {
    this.userService.create(this.registerForm.value).subscribe(
      (data) => {
        this.toastrService.success("Registration successful");
        this.router.navigate(["/login"]);
      },
      (error) => {
        this.toastrService.error("Error signing up user.");
      }
    );
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        username: ["", [Validators.required, this.validationService.emailValidator]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        mobile: ["", Validators.minLength(9)],
        country: [""],
        postalCode: [""]
      },
      {
        validator: this.validationService.mustMatch("password", "confirmPassword")
      }
    );
  }

}
