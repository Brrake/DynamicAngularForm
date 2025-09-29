import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldType, SelectValueScheme } from '../../models/dynamic-form.model';
import { TranslateService } from '@ngx-translate/core';

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
  @Input() form: any;
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
  defMinDate = { year: 1930, month: 1, day: 1 }
  defMaxDate = { year: new Date().setFullYear(new Date().getFullYear() + 5), month: 12, day: 31 }
  //G-Recaptcha
  @Input() version: string = '';

  // Time
  @Input() meridian: boolean = false
  @Input() seconds: boolean = true

  // Errors
  @Input() errors: any[] = [];

  @Output() onChange = new EventEmitter<any>()

  showPassword = false

  public FieldTypesEnum: typeof FieldType = FieldType

  constructor(private translate: TranslateService) { }
  ngOnInit() {
    if (!this.form) return
    this.form.valueChanges.subscribe((e: any) => {
      this.onChange.emit(e)
    })
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
        return 'var(--bs-primary)'
      }
    }
    return body
  }
  selectPhoneField(phone: any) {
    this.form.get(this.formName || '')?.setValue(phone)
  }
  // otp
  onOtpChange(event: any, formControlName: string) {
    this.form.patchValue({ [formControlName]: event })
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
  getTranslatedName(field: any, key: string = 'name'): string {
    const currLang = this.translate.currentLang
    if (currLang != 'it' && field[key + '_' + currLang] != undefined) return field[key + '_' + currLang]
    return field[key]
  }
}
