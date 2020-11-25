using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace inventario.Models
{
    public class Categoria
    {
        [Key]
        public int CategoriaId { get; set; }

        [Required]
        public string NombreCategoria { get; set; }

        //[InverseProperty("MaterialesCategoria")]
        public virtual ICollection<Material> MaterialesCategoria { get; set; }
    }
}
