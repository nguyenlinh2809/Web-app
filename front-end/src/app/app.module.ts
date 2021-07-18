import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/http.interceptor';
import { NumberOnlyDirective } from './common/number-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UpdateAccountComponent,
    NotFoundComponent,
    NavBarComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
