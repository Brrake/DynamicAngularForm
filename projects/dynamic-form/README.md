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
# Dynamic Modal
Input | Type | Description | Required
--- | --- | --- | ---
modalId | string | Assign a custom modal id | false 
modalPopup | boolean | Make the modal popup onload automatically | false
modalCloseButton | boolean | Enable close modal button, will appear a "x" button in the top-right corner | false
formSchemes | DynamicFormScheme | Scheme of the form to visualize | false
loadSpinner | boolean | Load spinner into submit button | false
isSubmitFailed | boolean | Enable custom message error after submit | false
errorMessage | string | Load custom message error after submit | false

Output | Description | Required
--- | --- | ---
onSubmit() | Handle form submitted result | false 
loginWithGoogle() | Handle google login result | false
onCloseModal() | Handle modal close | false
onBack() | Handle modal back | false
