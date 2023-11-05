using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using sistema_receitas_backend.Models;

namespace sistema_receitas_backend.Controllers
{
    [Route("api/receitaingredientes")]
    [ApiController]
    public class ReceitaIngredientesController : ControllerBase
    {
        private readonly sistema_receitas_backendContext _context;

        public ReceitaIngredientesController(sistema_receitas_backendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceitaIngrediente>>> List()
        {
            var receitaIngredientes = await _context.ReceitaIngrediente.ToListAsync();
            return Ok(receitaIngredientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReceitaIngrediente>> Details(int id)
        {
            var receitaIngrediente = await _context.ReceitaIngrediente.FindAsync(id);

            if (receitaIngrediente == null)
            {
                return NotFound();
            }

            return Ok(receitaIngrediente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, ReceitaIngrediente receitaIngrediente)
        {
            if (id != receitaIngrediente.Id)
            {
                return BadRequest();
            }

            _context.Entry(receitaIngrediente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceitaIngredienteExists(id))
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

        [HttpPost]
        public async Task<ActionResult<ReceitaIngrediente>> Create(ReceitaIngrediente receitaIngrediente)
        {
            _context.ReceitaIngrediente.Add(receitaIngrediente);
            await _context.SaveChangesAsync();

            return Ok(receitaIngrediente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var receitaIngrediente = await _context.ReceitaIngrediente.FindAsync(id);
            if (receitaIngrediente == null)
            {
                return NotFound();
            }

            var ri = _context.ReceitaIngrediente.Remove(receitaIngrediente);
            await _context.SaveChangesAsync();

            return Ok(ri);
        }

        private bool ReceitaIngredienteExists(int id)
        {
            return _context.ReceitaIngrediente.Any(e => e.Id == id);
        }
    }
}
