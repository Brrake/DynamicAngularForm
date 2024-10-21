import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form.component';
import { DynamicFormScheme } from '../../models/dynamic-form.model';



@Component({
  selector: 'dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss']
})
export class DynamicModalComponent implements OnInit {

  @ViewChild('dyn_form') dynForm: DynamicFormComponent | undefined;


  @Input() modalId: string = 'dafault-id';
  @Input() modalPopup: boolean = false
  @Input() modalCloseButton: boolean = false
  @Input() formSchemes: DynamicFormScheme[] = []
  @Input() loadSpinner: boolean = false
  @Input() isSubmitFailed: boolean = false
  @Input() errorMessage: string = '';
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

  isLoaded = true

  constructor() {
  }
  ngOnInit() {

  }
  onClose = () => {
    this.isLoaded = false

    this.dynForm?.resetAndGoToPage(0)

    this.onCloseModal.emit(true)
    this.isLoaded = true
  }
  isFormValid(idx: number): boolean {
    return this.dynForm?.isFormValid(idx) || false
  }
  updateForm(idx:number, values:any) {
    this.dynForm?.updateForm(idx, values)
  }
  goToPage(page: number) {
    this.dynForm?.goToPage(page)
  }
  onSubmitForm(event: any) {
    this.onSubmit.emit(event);
  }
  submitDynamicForm(idx: number) {
    this.dynForm?.onSubmitForm(idx);
  }
  closeModal(){
    this.onClose()
    document.getElementById('closeDefModal-'+this.modalId)?.click()
  }

  handleGoogleLoginV2(response: any) {
    this.loginWithGoogle.emit(response);
  }
  openModal() {
    document.getElementById('openModal-'+this.modalId)?.click()
  }
}
