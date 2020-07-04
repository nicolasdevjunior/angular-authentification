import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppRouting } from './app.routing';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';  
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_shared/shared/shared.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { ServerUnavailableComponent } from './pages/server-unavailable/server-unavailable.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,  
        SharedModule,
        AppRouting,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        PageNotFoundComponent,
        ServerUnavailableComponent ,
        ProfileComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent] 
}) 

export class AppModule { } 
