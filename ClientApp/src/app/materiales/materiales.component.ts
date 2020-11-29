import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/material';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {
  materiales$: Observable<Material[]>;

  constructor(private materialService: MaterialService) {
  }

  ngOnInit() {
    this.loadMateriales();
  }

  loadMateriales() {
    this.materiales$ = this.materialService.getMateriales();

    this.materialService.getMateriales().subscribe(data => (
      console.log(data)
    ));

  }

  delete(materialId) {
    const ans = confirm('Desea borrar Material con id: ' + materialId);
    if (ans) {
      this.materialService.deleteMaterial(materialId).subscribe((data) => {
        this.loadMateriales();
      });
    }
  }
}
