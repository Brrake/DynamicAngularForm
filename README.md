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

# Dynamic Modal
Input | Type | Default | Description | Required
--- | --- | --- | --- | ---
modalId | string | 'dafault-id' | Assign a custom modal id | false 
modalPopup | boolean | false | Make the modal popup onload automatically | false
modalCloseButton | boolean | false | Enable close modal button, will appear a "x" button in the top-right corner | false
formSchemes | DynamicFormScheme | [] | Scheme of the form to visualize | false
loadSpinner | boolean | false | Load spinner into submit button | false
isSubmitFailed | boolean | false | Enable custom message error after submit | false
errorMessage | string | '' | Load custom message error after submit | false

Output | Description | Required
--- | --- | ---
onSubmit() | Handle form submitted result | false 
loginWithGoogle() | Handle google login result | false
onCloseModal() | Handle modal close | false
onBack() | Handle modal back | false


# Dynamic Form
Input | Type | Default | Description | Required
--- | --- | --- | --- | ---
formSchemes | DynamicFormScheme | [] | Scheme of the form to visualize | false
loadSpinner | boolean | false | Load spinner into submit button | false
isSubmitFailed | boolean | false | Enable custom message error after submit | false
errorMessage | string | '' | Load custom message error after submit | false

Output | Description | Required
--- | --- | ---
onSubmit() | Handle form submitted result | false 
loginWithGoogle() | Handle google login result | false
onCloseForm() | Handle modal close | false
onBack() | Handle modal back | false

# Button Loader
Input | Type | Default | Description | Required
--- | --- | --- | --- | ---
loadSpinner | boolean | false | Load spinner into submit button | false
loadCheck | boolean | false | Load check icon, usefull when the sumbit is finished | false
isFormValid | boolean | true | Enable button if the form is valid | false
text | string | '' | Text inside the button | false
icon | StockIcons or Uil icon | '' | Icon to load next to the text. Uil icon es. uil uil-info-circle) | false
icon_position | ['left','right'] | 'left' | Position of the icon in relation to the text | false
type | string | 'submit' | Button type | false
color | string | 'primary' | Button color as hex. Es. #45c4a0  | false
text_color | string | 'white' | Button text color as hex. Es. #45c4a0  | false
margin | boolean | true | Button margin right. Usefull with multiple buttons in sequence  | false

# Google Login
For use correctly this component you need to generate a Google Client Id

Input | Type | Default | Description | Required
--- | --- | --- | --- | ---
type | string | 'standard' | Refer to Google DOCS | false
size | string | 'medium' | Refer to Google DOCS | false
theme | string | 'outline' | Refer to Google DOCS | false
text | string | 'sign_in_with' | Refer to Google DOCS | false
shape | string | 'rectangular' | Refer to Google DOCS | false
logo_alignment | string | 'left' | Refer to Google DOCS | false


