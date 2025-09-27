import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { AddonType, ButtonType, DynamicFormScheme, DynamicSubmitEvent, Errors, FieldType, HrefTypes } from './models/dynamic-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { linkValidator } from './custom_validators/link.validator';
import { confirmPasswordValidator } from './custom_validators/confirm-password.validator';
import { phoneValidator } from './custom_validators/phoneValidator.validator';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ReCaptchaV3Service } from 'ng-recaptcha-2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: false
})
export class DynamicFormComponent implements OnInit {

  @Input() formSchemes: DynamicFormScheme[] = []
  @Input() loadSpinner: boolean = false
  @Input() isSubmitFailed: boolean = false
  @Input() errorMessage: string = '';
  @Input() isOnModal: boolean = false;
  @Input() disableSubmit: boolean = false

  @Output() onSubmit: EventEmitter<DynamicSubmitEvent> = new EventEmitter<DynamicSubmitEvent>();
  @Output() onCloseForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() formValueChanges = new EventEmitter<any>();

  @Output() formInit = new EventEmitter<{ id: string; form: FormGroup }>();


  public FieldTypesEnum: typeof FieldType = FieldType
  public AddonsEnum: typeof AddonType = AddonType
  public ButtonsEnum: typeof ButtonType = ButtonType
  public hrefTypes: typeof HrefTypes = HrefTypes


