import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserRoutingModule } from "./user-routing.module";
import { LoginService } from "../core/services/login.service";
import { CoreModule } from "../../app/core/core.module";
import { SharedModule } from "../../app/shared/shared.module";
import { ProfileComponent } from "./profile/profile.component";
import { HttpClientModule } from "@angular/common/http";
import { ProfilePasswordComponent } from './profile/profile-password/profile-password.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, ProfilePasswordComponent, ProfileInfoComponent],
  imports: [UserRoutingModule, HttpClientModule, CoreModule.forRoot(), SharedModule.forRoot()],
  providers: [LoginService],
  bootstrap: []
})
export class UserModule { }
