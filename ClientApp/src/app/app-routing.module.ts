import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialesComponent } from './materiales/materiales.component';
import { MaterialComponent } from './material/material.component';
import { MaterialAddEditComponent } from './material-add-edit/material-add-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriaAddEditComponent } from './categoria-add-edit/categoria-add-edit.component';

const routes: Routes = [
  { path: '', component: MaterialesComponent, pathMatch: 'full' },
  { path: 'material/:id', component: MaterialComponent },
  { path: 'add', component: MaterialAddEditComponent },
  { path: 'material/edit/:id', component: MaterialAddEditComponent },
  { path: 'categorias', component: CategoriesComponent },
  { path: 'categorias/:id', component: CategoriesComponent },
  { path: 'addcategorias', component: CategoriaAddEditComponent },
  { path: 'categorias/edit/:id', component: CategoriaAddEditComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }