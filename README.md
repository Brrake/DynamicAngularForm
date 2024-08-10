# DynamicForm

This Library was born to help peoples to integrate various forms in one. With the ausily of a json file pattern we can generate forms dynamically based on fields specified into JSON Pattern File.

Repository GITHUB : [DynamicAngularForm](https://github.com/Brrake/DynamicAngularForm)

## Requirements

For the installation we need to use the following versions of :

Node.JS : [v20.13.1](https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi)

Angular : 17

The library come with preinstalled `@angular-slider/ngx-slider` for the rendering of Slider form inputs, `@ng-bootstrap/ng-bootstrap` for the Date and Time Picker and `ng-recaptcha` for the rendering og Google Recaptcha security feature.

## Installation

First of all you need to install the library running :
```
 npm i dynamic-angular-form
```
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

| Method              | Description                       | Required |
|---------------------|-----------------------------------|----------|
| `onSubmit()`        | Handle form submitted result      | false    |
| `loginWithGoogle()` | Handle Google login result        | false    |
| `onCloseModal()`    | Handle modal close                | false    |
| `onBack()`          | Handle modal back                 | false    |

---

### Dynamic Form

#### Input

| Property          | Type               | Default       | Description                                                                  | Required |
|-------------------|--------------------|---------------|------------------------------------------------------------------------------|----------|
| `formSchemes`     | [`DynamicFormScheme`](#dynamicformscheme)| `[]`          | Scheme of the form to visualize                                              | false    |
| `loadSpinner`     | `boolean`          | `false`       | Load spinner into the submit button                                          | false    |
| `isSubmitFailed`  | `boolean`          | `false`       | Enable custom error message after submit                                     | false    |
| `errorMessage`    | `string`           | `''`          | Load custom error message after submit                                       | false    |

#### Output

| Method              | Description                       | Required |
|---------------------|-----------------------------------|----------|
| `onSubmit()`        | Handle form submitted result      | false    |
| `loginWithGoogle()` | Handle Google login result        | false    |
| `onCloseForm()`     | Handle form close                 | false    |
| `onBack()`          | Handle form back                  | false    |

---

### Button Loader

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

---

### Google Login

#### Input

| Property         | Type    | Default        | Description                                      | Required |
|------------------|---------|----------------|--------------------------------------------------|----------|
| `type`           | `string`| `'standard'`   | Refer to Google Docs                             | false    |
| `size`           | `string`| `'medium'`     | Refer to Google Docs                             | false    |
| `theme`          | `string`| `'outline'`    | Refer to Google Docs                             | false    |
| `text`           | `string`| `'sign_in_with'`| Refer to Google Docs                            | false    |
| `shape`          | `string`| `'rectangular'`| Refer to Google Docs                             | false    |
| `logo_alignment` | `string`| `'left'`       | Refer to Google Docs                             | false    |

---


### `DynamicFormScheme`

| Property          | Type                        | Description                                      |
|-------------------|-----------------------------|--------------------------------------------------|
| `formId`          | `string`                    | Unique identifier for the form.                  |
| `title`           | `string`                    | Title of the form.                               |
| `description`     | `string (optional)`         | Description of the form.                         |
| `active_page`     | `boolean (optional)`        | Indicates if the form is active.                 |
| `fields`          | [`FieldScheme[]`](#fieldscheme)             | Array of form fields.                            |
| `buttons`         | [`ButtonScheme[]`](#buttonscheme)            | Array of form buttons.                           |
| `addons`          | [`AddonScheme[]`](#addonscheme)             | Array of form addons.                            |
| `custom_validators`| [`CustomValidatorScheme[]`](#customvalidatorscheme)  | Array of custom validators for the form.         |

### `FieldScheme`

| Property         | Type                                                          | Description                                                                                           |
|------------------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `type`           | [`FieldType`](#fieldtype-enum)                                                   | Type of the field.                                                                                    |
| `name`           | `string (optional)`                                           | Name of the field.                                                                                    |
| `src`            | `string (optional)`                                           | Source URL or path for certain field types (e.g., images).                                            |
| `options`        | `any (optional)`                                              | Additional options for the field.                                                                     |
| `length`         | `number (optional)`                                           | Length of the field.                                                                                  |
| `width`          | `string (optional)`                                           | Width of the field.                                                                                   |
| `disabled`       | `boolean (optional)`                                          | Indicates if the field is disabled.                                                                   |
| `visible`       | `boolean (optional)`                                          | Indicates if the field is visible.                                                                   |
| `formControlName`| `string (optional)`                                           | Form control name, typically used with reactive forms.                                                |
| `version`        | `string (optional)`                                           | Version of the field.                                                                                 |
| `default_value`  | `string` \| `number` \| `boolean` \| `{ year: number, month: number, day: number }` \| `{ hour: number, minute: number }` (optional) | Default value of the field. |
| `values`         | `SelectValueScheme[] (optional)`                              | Array of selectable values for fields like dropdowns or radios.                                       |
| `top_label`      | `string (optional)`                                           | Label displayed above the field.                                                                      |
| `validators`     | [`ValidatorScheme[] (optional)`](#validatorscheme)                                | Array of validators for the field.                                                                    |
| `errors`         | [`ErrorScheme[] (optional)`](#errorscheme)                                    | Array of error messages related to the field.                                                         |

### `SelectValueScheme`

| Property | Type   | Description           |
|----------|--------|-----------------------|
| `name`   | `string` | Display name of the option. |
| `value`  | `string` | Value of the option. |

### `AddonScheme`

| Property        | Type                     | Description                                |
|-----------------|--------------------------|--------------------------------------------|
| `name`          | [`AddonType`](#addontype-enum)              | Type of the addon.                         |
| `style`         | `number (optional)`      | Style identifier for the addon.            |
| `upper_text`    | `string (optional)`      | Text displayed above the main content.     |
| `size`          | `string (optional)`      | Size of the addon.                         |
| `type`          | `string (optional)`      | Type of addon (e.g., button, link).        |
| `theme`         | `string (optional)`      | Theme or color scheme for the addon.       |
| `href`          | `string (optional)`      | URL or link associated with the addon.     |
| `normal_text`   | `string (optional)`      | Regular text displayed in the addon.       |
| `highlight_text`| `string (optional)`      | Highlighted text within the addon.         |
| `href_type`     | [`HrefTypes (optional)`](#hreftypes-enum)   | Type of href action (e.g., modal).         |
| `text`          | `string (optional)`      | Text displayed in the addon.               |
| `shape`         | `string (optional)`      | Shape of the addon (e.g., square, circle). |
| `logo_alignment`| `string (optional)`      | Alignment of the logo within the addon.    |

### `HrefTypes` (Enum)

| Value    | Description                    |
|----------|--------------------------------|
| `MODAL`  | Represents a modal link type.  |

### `ButtonScheme`

| Property      | Type           | Description                            |
|---------------|----------------|----------------------------------------|
| `type`        | `ButtonType`   | Type of the button (e.g., submit, close). |
| `name`        | `string`       | Name of the button.                    |
| `text_color`  | `string`       | Text color of the button.              |
| `button_color`| `string`       | Background color of the button.        |
| `margin`      | `boolean (optional)` | Indicates if the button has a margin.    |
| `page`        | `number (optional)`  | Page number the button is associated with. |

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

### `AddonType` (Enum)

| Value          | Description                     |
|----------------|---------------------------------|
| `highlight`    | Represents a highlight addon.   |
| `google_login` | Represents a Google login addon.|

### `FieldType` (Enum)

| Value           | Description                      |
|-----------------|----------------------------------|
| `text`          | Represents a text input field.   |
| `date`          | Represents a date input field.   |
| `otp`           | Represents an OTP input field.   |
| `time`          | Represents a time input field.   |
| `select`        | Represents a select dropdown field. |
| `password`      | Represents a password input field. |
| `textarea`      | Represents a textarea input field. |
| `checkbox`      | Represents a checkbox input field. |
| `g_recaptcha`   | Represents a Google reCAPTCHA field. |
| `section_info`  | Represents a section information field. |
| `slider`        | Represents a slider input field. |
| `add_image`     | Represents an add image field.   |
| `telephone`     | Represents a telephone input field. |
| `show_image`    | Represents a show image field.   |

### `ButtonType` (Enum)

| Value    | Description                    |
|----------|--------------------------------|
| `submit` | Represents a submit button.    |
| `close`  | Represents a close button.     |
| `back`   | Represents a back button.      |
| `test`   | Represents a test button.      |

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
