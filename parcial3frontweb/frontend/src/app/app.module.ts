import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CreateComponent } from './app/home/create/create.component';
import { ListComponent } from './app/home/list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "", component: LoginComponent},
      {path: "login", component: LoginComponent},
      {path: "home", component: HomeComponent}
    ], {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
