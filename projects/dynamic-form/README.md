# DynamicForm

This Library was born to help peoples to integrate various forms in one. With the ausily of a json file pattern we can generate forms dynamically based on fields specified into JSON Pattern File.

Repository GITHUB : [DynamicAngularForm](https://github.com/Brrake/DynamicAngularForm)

## Requirements

For the installation we need to use the following versions of :

Node.JS : [v20.13.1](https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi)
Angular : 17

The library come with preinstalled @angular-slider/ngx-slider for the rendering of Slider form inputs, @ng-bootstrap/ng-bootstrap for the Date and Time Picker and ng-recaptcha for the rendering og Google Recaptcha security feature.

## Installation

First of all you need to install the library running :
> npm i dynamic-angular-form
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
