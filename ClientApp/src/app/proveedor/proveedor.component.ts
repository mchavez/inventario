import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProviderService } from '../services/provider.service';
import { Proveedor } from '../models/Proveedor';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  proveedores$: Observable<Proveedor[]>;

  constructor(private categoryService: ProviderService) {
  }

  ngOnInit() {
    this.loadProveedores();
  }

  loadProveedores() {
    this.proveedores$ = this.categoryService.getProveedores();
  }

  delete(proveedorId) {
    const ans = confirm('Desea borrar Material con id: ' + proveedorId);
    if (ans) {
      this.categoryService.deleteProveedor(proveedorId).subscribe((data) => {
        this.loadProveedores();
      });
    }
  }

}
