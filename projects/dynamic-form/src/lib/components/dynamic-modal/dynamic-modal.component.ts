import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../../dynamic-form.component';
import { DynamicFormScheme } from '../../models/dynamic-form.model';
import { FormGroup } from '@angular/forms';
import { IonButton, ModalController } from '@ionic/angular';
import { isPlatformServer } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
  standalone: false
})
export class DynamicModalComponent implements OnInit, OnChanges {

  @ViewChild('dyn_form') dynForm: DynamicFormComponent | undefined;
  @ViewChild('openButt') openButt!: IonButton;


  @Input() modalId: string = 'default-id';
  @Input() modalTitle: string = '';
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


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {
  }
  ngOnInit() {
    if (isPlatformServer(this.platformId)) return;
    if (this.modalPopup) {
      this.openModal()
    }
  }
  ngOnChanges(event: any) {
    if (isPlatformServer(this.platformId)) return;
    console.log('ng-content:', event);
  }
  onClose() {
    this.dynForm?.resetAndGoToPage(0)
    this.onCloseModal.emit(true)
  }
  onFormInit(event: any) {
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
  onSubmitForm(event: any) {
    this.onSubmit.emit(event);
  }
  onFormValueChanges(event: any) {
    this.formValueChanges.emit(event);
  }
  submitDynamicForm(idx: number) {
    this.dynForm?.onSubmitForm(idx);
  }
  closeModal() {
    this.onClose()
    this.modalCtrl.dismiss();
  }

  handleGoogleLoginV2(response: any) {
    this.loginWithGoogle.emit(response);
  }
  async openModal() {
    const button = document.querySelector('#open-'+this.modalId) as HTMLIonButtonElement;
    button.click();
  }
  get translateClose() {
    const currLang = this.translate.currentLang
    return currLang == 'it' ? 'Chiudi' : 'Close'
  }
}
