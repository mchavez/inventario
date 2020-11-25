using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace inventario.Models
{
    public class Proveedor
    {
        [Key]
        public int ProveedorId { get; set; }

        [Required]
        public string NombreProveedor { get; set; }
        //[InverseProperty("MaterialesProveedor")]
        public virtual ICollection<Material> MaterialesProveedor { get; set; }

    }
}
