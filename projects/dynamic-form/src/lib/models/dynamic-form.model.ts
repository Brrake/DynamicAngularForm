import { FormGroup } from "@angular/forms"

export interface DynamicFormScheme {
  formId: string
  title: string
  description?: string
  active_page?: boolean
  fields: FieldScheme[]
  buttons: ButtonScheme[]
  addons: AddonScheme[]
  custom_validators: CustomValidatorScheme[]
}
export interface FieldScheme {
  type: FieldType
  name?: string
  name_?: string
  src?: string
  options?: any
  length?: number
  minDate:{ year: number, month: number, day: number }
  maxDate:{ year: number, month: number, day: number }
  autocomplete?: string
  multiple?: boolean
  accept?: string
  width?: string
  controls?: string
  disabled?: boolean
  visible?: boolean
  formControlName?: string
  version?: string
  default_value?: string | number | boolean | { year: number, month: number, day: number } | { hour: number, minute: number }
  values?: SelectValueScheme[]
  top_label?: string
  seconds?: boolean
  meridian?: boolean
  validators?: ValidatorScheme[]
  errors?: ErrorScheme[]
}

export interface SelectValueScheme {
  name: string
  value: string
}

export interface AddonScheme {
  name: AddonType
  style?: number
  upper_text?: string
  size?: string
  type?: string
  theme?: string
  href?: string
  normal_text?: string
  highlight_text?: string
  href_type?: HrefTypes
  text?: string
  shape?: string
  auto_prompt?: string
  logo_alignment?: string
}
export enum HrefTypes {
  MODAL = 'modal',
}
// Buttons
export interface ButtonScheme {
  type: ButtonType
  name: string
  text_color: string
  button_color: string
  margin?: boolean
  page?: number
}

// Errors and Validators
export interface CustomValidatorScheme {
  name: string
  error_name: string
  text: string
}
export interface ErrorScheme {
  name: Errors
  text: string
}
export interface ValidatorScheme {
  name: Errors
  value: string
}

/*
 *  Types
 */
// Addons Types
export enum AddonType {
  highlight = 'highlight',
  google_login = 'google-login'
}

//Field Types
export enum FieldType {
  text = 'text',
  switch = 'switch',
  number = 'number',
  date = 'date',
  radio = 'radio',
  otp = 'otp',
  time = 'time',
  select = 'select',
  password = 'password',
  textarea = 'textarea',
  checkbox = 'checkbox',
  g_recaptcha = 'g-recaptcha',
  section_info = 'section-info',
  slider = 'slider',
  telephone = 'telephone',
  add_image = 'add-image',
  show_image = 'show-image',
  add_video = 'add-video',
  show_video = 'show-video',
  drag_and_drop = 'drag-and-drop'
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
  max = 'max',
  min = 'min',
  pattern = 'pattern'
}
export enum ButtonType {
  SQUARE = 'rounded-0',
  ROUNDED = '',
  ROUNDER = 'rounded-xl',
  PILL = 'rounded-pill',
  CIRCLE = 'btn-circle'
}
export interface DynamicSubmitEvent {
  forms: Partial<FormGroup>[],
  files: {
    images: any[],
    videos: any[],
    drag_and_drop: any[]
  },
  formEmittingIndex: number,
  emittedForms: Partial<FormGroup>[]
}
