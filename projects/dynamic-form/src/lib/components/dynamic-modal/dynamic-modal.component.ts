import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form.component';
import { DynamicFormScheme, DynamicSubmitEvent, SelectValueScheme } from '../../models/dynamic-form.model';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DynamicModalComponent implements OnInit {

  @ViewChild('dyn_form') dynForm: DynamicFormComponent | undefined;


  @Input() modalId: string = 'default-id';
  @Input() modalPopup: boolean = false
  @Input() modalCloseButton: boolean = false
  @Input() formSchemes: DynamicFormScheme[] = []
  @Input() loadSpinner: boolean = false
  @Input() isSubmitFailed: boolean = false
  @Input() errorMessage: string = '';
  @Input() modalBackdrop: string | boolean = true;
  @Input() disableSubmit: boolean = false

  @Output() onSubmit: EventEmitter<DynamicSubmitEvent> = new EventEmitter<DynamicSubmitEvent>();
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() formValueChanges = new EventEmitter<any>();
  @Output() formInit = new EventEmitter<{ id: string; form: FormGroup }>();

  protected isLoaded = true

  constructor() {
  }
  ngOnInit() {

  }
  protected onClose() {
    this.isLoaded = false

    this.dynForm?.resetAndGoToPage(0)

    this.onCloseModal.emit(true)
    this.isLoaded = true
  }
  protected onFormInit(event: any) {
    this.formInit.emit(event)
  }
  isFormValid(idx: number): boolean {
    return this.dynForm?.isFormValid(idx) || false
  }
  updateForm(idx: number, values: any) {
    this.dynForm?.updateForm(idx, values)
  }
  goToPage(page: number) {
    this.dynForm?.goToPage(page)
  }
  protected onSubmitForm(event: any) {
    this.onSubmit.emit(event);
  }
  protected onFormValueChanges(event: any) {
    this.formValueChanges.emit(event);
  }
  submitDynamicForm(idx: number) {
    this.dynForm?.onSubmitForm(idx);
  }
  closeModal() {
    this.onClose()
    document.getElementById('closeDefModal-' + this.modalId)?.click()
  }

  protected handleGoogleLoginV2(response: any) {
    this.loginWithGoogle.emit(response);
  }
  openModal() {
    document.getElementById('openModal-' + this.modalId)?.click()
  }
  changeDescription(idx: number, description: string) {
    this.dynForm?.changeDescription(idx, description)
  }
  changeDefaultValue(idx: number, formControlName: string, value: any) {
    this.dynForm?.changeDefaultValue(idx, formControlName, value)
  }
  changeVisibility(idx: number, formControlName: string, visible: boolean) {
    this.dynForm?.changeVisibility(idx, formControlName, visible)
  }
  fillSelects(idx: number, formControlName: string, values: SelectValueScheme[]) {
    this.dynForm?.fillSelects(idx, formControlName, values)
  }
  changeRangeDate(idx: number, formControlName: string, minDate: { year: number, month: number, day: number }, maxDate: { year: number, month: number, day: number }) {
    this.dynForm?.changeRangeDate(idx, formControlName, minDate, maxDate)
  }
  enableDates(idx: number, formControlName: string, values: any) {
    this.dynForm?.enableDates(idx, formControlName, values)
  }
  disableDates(idx: number, formControlName: string, values: any) {
    this.dynForm?.disableDates(idx, formControlName, values)
  }
}
