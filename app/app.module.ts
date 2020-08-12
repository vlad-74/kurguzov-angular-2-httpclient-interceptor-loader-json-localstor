import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from './modules/material.module';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FakeComponent } from './components/fake/fake.component';
import { LocalComponent } from './components/local/local.component';

import { LoaderComponent } from "./loader/loader.component";
import { LoaderInterceptor,  } from "./loader/loader.interceptor";

import { AuthInterceptor } from "./http/authInterceptor";
import { HttpInterceptor } from "./http/httpInterceptor.service";

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'local', component: LocalComponent},
  { path: 'fake', component: FakeComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    MainComponent,
    FakeComponent,
    LocalComponent,
    LoaderComponent
  ],
  providers: [
    HttpInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // опция. HTTP_INTERCEPTORS - это массив значений, а не одно значение.
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
