using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using inventario.Models;

namespace inventario.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Material> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 1).Select(index => new Material
            {
                Nombre = "Web Api",
                Descripcion = "Net Core 3.1, AspNetCore.SpaServices.Extensions no esta disponible en Net Core 3.1. " +
                "El Soporte de Spa en Net Core 3.1 fue reducido, razon por la cual algunas librerias y metodos no estan disponibles. " + 
                "Angular SPA from ASP.NET Core da algunos problemas con Net core 3.1, la app de angular esta en la " + 
                "carpeta ClientApp desde donde se debe ejecutar el comando : ng serve y levantar la app de Angular",
                Precio = "10",
                Medida = "Angular Material",
                Existencia = 1,
            })
            .ToArray();
        }
    }
}
