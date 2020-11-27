import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/material';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-material-add-edit',
  templateUrl: './material-add-edit.component.html',
  styleUrls: ['./material-add-edit.component.scss']
})
export class MaterialAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formNombre: string;
  formDescripcion: string;
  formPrecio: string;
  formMedida: string;
  formExistencia: number;
  formCategoriaId: number;
  formProveedorId: number;
  materialId: number;
  errorMessage: any;
  existingMaterial: Material;
  //categorias: any = ['ItSolutionStuff.com', 'HDTuto.com', 'Nicesnippets.com'];
  categorias$: Observable<Categoria[]>;

  constructor(private materialService: MaterialService, private formBuilder: FormBuilder, 
    private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formDescripcion = 'descripcion';
    this.formPrecio = 'precio';
    this.formMedida = 'medida';
    this.formExistencia = 0;
    this.formCategoriaId = 0;
    this.formProveedorId = 0;

    if (this.avRoute.snapshot.params[idParam]) {
      this.materialId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      { 
        materialId: 0,
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        precio: ['', [Validators.required]],
        medida: ['', [Validators.required]],
        existencia: ['', [Validators.required]],
        categoriaId: ['', [Validators.required]],
        proveedorId: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
    this.loadCategorias();
    if (this.materialId > 0) {
      this.actionType = 'Edit';
      this.materialService.getMaterial(this.materialId)
        .subscribe(data => (
          this.existingMaterial = data,
          this.form.controls[this.formNombre].setValue(data.nombre),
          this.form.controls[this.formDescripcion].setValue(data.descripcion),
          this.form.controls[this.formPrecio].setValue(data.precio),
          this.form.controls[this.formMedida].setValue(data.medida),
          this.form.controls['existencia'].setValue(data.existencia),
          this.form.controls['categoriaId'].setValue(data.categoriaId),
          this.form.controls['proveedorId'].setValue(data.proveedorId)
        ));
    }
  }

  loadCategorias() {
    this.categorias$ = this.materialService.getCategories();
  }

  formChanged(): void {
    console.log('formChanged called');
  }

  changeSuit(e) {
    this.form.get('categoriaId').setValue(e.target.value as number, {
       onlySelf: true
    })
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let material: Material = {
        nombre: this.form.get(this.formNombre).value,
        descripcion: this.form.get(this.formDescripcion).value,
        precio: this.form.get(this.formPrecio).value,
        medida: this.form.get(this.formMedida).value,
        existencia: this.form.get('existencia').value as number,
        categoriaId: this.form.get('categoriaId').value as number,
        proveedorId: this.form.get('proveedorId').value as number,
      };

      this.materialService.saveMaterial(material)
        .subscribe((data) => {
          this.router.navigate(['/materials', data.materialId]);
        });
    }

    if (this.actionType === 'Edit') {
      let material: Material = {
        materialId: this.existingMaterial.materialId,
        nombre: this.form.get(this.formNombre).value,
        descripcion: this.form.get(this.formDescripcion).value,
        precio: this.form.get(this.formPrecio).value,
        medida: this.form.get(this.formMedida).value,
        //existencia: this.form.get(this.formExistencia).value,
        existencia: this.form.get('existencia').value,
        //categoriaId: this.form.get(this.formCategoriaId).value,
        categoriaId: this.form.get('categoriaId').value as number,
        //proveedorId: this.form.get(this.formProveedorId).value,
        proveedorId: this.form.get('proveedorId').value,
      };
      this.materialService.updateMaterial(material.materialId, material)
        .subscribe((data) => {
          //this.router.navigate([this.router.url]);
          this.router.navigate(['/']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get nombre() { return this.form.get(this.formNombre); }
  get descripcion() { return this.form.get(this.formDescripcion); }
  get precio() { return this.form.get(this.formPrecio); }
  get medida() { return this.form.get(this.formMedida); }
  //get existencia() { return +this.form.get(this.formExistencia); }
  get existencia() { return +this.form.get('existencia'); }
  //get categoriaId() { return this.form.get(this.formCategoriaId); }
  get categoriaId() { return this.form.get('categoriaId'); }
  //get proveedorId() { return this.form.get(this.formProveedorId); }
  get proveedorId() { return this.form.get('proveedorId'); }
}