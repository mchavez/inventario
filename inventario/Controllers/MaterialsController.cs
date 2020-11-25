using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using inventario.Data;
using inventario.Models;

namespace inventario.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialsController : ControllerBase
    {
        private readonly inventarioContext _context;
        private readonly IDataRepository<Material> _repo;
        public MaterialsController(inventarioContext context, IDataRepository<Material> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Materials
        [HttpGet]
        /*public async Task<ActionResult<IEnumerable<Material>>> GetMaterial()
        {
            return await _context.Material.ToListAsync();
        }*/

        public IEnumerable<Material> GetMaterial()
        {
            return _context.Material.OrderByDescending(p => p.MaterialId);
        }

        // GET: api/Materials/5
        //[HttpGet("{id}")]
        /*public async Task<ActionResult<Material>> GetMaterial(int id)
        {
            var material = await _context.Material.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }
            return material;
        }*/
        // GET: api/Materials/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaterial([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var material = await _context.Material.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }
            return Ok(material);
        }

        // PUT: api/Materials/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        /*public async Task<IActionResult> PutMaterial(int id, Material material)
        {
            if (id != material.MaterialId)
            {
                return BadRequest();
            }
            _context.Entry(material).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }*/
        // PUT: api/Materials/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterial([FromRoute] int id, [FromBody] Material material)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != material.MaterialId)
            {
                return BadRequest();
            }
            _context.Entry(material).State = EntityState.Modified;
            try
            {
                _repo.Update(material);
                var save = await _repo.SaveAsync(material);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // POST: api/Materials
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        /*public async Task<ActionResult<Material>> PostMaterial(Material material)
        {
            _context.Material.Add(material);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetMaterial", new { id = material.MaterialId }, material);
        }*/
        // POST: api/Materials
        [HttpPost]
        public async Task<IActionResult> PostMaterial([FromBody] Material material)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _repo.Add(material);
            
            //IList<Material> grades = new List<Material>();
            //grades.Add(new Material() { Nombre = "Grade 1", Descripcion = "A" });

            var save = await _repo.SaveAsync(material);
            return CreatedAtAction("GetMaterial", new { id = material.MaterialId }, material);
        }

        // DELETE: api/Materials/5
        //[HttpDelete("{id}")]
        /*public async Task<ActionResult<Material>> DeleteMaterial(int id)
        {
            var material = await _context.Material.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }
            _context.Material.Remove(material);
            await _context.SaveChangesAsync();
            return material;
        }*/
        // DELETE: api/Materials/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var material = await _context.Material.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }
            _repo.Delete(material);
            var save = await _repo.SaveAsync(material);
            return Ok(material);
        }

        private bool MaterialExists(int id)
        {
            return _context.Material.Any(e => e.MaterialId == id);
        }

    }
}
