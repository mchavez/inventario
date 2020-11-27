import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categoria-add-edit',
  templateUrl: './categoria-add-edit.component.html',
  styleUrls: ['./categoria-add-edit.component.css']
})
export class CategoriaAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombreCategoria: string;
  categoriaId: number;
  errorMessage: any;
  existingCategoria: Categoria;
  categorias$: Observable<Categoria[]>;

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, 
    private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombreCategoria = 'nombreCategoria';

    if (this.avRoute.snapshot.params[idParam]) {
      this.categoriaId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      { 
        categoriaId: 0,
        nombreCategoria: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
    if (this.categoriaId > 0) {
      this.actionType = 'Edit';
      this.categoryService.getCategoria(this.categoriaId)
        .subscribe(data => (
          this.existingCategoria = data,
          this.form.controls[this.formNombreCategoria].setValue(data.nombreCategoria)
        ));
    }
  }

  loadCategorias() {
    this.categorias$ = this.categoryService.getCategorias();
  }

  formChanged(): void {
    console.log('formChanged called');
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let categoria: Categoria = {
        nombreCategoria: this.form.get(this.formNombreCategoria).value,
      };
      this.categoryService.saveCategoria(categoria) //Agregar
        .subscribe((data) => {
          this.router.navigate(['/categorias/', data.categoriaId]);
        });
    }

    if (this.actionType === 'Edit') {
      let categoria: Categoria = {
        categoriaId: this.existingCategoria.categoriaId,
        nombreCategoria: this.form.get(this.formNombreCategoria).value,
      };
   
      this.categoryService.updateCategoria(categoria.categoriaId, categoria) //Guardar
        .subscribe((data) => {
          //this.router.navigate([this.router.url]);
          this.router.navigate(['/categorias/']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get nombre() { return this.form.get(this.formNombreCategoria); }

}
