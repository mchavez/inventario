import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { MaterialComponent } from './material/material.component';
import { MaterialAddEditComponent } from './material-add-edit/material-add-edit.component';
import { MaterialService } from './services/material.service';

@NgModule({
  declarations: [
    AppComponent,
    MaterialesComponent,
    MaterialComponent,
    MaterialAddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    MaterialService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
