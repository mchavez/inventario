using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using inventario.Models;

namespace inventario.Data
{
    public class inventarioContext : DbContext
    {
        public inventarioContext (DbContextOptions<inventarioContext> options)
            : base(options)
        {
        }

        public DbSet<inventario.Models.Material> Material { get; set; }

        public DbSet<inventario.Models.Categoria> Categoria { get; set; }

        public DbSet<inventario.Models.Proveedor> Proveedor { get; set; }
    }
}
