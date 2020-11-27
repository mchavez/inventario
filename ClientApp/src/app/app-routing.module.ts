import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialesComponent } from './materiales/materiales.component';
import { MaterialComponent } from './material/material.component';
import { MaterialAddEditComponent } from './material-add-edit/material-add-edit.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAddEditComponent } from './categoria-add-edit/categoria-add-edit.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProveedorAddEditComponent } from './proveedor-add-edit/proveedor-add-edit.component';

const routes: Routes = [
  { path: '', component: MaterialesComponent, pathMatch: 'full' },
  { path: 'material/:id', component: MaterialComponent },
  { path: 'add', component: MaterialAddEditComponent },
  { path: 'material/edit/:id', component: MaterialAddEditComponent },
  { path: 'categorias', component: CategoriaComponent },
  { path: 'categorias/:id', component: CategoriaComponent },
  { path: 'addcategorias', component: CategoriaAddEditComponent },
  { path: 'categorias/edit/:id', component: CategoriaAddEditComponent },
  { path: 'proveedores', component: ProveedorComponent },
  { path: 'proveedores/:id', component: ProveedorComponent },
  { path: 'addproveedores', component: ProveedorAddEditComponent },
  { path: 'proveedores/edit/:id', component: ProveedorAddEditComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }