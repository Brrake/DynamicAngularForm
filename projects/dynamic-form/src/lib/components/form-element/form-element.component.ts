import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldType, SelectValueScheme } from '../../models/dynamic-form.model';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent {
  @Input() id:string = '';
  @Input() type:FieldType = FieldType.text;
  @Input() label:string = 'Example';
  @Input() form:any;
  @Input() formName:string = 'example';
  // Select
  @Input() values:SelectValueScheme[] = [];
  // Slider
  @Input() options:any;
  // OTP
  @Input() length:number = 6;
  // show_video and show_image
  @Input() controls:string='';
  @Input() width!:string;
  @Input() src:string='';
  // add_image
  @Input() multiple:boolean=false;
  @Input() accept:string='';
  @Output() onChooseMedia: EventEmitter<any> = new EventEmitter()

  // Date
  @Input() minDate:any;
  @Input() maxDate:any;
  defMinDate = { year: 1930, month: 1, day: 1 }
  defMaxDate = { year: new Date().setFullYear(new Date().getFullYear()+5), month: 12, day: 31 }
  //G-Recaptcha
  @Input() version:string = '';

  // Errors
  @Input() errors:any[] = [];


  displayImg: string = ''
  displayVideo: string = ''
  private addTree: any = []
  private addVideoTree: any = []
  private itis_info: any[] = []
  public FieldTypesEnum: typeof FieldType = FieldType

  constructor(private translate:TranslateService) { }

  sanitizeInput(formControlName: string) {
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
  // otp
  onOtpChange(event: any, formControlName: string) {
    this.form.patchValue({ [formControlName]: event })
  }
  // phone
  updatePhoneField(event: any, formControlName: string): void {
    const newDefault = event.target.value;
    let currIti = this.itis_info.find(iti => iti.formControlName == formControlName);
    const newValue = { formatted: `${currIti.iti?.getNumber()}`, default: newDefault };
    this.form.get(formControlName)?.setValue(newValue);
  }
  // add image
  openSelectorFiles(id: string) {
    const selector = document.getElementById(id) as HTMLElement
    selector.click()
  }
  toAdd(event: any, mode: string = 'img') {
    if (mode == 'img') {
      this.addTree = []
      this.displayImg = URL.createObjectURL(event.target.files[0])
      for (let file of event.target.files) {
        var src = URL.createObjectURL(file);
        this.addTree.push({ file: file, src: src });
      }
      this.onChooseMedia.emit({
        files:this.addTree,
        mode:mode
      });
    } else if (mode == 'video') {
      this.addVideoTree = []
      this.displayVideo = URL.createObjectURL(event.target.files[0])
      for (let file of event.target.files) {
        var src = URL.createObjectURL(file);
        this.addVideoTree.push({ file: file, src: src });
      }
      this.onChooseMedia.emit({
        files:this.addVideoTree,
        mode:mode
      });
    }
  }
  getTranslatedName(field:any, key: string = 'name'): string {
    const currLang = this.translate.currentLang
    if(currLang != 'it' && field[key+'_'+currLang] != undefined) return field[key+'_'+currLang]
    return field[key]
  }
}
