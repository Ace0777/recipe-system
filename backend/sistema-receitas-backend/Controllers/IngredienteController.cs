using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using sistema_receitas_backend.DTO.Ingrediente;
using sistema_receitas_backend.Models;

namespace sistema_receitas_backend.Controllers
{
    [Route("api/ingrediente")]
    [ApiController]
    public class IngredienteController : ControllerBase
    {
        private readonly sistema_receitas_backendContext _context;

        public IngredienteController(sistema_receitas_backendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var ingredientes = await _context.Ingrediente.ToListAsync();
            return Ok(ingredientes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var ingrediente = await _context.Ingrediente.FindAsync(id);

            if (ingrediente == null)
            {
                return NotFound();
            }
            var recebeDTO = new MostrarIngredienteDTO {Id = ingrediente.Id, Nome = ingrediente.Nome, Quantidade = ingrediente.Quantidade };
            return Ok(recebeDTO);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CriarIngredienteDTO criarIngredienteDTO)
        {
            if (ModelState.IsValid)
            {
              
                var ingrediente = new Ingrediente
                {
                    Nome = criarIngredienteDTO.Nome,
                    Quantidade = criarIngredienteDTO.Quantidade
                };

                _context.Add(ingrediente);
                await _context.SaveChangesAsync();

                
                return Ok(ingrediente);
            }

            return BadRequest(ModelState);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Ingrediente ingrediente)
        {
            if (id != ingrediente.Id)
            {
                return BadRequest("O ID na URL e o ID no corpo da solicitação não coincidem.");
            }

            if (!_context.Ingrediente.Any(u => u.Id == id))
            {
                return NotFound("Ingrediente não encontrado.");
            }

            _context.Entry(ingrediente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(ingrediente); // Retorna o ingrediente atualizado
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Ocorreu um conflito ao atualizar o ingrediente.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Ingrediente == null)
            {
                return NotFound();
            }

            var ingrediente = await _context.Ingrediente.FirstOrDefaultAsync(m => m.Id == id);

            if (ingrediente == null)
            {
                return NotFound();
            }

            _context.Ingrediente.Remove(ingrediente);
            await _context.SaveChangesAsync();

            return Ok(ingrediente);
        }
    }
}
