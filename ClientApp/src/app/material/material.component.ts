import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/material';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  material$: Observable<Material>;
  materialId: number;

  constructor(private materialService: MaterialService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.materialId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadMaterial();
  }

  loadMaterial() {
    this.material$ = this.materialService.getMaterial(this.materialId);
  }
}