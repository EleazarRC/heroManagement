import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { UppercaseDirective } from './directives/uppercase.directive';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SuperheroFormComponent } from './components/superhero-form/superhero-form.component';
import { SuperheroTableComponent } from './components/superhero-table/superhero-table.component';




@NgModule({
  declarations: [
    AppComponent,
    SuperheroTableComponent,
    SuperheroFormComponent,
    HeaderComponent,
    FooterComponent,
    UppercaseDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
