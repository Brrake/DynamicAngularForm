import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form.component';
import { DynamicFormScheme } from '../../models/dynamic-form.model';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
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

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() formValueChanges = new EventEmitter<any>();
  @Output() formInit = new EventEmitter<{ id: string; form: FormGroup }>();

  isLoaded = true

  constructor() {
  }
  ngOnInit() {

  }
  /** Emitters **/
  onClose() {
    this.isLoaded = false

    this.dynForm?.resetAndGoToPage(0)

    this.onCloseModal.emit(true)
    this.isLoaded = true
  }
  onFormInit(event: any) {
    this.formInit.emit(event)
  }
  onSubmitForm(event: any) {
    this.onSubmit.emit(event);
  }
  onFormValueChanges(event: any) {
    this.formValueChanges.emit(event);
  }
  handleGoogleLoginV2(response: any) {
    this.loginWithGoogle.emit(response);
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
  submitDynamicForm(idx: number) {
    this.dynForm?.onSubmitForm(idx);
  }
  closeModal() {
    this.onClose()
    document.getElementById('closeDefModal-' + this.modalId)?.click()
  }
  openModal() {
    document.getElementById('openModal-' + this.modalId)?.click()
  }
}
