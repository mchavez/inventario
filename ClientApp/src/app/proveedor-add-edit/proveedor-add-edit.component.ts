import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from '../services/provider.service';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/Proveedor';

@Component({
  selector: 'app-proveedor-add-edit',
  templateUrl: './proveedor-add-edit.component.html',
  styleUrls: ['./proveedor-add-edit.component.css']
})
export class ProveedorAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombreProveedor: string;
  proveedorId: number;
  errorMessage: any;
  existingProveedor: Proveedor;
  proveedores$: Observable<Proveedor[]>;

  constructor(private providerService: ProviderService, private formBuilder: FormBuilder, 
    private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombreProveedor = 'nombreProveedor';

    if (this.avRoute.snapshot.params[idParam]) {
      this.proveedorId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      { 
        proveedorId: 0,
        nombreProveedor: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {
    if (this.proveedorId > 0) {
      this.actionType = 'Edit';
      this.providerService.getProveedor(this.proveedorId)
        .subscribe(data => (
          this.existingProveedor = data,
          this.form.controls[this.formNombreProveedor].setValue(data.nombreProveedor)
        ));
    }
  }

  loadProveedores() {
    this.proveedores$ = this.providerService.getProveedores();
  }

  formChanged(): void {
    console.log('formChanged called');
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let proveedor: Proveedor = {
        nombreProveedor: this.form.get(this.formNombreProveedor).value,
      };
      this.providerService.saveProveedor(proveedor) //Agregar
        .subscribe((data) => {
          this.router.navigate(['/proveedores/', data.proveedorId]);
        });
    }

    if (this.actionType === 'Edit') {
      let proveedor: Proveedor = {
        proveedorId: this.existingProveedor.proveedorId,
        nombreProveedor: this.form.get(this.formNombreProveedor).value,
      };
   
      this.providerService.updateProveedor(proveedor.proveedorId, proveedor) //Guardar
        .subscribe((data) => {
          //this.router.navigate([this.router.url]);
          this.router.navigate(['/proveedores/']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get nombre() { return this.form.get(this.formNombreProveedor); }


}
