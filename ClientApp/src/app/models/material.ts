import { Categoria } from './categoria';
import { Proveedor } from './proveedor';

export class Material {
    materialId?: number;
    nombre: string;
    descripcion: string;
    precio: string;
    medida: string;
    existencia: number;
    categoriaId: number;
    categoria?: Categoria;
    proveedorId: number;
    proveedor?: Proveedor;
  }