  displayImg: string[] = []
  displayVideo: string[] = []
  addTree: any = []
  addVideoTree: any = []
  formGroup: FormGroup[] = []
  emittedForms: any[] = []

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private recaptchaV3Service: ReCaptchaV3Service,
    private translate: TranslateService
  ) {
  }
  ngOnInit() {
    if (isPlatformServer(this.platformId)) return;
    this.emittedForms = []
    for (let i = 0; i < this.formSchemes.length; i++) {
      const formScheme = this.formSchemes[i]
      this.formGroup[i] = new FormGroup({})
      for (let j = 0; j < formScheme.fields.length; j++) {
        const currField = formScheme.fields[j]
        if (
          currField.type != this.FieldTypesEnum.show_image &&
          currField.type != this.FieldTypesEnum.add_image &&
          currField.type != this.FieldTypesEnum.add_video &&
          currField.type != this.FieldTypesEnum.show_video &&
          currField.type != this.FieldTypesEnum.section_info
        ) {
          this.addFormControl(currField.formControlName as string, currField.default_value as string, currField.validators, i, currField.disabled as boolean, currField.type)
        }
        if (currField.type == this.FieldTypesEnum.add_image) {
          this.displayImg.fill('', 0, formScheme.fields.length)
          if (currField.default_value) {
            this.displayImg[j] = currField.default_value as string
          }
        } if (currField.type == this.FieldTypesEnum.add_video) {
          this.displayVideo.fill('', 0, formScheme.fields.length)
          if (currField.default_value) {
            this.displayVideo[j] = currField.default_value as string
          }
        }
      }
      for (let j = 0; j < formScheme?.custom_validators?.length; j++) {
        switch (formScheme.custom_validators[j].name) {
          case 'confirmPasswordValidator': {
            this.formGroup[i].addValidators(confirmPasswordValidator)
            break
          }
          case 'linkValidator': {
            this.formGroup[i].addValidators(linkValidator)
            break
          }
        }
      }
      this.formInit.emit({ id: formScheme.formId, form: this.formGroup[i] });
      Object.keys(this.formGroup[i].controls).forEach(controlName => {
        this.formGroup[i].controls[controlName].valueChanges.subscribe(value => {
          this.formValueChanges.emit({
            control: controlName,
            value: {
              ...this.formGroup[i].value,
              [controlName]: value
            },
            formIdx: i
          });
        });
      });
    }

  }
  private addFormControl(fieldName: string, default_value: any, validators: any, formGroupIndex: number, fieldDisabled: boolean, fieldType: string) {
    let valArr = []
    for (let i = 0; i < validators?.length; i++) {
      const val = validators[i]
      switch (val.name.toLowerCase()) {
        case Errors.required: {
          valArr.push(Validators.required)
          break;
        }
        case Errors.telephone: {
          valArr.push(phoneValidator)
          break;
        }
        case Errors.maxlength: {
          valArr.push(Validators.maxLength(val.value))
          break;
        }
        case Errors.minlength: {
          valArr.push(Validators.minLength(val.value))
          break;
        }
        case Errors.pattern: {
          valArr.push(Validators.pattern(val.value))
          break;
        }
        case Errors.min: {
          valArr.push(Validators.min(val.value))
          break;
        }
        case Errors.max: {
          valArr.push(Validators.max(val.value))
          break;
        }
        case Errors.email: {
          valArr.push(Validators.email)
          break;
        }
      }

    }
    let value = default_value
    const today = new Date();
    if (fieldType == FieldType.date) {
      if (!value) {
        value = today.toISOString()
      } else {
        if(!value?.year) value.year = today.getFullYear()
        if(!value?.month) value.month = this.formatDateDigital((today.getMonth() + 1).toString())
        if(!value?.day) value.day = this.formatDateDigital(today.getDate().toString())
        const iso = value.year + '-' + this.formatDateDigital(value.month) + '-' + this.formatDateDigital(value.day) + 'T00:00:00.000Z'
        value = new Date(iso).toISOString()
      }
    } else if (fieldType == FieldType.time) {
      if (!value) {
        value = today.toISOString()
      } else {
        if(!value?.hour) value.hour = 0
        if(!value?.minute) value.minute = 0
        if(!value?.second) value.second = 0
        const hours = this.formatDateDigital(value.hour) + ':' + this.formatDateDigital(value.minute) + ':' + this.formatDateDigital(value.second) + '.000Z'
        const iso = today.getFullYear() + '-' + this.formatDateDigital((today.getMonth() + 1).toString()) + '-' + this.formatDateDigital(today.getDate().toString()) + 'T' + hours
        value = new Date(iso).toISOString()
      }
    }
    this.formGroup[formGroupIndex].addControl(fieldName, new FormControl({
      value: value,
      disabled: fieldDisabled
    }, Validators.compose(valArr)));
  }
  formatDateDigital(digit: string): string {
    return parseInt(digit) < 10 ? '0' + digit : digit
  }
  updateForm(formGroup: number, values: any) {
    this.formGroup[formGroup].patchValue(values)
  }
  onSubmitForm(idx: number) {
    // Se vuole usare recaptcha v3
    //this.formSchemes[idx].active_page = false
    if (this.formGroup[idx].invalid) return { success: false }
    this.formateDateForm(idx)

    let isV3GRecaptcha = false
    let fieldName = ''
    for (let i = 0; i < this.formSchemes[idx].fields.length; i++) {
      if (this.formSchemes[idx].fields[i].type == this.FieldTypesEnum.g_recaptcha) {
        if (this.formSchemes[idx].fields[i].version == 'v3') {
          isV3GRecaptcha = true
          fieldName = this.formSchemes[idx].fields[i].formControlName as string
          break
        }
      }
    }
    if (isV3GRecaptcha) {
      this.recaptchaV3Service.execute('importantAction')
        .subscribe((token) => {
          this.formGroup[idx].value[fieldName] = token
          this.emittedForms.push(this.formGroup[idx])
          this.onSubmit.emit({
            forms: this.formGroup, files: {
              images: this.addTree,
              videos: this.addVideoTree
            }, formEmittingIndex: idx, emittedForms: this.emittedForms
          });
        });
    } else {
      this.emittedForms.push(this.formGroup[idx])
      this.onSubmit.emit({
        forms: this.formGroup, files: {
          images: this.addTree,
          videos: this.addVideoTree
        }, formEmittingIndex: idx, emittedForms: this.emittedForms
      });
    }
    return { success: true }
  }
  formateDateForm(idx: number) {
    let dateFormNames = []
    let timeFormNames = []
    for (let i = 0; i < this.formSchemes[idx].fields.length; i++) {
      const currField = this.formSchemes[idx].fields[i]
      if (currField.type == this.FieldTypesEnum.date) {
        dateFormNames.push(currField.formControlName)
      } else if (currField.type == this.FieldTypesEnum.time) {
        timeFormNames.push(currField.formControlName)
      }
    }
    for (const key in this.formGroup[idx].controls) {
      const date = new Date(this.formGroup[idx].controls[key].getRawValue())
      if (dateFormNames.includes(key)) {
        const finalDate = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
        this.formGroup[idx].controls[key].setValue(finalDate)
      } else if (timeFormNames.includes(key)) {
        const finalDate = {
          hour: date.getHours(),
          month: date.getMinutes(),
          day: date.getSeconds()
        }
        this.formGroup[idx].controls[key].setValue(finalDate)
      }
    }
  }
  onTestSubmit() {
    this.formateDateForm(0)
    console.log(this.formGroup)
    console.log(this.addTree)
    console.log(this.addVideoTree)
  }
  onBackPage(page: number) {
    this.goToPage(page)
    this.formGroup[page + 1]?.reset()
    this.emittedForms = this.emittedForms.filter((form: any) => form !== this.formGroup[page])
    //this.ngOnInit()
    this.isSubmitFailed = false
    this.onBack.emit(true)
  }
  onClose() {
    this.goToPage(0)
    this.emittedForms = []
    this.addTree = []
    this.addVideoTree = []
    for (let i = 0; i < this.formGroup.length; i++) {
      this.formGroup[i].reset()
      const currScheme = this.formSchemes[i]?.fields as any
      let patchForm: Record<string, any> = {};
      for (let j = 0; j < currScheme.length; j++) {
        if (currScheme[j]) {
          patchForm[currScheme[j].formControlName] = currScheme[j].default_value
        }
      }
      this.formGroup[i].patchValue(patchForm)
    }
    this.onCloseForm.emit(true)
  }
  resetAndGoToPage(page: number) {
    for (let i = 0; i < this.formSchemes.length; i++) {
      this.formGroup[i].reset()
      const currScheme = this.formSchemes[i]?.fields as any
      let patchForm: Record<string, any> = {};
      for (let j = 0; j < currScheme.length; j++) {
        if (currScheme[j]) {
          patchForm[currScheme[j].formControlName] = currScheme[j].default_value
        }
      }
      this.formGroup[i].patchValue(patchForm)
    }
    this.goToPage(page)
    this.emittedForms = []
    this.ngOnInit()
  }

  handleGoogleLoginV2(response: any) {
    this.loginWithGoogle.emit(response);
  }
  public goToPage(page: number): void {
    if (!this.formSchemes?.[page]) return;
    //Se la pagina non esiste
    if (page > this.formSchemes.length) {
      return
    }
    this.addTree = []
    this.addVideoTree = []
    //Se la pagina è dopo la prima
    for (let i = 0; i < this.formSchemes.length; i++) {
      this.formSchemes[i].active_page = false
    }
    this.formSchemes[page].active_page = true
  }
  isFormValid(idx: number): boolean {
    return this.formGroup[idx]?.valid
  }
  closeModal() {
    if (this.isOnModal) setTimeout(() => { document.getElementById('closeModalButt')?.click() });
  }

  getTranslatedName(field: any, key: string = 'name'): string {
    const currLang = this.translate.currentLang
    if (currLang != 'it' && field[key + '_' + currLang] != undefined) return field[key + '_' + currLang]
    return field[key]
  }

  onChooseMedia(event: any, id: string) {
    if (event.mode == 'img') {
      this.addTree = this.addTree.filter((file: any) => file.id != id)
      this.addTree = [
        ...this.addTree,
        ...event.files
      ]
    } else if (event.mode == 'video') {
      this.addVideoTree = this.addVideoTree.filter((file: any) => file.id != id)
      this.addVideoTree = [
        ...this.addVideoTree,
        ...event.files
      ]
    }
  }
}
