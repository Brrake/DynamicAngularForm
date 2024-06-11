export interface DynamicFormScheme {
  formId:string
  title:string
  description?:string
  active_page?:boolean
  fields:FieldScheme[]
  buttons:ButtonScheme[]
  addons:AddonScheme[]
  custom_validators:CustomValidatorScheme[]
}
export interface FieldScheme {
  type:FieldType
  name?:string
  src?:string
  options?:any
  width?:string
  disabled?:boolean
  formControlName?:string
  default_value?:string | number | boolean | {year:number,month:number,day:number} | {hour:number,minute:number}
  values?:SelectValueScheme[]
  top_label?:string
  validators?:ValidatorScheme[]
  errors?:ErrorScheme[]
}

export interface SelectValueScheme {
  name:string
  value:string
}

export interface AddonScheme {
  name:AddonType
  style?:number
}

// Buttons
export interface ButtonScheme {
  type:ButtonType
  name:string
  text_color:string
  button_color:string,
  page?:number
}

// Errors and Validators
export interface CustomValidatorScheme {
  name:string
  error_name:string
  text:string
}
export interface ErrorScheme {
  name:Errors
  text:string
}
export interface ValidatorScheme {
  name:Errors
  value:string
}

/*
 *  Types
 */
// Addons Types
export enum AddonType {
  change_pass = 'change-pass',
  signup = 'signup',
  login = 'login',
  google_login = 'google-login'
}

//Field Types
export enum FieldType {
  text = 'text',
  date = 'date',
  time = 'time',
  select = 'select',
  password = 'password',
  textarea = 'textarea',
  checkbox = 'checkbox',
  g_recaptcha = 'g-recaptcha',
  section_info = 'section-info',
  slider = 'slider',
  add_image = 'add-image',
  telephone = 'telephone',
  show_image = 'show-image'
}
//Button Types
export enum ButtonType {
  submit = 'submit',
  close = 'close',
  back = 'back',
  test = 'test'
}
//Errors Types
export enum Errors {
  required = 'required',
  telephone = 'telephone',
  email = 'email',
  maxlength = 'maxlength',
  minlength = 'minlength',
  pattern = 'pattern'
}
