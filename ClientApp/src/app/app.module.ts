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
import { HeaderComponent } from './header/header.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAddEditComponent } from './categoria-add-edit/categoria-add-edit.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProveedorAddEditComponent } from './proveedor-add-edit/proveedor-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialesComponent,
    MaterialComponent,
    MaterialAddEditComponent,
    HeaderComponent,
    CategoriaComponent,
    CategoriaAddEditComponent,
    ProveedorComponent,
    ProveedorAddEditComponent
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
