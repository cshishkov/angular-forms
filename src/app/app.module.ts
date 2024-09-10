import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormTextInputComponent } from './components/form-text-input/form-text-input.component';
import { FormPasswordInputComponent } from './components/form-password-input/form-password-input.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  declarations: [AppComponent, FormComponent, FormTextInputComponent, FormPasswordInputComponent, ErrorMessageComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
