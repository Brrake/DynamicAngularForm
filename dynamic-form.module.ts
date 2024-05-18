import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form.component";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbCalendar, NgbCalendarGregorian, NgbModule, NgbTimepicker } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent
  ],
  providers: [{ provide: NgbCalendar, useClass: NgbCalendarGregorian },{ provide: NgbTimepicker},],
})
export class SharedCamiAppModules { }
