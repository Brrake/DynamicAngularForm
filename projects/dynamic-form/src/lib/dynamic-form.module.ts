import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form.component";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbCalendar, NgbCalendarGregorian, NgbModule, NgbTimepicker } from "@ng-bootstrap/ng-bootstrap";
import { ButtonLoaderComponent } from "./components/button-loader/button-loader.component";

@NgModule({
  declarations: [
    DynamicFormComponent,
    ButtonLoaderComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    ButtonLoaderComponent
  ],
  providers: [{ provide: NgbCalendar, useClass: NgbCalendarGregorian },{ provide: NgbTimepicker},],
})
export class DynamicFormModule { }
