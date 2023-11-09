using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_receitas_backend.Models;
using sistema_receitas_backend.DTO.Receita;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace sistema_receitas_backend.Controllers
{
    [Route("api/receita")]
    [ApiController]
    public class ReceitaController : Controller
    {
        private readonly sistema_receitas_backendContext _context;

        public ReceitaController(sistema_receitas_backendContext context)
        {
            _context = context;
        }


        // GET: api/receita
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var receitas = await _context.Receita.ToListAsync();
            return Ok(receitas); 
        }

        // GET: api/receita/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var receita = await _context.Receita.FindAsync(id);

            if (receita == null)
            {
                return NotFound("Receita não encontrada.");
            }

            return Ok(receita);
        }

        // POST: api/receita
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CriarReceitaDTO criarReceitaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Dados inválidos.");
            }

            var novaReceita = new Receita
            {
                Nome = criarReceitaDTO.Nome,
                Descricao = criarReceitaDTO.Descricao,
                UsuarioId = criarReceitaDTO.UsuarioId,
            };

            if (criarReceitaDTO.IngredientesIds.Count > 0)
            {
                var ingredientes = await _context.Ingrediente
                    .Where(i => criarReceitaDTO.IngredientesIds.Contains(i.Id))
                    .ToListAsync();

                var receitaIngredientes = ingredientes.Select(ingrediente => new ReceitaIngrediente
                {
                    Receita = novaReceita,
                    Ingrediente = ingrediente
                }).ToList();

                _context.ReceitaIngrediente.AddRange(receitaIngredientes);
            }

            _context.Receita.Add(novaReceita);

            
            await _context.SaveChangesAsync();

            return Ok(novaReceita);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] EditarReceitaDTO editarReceitaDTO)
        {
            var receita = await _context.Receita.FindAsync(id);

            if (receita == null)
            {
                return NotFound("Receita não encontrada.");
            }

            receita.Nome = editarReceitaDTO.Nome;
            receita.Descricao = editarReceitaDTO.Descricao;
            
            receita.Ingredientes = await _context.ReceitaIngrediente
            .Where(r => r.ReceitaId == id)
            .ToListAsync();

            _context.ReceitaIngrediente.RemoveRange(receita.Ingredientes);

            if (editarReceitaDTO.IngredientesIds != null || editarReceitaDTO.IngredientesIds.Count > 0)
            {   
                foreach (var ingredienteId in editarReceitaDTO.IngredientesIds)
                {
                    var ingrediente = await _context.Ingrediente.FindAsync(ingredienteId);
                    if (ingrediente != null)
                    {
                        receita.Ingredientes.Add(new ReceitaIngrediente
                        {
                            Receita = receita,
                            Ingrediente = ingrediente
                        });
                    }
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Ocorreu um conflito ao atualizar a receita.");
            }
        }


        // DELETE: api/receita/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var receita = await _context.Receita.FindAsync(id);
            if (receita == null)
            {
                return NotFound("Receita não encontrada.");
            }

            _context.Receita.Remove(receita);
            await _context.SaveChangesAsync();

            return Ok("Receita excluída com sucesso.");
        }
    }
}
