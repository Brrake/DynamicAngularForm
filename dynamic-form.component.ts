import { Component, EventEmitter, Input, OnInit, Output, isDevMode } from '@angular/core';
import { AddonType, ButtonType, DynamicFormScheme, Errors, FieldType } from './models/dynamic-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { linkValidator } from './custom_validators/link.validator';
import { confirmPasswordValidator } from './custom_validators/confirm-password.validator';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() formSchemes: DynamicFormScheme[] = []
  @Input() loadSpinner: boolean = false
  @Input() isSubmitFailed: boolean = false
  @Input() errorMessage: string = '';

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  public FieldTypesEnum: typeof FieldType = FieldType
  public AddonsEnum: typeof AddonType = AddonType
  public ButtonsEnum: typeof ButtonType = ButtonType

  displayImg: string = ''
  addTree: any = []

  isProd = isDevMode()

  formGroup: FormGroup[] = []


  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < this.formSchemes.length; i++) {
      const formScheme = this.formSchemes[i]
      this.formGroup[i] = new FormGroup({})
      for (let j = 0; j < formScheme.fields.length; j++) {
        const currField = formScheme.fields[j]
        if (
          currField.type != this.FieldTypesEnum.show_image &&
          currField.type != this.FieldTypesEnum.add_image &&
          currField.type != this.FieldTypesEnum.section_info
        ) {
          this.addFormControl(currField.formControlName as string, currField.default_value as string, currField.validators, i, currField.disabled as boolean)
        }
        if (currField.type == this.FieldTypesEnum.add_image) {
          if (currField.default_value) {
            this.displayImg = currField.default_value as string
          }
        }
      }
      for (let j = 0; j < formScheme?.custom_validators?.length; j++) {
        switch (formScheme.custom_validators[j].name) {
          case 'confirmPasswordValidator': {
            this.formGroup[i].setValidators(confirmPasswordValidator)
            break
          }
          case 'linkValidator': {
            this.formGroup[i].setValidators(linkValidator)
            break
          }
        }
      }
    }
  }
  addFormControl(fieldName: string, default_value: string, validators: any, formGroupIndex: number, fieldDisabled: boolean) {
    let valArr = []
    for (let i = 0; i < validators?.length; i++) {
      const val = validators[i]
      switch (val.name.toLowerCase()) {
        case Errors.required: {
          valArr.push(Validators.required)
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
        case Errors.email: {
          valArr.push(Validators.email)
          break;
        }
      }

    }
    this.formGroup[formGroupIndex].addControl(fieldName, new FormControl({
      value: default_value,
      disabled: fieldDisabled
    }, Validators.compose(valArr)));
  }
  getSliderOptions(options: any) {
    let body = {
      ...options,
      getPointerColor: (value: number) => {
        return 'var(--bs-primary)'
      }
    }
    return body
  }
  updateForm(formGroup: number, values: any) {
    this.formGroup[formGroup].patchValue(values)
  }
  onSubmitForm() {
    this.onSubmit.emit({ forms: this.formGroup, files: this.addTree });
  }
  onTestSubmit() {
    console.log(this.formGroup)
    console.log(this.addTree)
  }
  onBack(page: number) {
    this.goToPage(page)
    this.formGroup[page + 1].reset()
    //this.ngOnInit()
  }
  onClose() {
    this.onCloseModal.emit(true)
  }
  resetAndGoToPage(page: number) {
    for (let i = 0; i < this.formSchemes.length; i++) {
      this.formGroup[i].reset()
    }
    this.goToPage(page)
    this.ngOnInit()
  }
  getDisplayImg() {
    return this.displayImg
  }
  openSelectorFiles(id: string) {
    const selector = document.getElementById(id) as HTMLElement
    selector.click()
  }
  toAdd(event: any) {
    this.addTree = []
    this.displayImg = URL.createObjectURL(event.target.files[0])
    console.log(event.target.files, this.displayImg)
    for (let file of event.target.files) {
      var src = URL.createObjectURL(file);
      this.addTree.push({ file: file, src: src });
    }
  }
  handleGoogleLoginV2(response: any) {
    this.loginWithGoogle.emit(response);
  }
  public goToPage(page: number): void {
    //Se la pagina non esiste
    if (page > this.formSchemes.length) {
      return
    }
    //Se la pagina è dopo la prima
    for (let i = 0; i < this.formSchemes.length; i++) {
      this.formSchemes[i].active_page = false
    }
    this.formSchemes[page].active_page = true
  }
}
