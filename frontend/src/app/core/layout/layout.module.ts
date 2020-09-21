import { ModuleWithProviders, NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [RouterModule, CommonModule, SharedModule],
  exports: [LayoutComponent, HeaderComponent],
  providers: []
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: []
    };
  }
}
