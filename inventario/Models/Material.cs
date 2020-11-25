using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace inventario.Models
{
    public class Material
    {
		[Key]
		public int MaterialId { get; set; }

		[Required]
		public string Nombre { get; set; }

		[Required]
		public string Descripcion { get; set; }

		[Required]
		public string Precio { get; set; }

		[Required]
		public string Medida { get; set; }

		[Required]
		public int Existencia { get; set; }

		[ForeignKey("Categorias")]
		public int? CategoriaId { get; set; }
		public Categoria Categorias { get; set; }

		[ForeignKey("Proveedores")]
		public int? ProveedorId { get; set; }
		public Proveedor Proveedores { get; set; }
	}

}
