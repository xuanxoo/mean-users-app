import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "../../core/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    // reset login status
    this.createForm();
    this.loginService.logout();

    // get return url from route parameters or default to "/"
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || "/";
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(loginForm: FormGroup): void {
    if (loginForm.valid) {
      this.loginService
        .login(
          loginForm.controls.userName.value,
          loginForm.controls.password.value
        )
        .subscribe(
          () => {
            this.router.navigate([this.returnUrl]);
          },
          () => {
            this.toastrService.error("User name or password is invalid.");
          }
        );
    } else {
      this.toastrService.error("Please enter valid credentails");
    }
  }

}
