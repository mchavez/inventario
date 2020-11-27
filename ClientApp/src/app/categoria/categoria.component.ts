import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias$: Observable<Categoria[]>;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categorias$ = this.categoryService.getCategorias();
  }

  delete(categoriaId) {
    const ans = confirm('Desea borrar Material con id: ' + categoriaId);
    if (ans) {
      this.categoryService.deleteCategoria(categoriaId).subscribe((data) => {
        this.loadCategorias();
      });
    }
  }

}

