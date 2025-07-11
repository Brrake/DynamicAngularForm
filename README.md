# DynamicForm

This Library was born to help peoples to integrate various forms in one. With the ausily of a json file pattern we can generate forms dynamically based on fields specified into JSON Pattern File.

Repository GITHUB : [DynamicAngularForm](https://github.com/Brrake/DynamicAngularForm)

## Requirements

For the installation we need to use the following versions of :

Node.JS : [v20.13.1](https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi)

Angular : 17 - 18 - 19

The library come with preinstalled `@angular-slider/ngx-slider` for the rendering of Slider form inputs, `@ng-bootstrap/ng-bootstrap` for the Date and Time Picker and `ng-recaptcha-2` for the rendering og Google Recaptcha security feature.

## Installation

First of all you need to install the library running :
```
 npm i dynamic-angular-form@19.0.2
```

| Angular Version   | Lib Version        |
|-------------------|--------------------|
| `v19`             | `19`           |
| `v18`             | `18`           |
| `v17`             | `17`           |


Subsequently you need to import the module into `app.module.ts`
``` angular
@NgModule({
  declarations: [	
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicFormModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

> Note : If you want to use Google Login addon or Google Recaptcha input, you have to pass correctly the Google Recaptcha Key for making work Google Recaptcha and the Google Client Id for making work Google Login lib

``` angular
@NgModule({
  declarations: [	
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicFormModule.forRoot(environment.recaptchaSiteKey,environment.googleClientId)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Models and Usage
Below you will find all the information you need to correctly use the templates and the various components



---

### Dynamic Modal

```
<dynamic-modal />
```

#### Input

| Property          | Type               | Default       | Description                                                                  | Required |
|-------------------|--------------------|---------------|------------------------------------------------------------------------------|----------|
| `modalId`         | `string`           | `'default-id'` | Assign a custom modal ID                                                     | false    |
| `modalPopup`      | `boolean`          | `false`       | Make the modal popup onload automatically                                    | false    |
| `modalCloseButton`| `boolean`          | `false`       | Enable close modal button, will appear as an "x" button in the top-right corner | false |
| `formSchemes`     | [`DynamicFormScheme`](#dynamicformscheme) | `[]`          | Scheme of the form to visualize                                              | false    |
| `loadSpinner`     | `boolean`          | `false`       | Load spinner into the submit button                                          | false    |
| `isSubmitFailed`  | `boolean`          | `false`       | Enable custom error message after submit                                     | false    |
| `errorMessage`    | `string`           | `''`          | Load custom error message after submit                                       | false    |

#### Output

| Method                | Description                       | Required |
|-----------------------|-----------------------------------|----------|
| `onSubmit()`          | Handle form submitted result      | false    |
| `loginWithGoogle()`   | Handle Google login result        | false    |
| `onCloseModal()`      | Handle modal close                | false    |
| `onBack()`            | Handle modal back                 | false    |
| `formValueChanges()`  | Handle modal value change         | false    |

#### Functions

To use it correctly declare a child in your component :
TS ->
```
  @ViewChild('myModal') registerFormModal!: DynamicModalComponent
```
HTML ->
```
 <dynamic-modal #myModal (onSubmit)="submit($event)" [formSchemes]="registerScheme" modalId="modal-1" />
```


| Method              | Description                       | Required |
|---------------------|-----------------------------------|----------|
| `isFormValid(idx: number)`        | Check if a form in a certain index is valid      | false    |
| `updateForm(idx:number, values:any)` | Patch values of a certain form        | false    |
| `goToPage(page: number)`    | Navigate to a different form page                | false    |
| `closeModal()`          | Close current modal                 | false    |
| `openModal()`          | Open current modal                 | false    |
| `formInit()`  | Handle modal form change         | false    |

---

### Dynamic Form

```
<dynamic-form />
```

#### Input

| Property          | Type               | Default       | Description                                                                  | Required |
|-------------------|--------------------|---------------|------------------------------------------------------------------------------|----------|
| `formSchemes`     | [`DynamicFormScheme`](#dynamicformscheme)| `[]`          | Scheme of the form to visualize                                              | false    |
| `loadSpinner`     | `boolean`          | `false`       | Load spinner into the submit button                                          | false    |
| `isSubmitFailed`  | `boolean`          | `false`       | Enable custom error message after submit                                     | false    |
| `errorMessage`    | `string`           | `''`          | Load custom error message after submit                                       | false    |

#### Output

| Method                | Description                       | Required |
|-----------------------|-----------------------------------|----------|
| `onSubmit()`          | Handle form submitted result      | false    |
| `loginWithGoogle()`   | Handle Google login result        | false    |
| `onCloseForm()`       | Handle form close                 | false    |
| `onBack()`            | Handle form back                  | false    |
| `formValueChanges()`  | Handle form value change         | false    |
| `formInit()`  | Handle form form change         | false    |

#### Functions

To use it correctly declare a child in your component :
TS ->
```
  @ViewChild('form') registerForm!: DynamicFormComponent
```
HTML ->
```
 <dynamic-form #form (onSubmit)="submit($event)" [formSchemes]="registerScheme" />
```

| Method              | Description                       | Required |
|---------------------|-----------------------------------|----------|
| `isFormValid(idx: number)`        | Check if a form in a certain index is valid      | false    |
| `updateForm(idx:number, values:any)` | Patch values of a certain form        | false    |
| `goToPage(page: number)`    | Navigate to a different form page                | false    |


---


## `DynamicFormScheme`

| Property          | Type                        | Description                                      |
|-------------------|-----------------------------|--------------------------------------------------|
| `formId`          | `string`                    | Unique identifier for the form.                  |
| `title`           | `string`                    | Title of the form.                               |
| `title_{LANGUAGE}`| `string (optional)`         | Title translated of the field.                    |
| `description`     | `string (optional)`         | Description of the form.                         |
| `description_{LANGUAGE}`| `string (optional)`   | Description translated of the field.                    |
| `active_page`     | `boolean (optional)`        | Indicates if the form is active.                 |
| `fields`          | [`FieldScheme[]`](#fieldscheme)             | Array of form fields.                            |
| `buttons`         | [`ButtonScheme[]`](#buttonscheme)            | Array of form buttons.                           |
| `addons`          | [`AddonScheme[]`](#addonscheme)             | Array of form addons.                            |
| `custom_validators`| [`CustomValidatorScheme[]`](#customvalidatorscheme)  | Array of custom validators for the form.         |

## `FieldScheme`

| Property         | Type                                                          | Description                                                                                           | Usage Type                                      |
|------------------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| `type`           | [`FieldType`](#fieldtype-enum)                                | Type of the field.                                                                                    | ALL                                             |
| `default_value`  | `string` \| `number` \| `boolean` \| `{ year: number, month: number, day: number }` \| `{ hour: number, minute: number }` (optional) | Default value of the field.    | ALL                                             |
| `name`           | `string (optional)`                                           | Name of the field.                                                                                    | ALL                                             |
| `name_{LANGUAGE}`| `string (optional)`                                           | Name translated of the field.                                                                         | ALL                                             |
| `top_label`      | `string (optional)`                                           | Label displayed above the field.                                                                      | ALL                                             |
| `validators`     | [`ValidatorScheme[] (optional)`](#validatorscheme)            | Array of validators for the field.                                                                    | ALL                                             |
| `errors`         | [`ErrorScheme[] (optional)`](#errorscheme)                    | Array of error messages related to the field.                                                         | ALL                                             |
| `disabled`       | `boolean (optional)`                                          | Indicates if the field is disabled.                                                                   | ALL                                             |
| `visible`        | `boolean (optional)`                                          | Indicates if the field is visible.                                                                    | ALL                                             |
| `formControlName`| `string (optional)`                                           | Form control name, typically used with reactive forms.                                                | ALL                                             |
| `autocomplete`        | `boolean (optional)`                                     | Indicates if the field has autocomplete.                                                              | text, password                                  |
| `default_value_{LANGUAGE}`| `string (optional)`                                  | Name translated of the field.                                                                         | section_info                                    |
| `src`            | `string (optional)`                                           | Source URL or path for certain field types (e.g., images).                                            | show_image                                      |
| `options`        | `any (optional)`                                              | Additional options for the field.                                                                     | slider                                          |
| `length`         | `number (optional)`                                           | Length of the field.                                                                                  | otp                                             |
| `minDate`        | `{ year:number, month:number, day:number } (optional)`        | minDate of datepicker.                                                                                | date                                            |
| `maxDate`        | `{ year:number, month:number, day:number } (optional)`        | maxDate of datepicker.                                                                                | date                                            |
| `values`         | `SelectValueScheme[] (optional)`                              | Array of selectable values for fields like dropdowns or radios.                                       | select                                          |
| `multiple`       | `boolean (optional)`                                          | Multiple upload of files.                                                                             | add_image, add_video                            |
| `accept`         | `string (optional)`                                           | Accept types for input files.                                                                         | add_image, add_video                            |
| `width`          | `string (optional)`                                           | Width of the field.                                                                                   | add_image, add_video, show_image, show_video    |
| `controls`       | `string (optional)`                                           | Controls of the video field.                                                                          | show_video, add_video                           |
| `version`        | `string (optional)`                                           | Version of the field.                                                                                 | g_recaptcha                                     |
| `seconds`        | `boolean (optional)`                                          | Show or hide seconds field                                                                            | time                                            |
| `meridian`        | `boolean (optional)`                                         | Show or hide meridian selector                                                                        | time                                            |

## `FieldType` (Enum)

| Value           | Description                      |
|-----------------|----------------------------------|
| `text`          | Represents a text input field.   |
| `number`          | Represents a number input field.   |
| `radio`          | Represents a radio input field.   |
| `date`          | Represents a date input field.   |
| `otp`           | Represents an OTP input field.   |
| `time`          | Represents a time input field.   |
| `select`        | Represents a select dropdown field. |
| `password`      | Represents a password input field. |
| `textarea`      | Represents a textarea input field. |
| `checkbox`      | Represents a checkbox input field. |
| `switch`          | Represents a switch input field.   |
| `g_recaptcha`   | Represents a Google reCAPTCHA field. |
| `section_info`  | Represents a section information field. |
| `slider`        | Represents a slider from @angular-slider/ngx-slider input field. |
| `slider_noui`        | Represents a slider from nouislider input field. |
| `telephone`     | Represents a telephone input field. |
| `add_image`     | Represents an add image field.   |
| `show_image`    | Represents a show image field.   |
| `add_video`     | Represents an add image field.   |
| `show_video`    | Represents a show image field.   |

### `SelectValueScheme`

| Property | Type   | Description           |
|----------|--------|-----------------------|
| `name`   | `string` | Display name of the option. |
| `name_{LANGUAGE}`| `string (optional)`    | Name translated of the field. |
| `value`  | `string` | Value of the option. |

## `AddonScheme`

| Property        | Type                     | Description                                                   | Usage Type            |
|-----------------|--------------------------|---------------------------------------------------------------|-----------------------|
| `name`          | [`AddonType`](#addontype-enum)              | Type of the addon.                         |ALL                    |
| `normal_text`   | `string (optional)`      | Regular text displayed in the addon.                          |highlight              |
| `normal_text_{LANGUAGE}`| `string (optional)` |  Regular text translated of the field.     | highlight                                             |
| `highlight_text`| `string (optional)`      | Highlighted text within the addon.                            |highlight              |
| `highlight_text_{LANGUAGE}`| `string (optional)` | Highlighted text translated of the field.        | highlight                                             |
| `href`          | `string (optional)`      | URL or link associated with the addon.                        |highlight              |
| `href_type`     | [`HrefTypes (optional)`](#hreftypes-enum)   | Type of href action (e.g., modal).         |highlight              |
| `style`         | `number (optional)`      | Style identifier for the addon.                               |google_login           |
| `upper_text`    | `string (optional)`      | Text displayed above the main content.                        |google_login           |
| `size`          | `string (optional)`      | Size of the addon.                                            |google_login           |
| `type`          | `string (optional)`      | Type of addon (e.g., button, link).                           |google_login           |
| `theme`         | `string (optional)`      | Theme or color scheme for the addon.                          |google_login           |
| `text`          | `string (optional)`      | Text displayed in the addon.                                  |google_login           |
| `shape`         | `string (optional)`      | Shape of the addon (e.g., square, circle).                    |google_login           |
| `logo_alignment`| `string (optional)`      | Alignment of the logo within the addon.                       |google_login           |
| `auto_prompt`   | `string (optional)`      | Auto promt google login on page load.                         |google_login           |

### `AddonType` (Enum)

| Value          | Description                     |
|----------------|---------------------------------|
| `highlight`    | Represents a highlight addon.   |
| `google_login` | Represents a Google login addon.|

### `HrefTypes` (Enum)

| Value    | Description                    |
|----------|--------------------------------|
| `MODAL`  | Represents a modal link type.  |

## `ButtonScheme`

| Property      | Type           | Description                                      | Usage Type            |
|---------------|----------------|--------------------------------------------------|-----------------------|
| `type`        | `ButtonType`   | Type of the button (e.g., submit, close).        | ALL                   |
| `name`        | `string`       | Name of the button.                              | ALL                   |
| `name_{LANGUAGE}`| `string (optional)`  | Name translated of the field.      | ALL                  |
| `text_color`  | `string`       | Text color of the button.                        | ALL                   |
| `button_color`| `string`       | Background color of the button.                  | ALL                   |
| `margin`      | `boolean (optional)` | Indicates if the button has a margin.      | ALL                   |
| `page`        | `number (optional)`  | Page number the button is associated with. | back                   |

### `ButtonType` (Enum)

| Value    | Description                    |
|----------|--------------------------------|
| `submit` | Represents a submit button.    |
| `close`  | Represents a close button.     |
| `back`   | Represents a back button.      |
| `test`   | Represents a test button.      |

### `CustomValidatorScheme`

| Property    | Type     | Description                            |
|-------------|----------|----------------------------------------|
| `name`      | `string` | Name of the custom validator.          |
| `error_name`| `string` | Name of the error associated with this validator. |
| `text`      | `string` | Error message text.                    |

### `ErrorScheme`

| Property    | Type       | Description                         |
|-------------|------------|-------------------------------------|
| `name`      | `Errors`   | Type of the error (e.g., required, email). |
| `text`      | `string`   | Error message text.                 |

### `ValidatorScheme`

| Property | Type   | Description           |
|----------|--------|-----------------------|
| `name`   | [`Errors`](#errors-enum) | Type of the error being validated. |
| `value`  | `string` | Value associated with the validator. |

### `Errors` (Enum)

| Value      | Description                    |
|------------|--------------------------------|
| `required` | Represents a required field.   |
| `telephone`| Represents a telephone error.  |
| `email`    | Represents an email validation error. |
| `maxlength`| Represents a max length error. |
| `minlength`| Represents a min length error. |
| `max`| Represents a max error. |
| `min`| Represents a min error. |
| `pattern`  | Represents a pattern matching error. |




## Other Components

### Button Loader

```
<button-loader />
```

#### Input

| Property         | Type                  | Default       | Description                                                                      | Required |
|------------------|-----------------------|---------------|----------------------------------------------------------------------------------|----------|
| `loadSpinner`    | `boolean`             | `false`       | Load spinner into the submit button                                              | false    |
| `loadCheck`      | `boolean`             | `false`       | Load check icon, useful when the submit is finished                              | false    |
| `isFormValid`    | `boolean`             | `true`        | Enable button if the form is valid                                               | false    |
| `text`           | `string`              | `''`          | Text inside the button                                                           | false    |
| `icon`           | `StockIcons` or `Uil` | `''`          | Icon to load next to the text. Uil icon example: `uil uil-info-circle`           | false    |
| `icon_position`  | `['left','right']`    | `'left'`      | Position of the icon in relation to the text                                     | false    |
| `type`           | `string`              | `'submit'`    | Button type                                                                      | false    |
| `color`          | `string`              | `'primary'`   | Button color as hex (e.g., `#45c4a0`)                                            | false    |
| `text_color`     | `string`              | `'white'`     | Button text color as hex (e.g., `#ffffff`)                                       | false    |
| `margin`         | `boolean`             | `true`        | Button margin right, useful with multiple buttons in sequence                    | false    |
#### Output

| Method              | Description                       | Required |
|---------------------|-----------------------------------|----------|
| `onSubmit()`        | Handle form submitted result      | false    |

---

### Google Login

```
<google-login />
```

#### Input

| Property         | Type    | Default        | Description                                      | Required |
|------------------|---------|----------------|--------------------------------------------------|----------|
| `type`           | `string`| `'standard'`   | Refer to Google Docs                             | false    |
| `size`           | `string`| `'medium'`     | Refer to Google Docs                             | false    |
| `theme`          | `string`| `'outline'`    | Refer to Google Docs                             | false    |
| `text`           | `string`| `'sign_in_with'`| Refer to Google Docs                            | false    |
| `shape`          | `string`| `'rectangular'`| Refer to Google Docs                             | false    |
| `logo_alignment` | `string`| `'left'`       | Refer to Google Docs                             | false    |
| `auto_prompt` | `string`| `'false'`       | Refer to Google Docs                             | false    |

---
