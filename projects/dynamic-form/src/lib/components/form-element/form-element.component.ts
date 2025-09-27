import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Errors, FieldType, SelectValueScheme } from '../../models/dynamic-form.model';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss'],
  standalone: false
})
export class FormElementComponent implements OnInit {
  @Input() id: string = '';
  @Input() type: FieldType = FieldType.text;
  @Input() label: string = 'Example';
  @Input() topLabel: string = 'Example';
  @Input() form: FormGroup = new FormGroup({});
  @Input() formName: string = 'example';
  @Input() disabled: boolean = false;
  @Input() autocomplete: boolean = false;
  // Select
  @Input() values: SelectValueScheme[] = [];
  // Slider
  @Input() options: any;
  // OTP
  @Input() length: number = 6;
  // show_video and show_image
  @Input() controls: string = '';
  @Input() width!: string;
  @Input() src: string = '';
  // add_image
  @Input() displayMedia: string = ''
  @Input() multiple: boolean = false;
  @Input() accept: string = '';
  @Output() onChooseMedia: EventEmitter<any> = new EventEmitter()

  // Date
  @Input() minDate: any;
  @Input() maxDate: any;
  defMinDate = {}
  defMaxDate = {}
  //G-Recaptcha
  @Input() version: string = '';

  // Time
  @Input() meridian: boolean = false
  @Input() seconds: boolean = true

  // Errors
  @Input() errors: any[] = [];
  @Input() validators: any[] = [];

  @Output() onChange = new EventEmitter<any>()

  public FieldTypesEnum: typeof FieldType = FieldType

  constructor(private translate: TranslateService) {
    this.defMinDate = { year: 1930, month: 1, day: 1 }
    let dateY = new Date()
    dateY.setFullYear(dateY.getFullYear() + 5)
    this.defMaxDate = { year: dateY.getFullYear(), month: 12, day: 31 }
  }
  ngOnInit() {
    if (!this.form) return
    this.form.valueChanges.subscribe((e: any) => {
      this.onChange.emit(e)
    })
  }
  getFormattedDate(date: any) {
    return `${date.year}-${date.month < 10 ? '0' + date.month : date.month}-${date.day < 10 ? '0' + date.day : date.day}T00:00:00`;
  }
  sanitizeInput(formControlName: string) {
    if (!this.form) return
    const control = this.form.get(formControlName);
    if (control) {
      const sanitizedValue = control.value.replace(/<[^>]*>/g, "");
      control.setValue(sanitizedValue, { emitEvent: false });
    }
  }
  getRealFieldType(fieldType: string) {
    return fieldType.replace(/_/g, '-').toLowerCase().trim()
  }
  // slider
  getSliderOptions(options: any) {
    let body = {
      ...options,
      getPointerColor: (value: number) => {
        return 'var(--ion-color-primary)'
      }
    }
    return body
  }
  // add image
  openSelectorFiles(id: string) {
    const selector = document.getElementById(id) as HTMLElement
    selector.click()
  }
  toAdd(event: any, mode: string = 'img') {
    let addTree = []
    this.displayMedia = URL.createObjectURL(event.target.files[0])
    for (let file of event.target.files) {
      var src = URL.createObjectURL(file);
      addTree.push({ file: file, src: src, id: this.id, });
    }
    this.onChooseMedia.emit({
      id: this.id,
      files: addTree,
      mode: mode
    });
  }
  getErrorText() {
    for (let error of this.errors) {
      if (this.form?.get(this.formName || '')?.errors?.[error.name.toLowerCase()]) return this.getTranslatedName(error, 'text')
    }
    return ""
  }
  selectPhoneField(phone: any) {
    this.form.get(this.formName || '')?.setValue(phone)
  }
  getTranslatedName(field: any, key: string = 'name'): string {
    const currLang = this.translate.currentLang
    if (currLang != 'it' && field[key + '_' + currLang] != undefined) return field[key + '_' + currLang]
    return field[key]
  }
  get maxLengthError() {
    return this.validators.find(e => e.name == Errors.maxlength)?.value || null
  }
}
