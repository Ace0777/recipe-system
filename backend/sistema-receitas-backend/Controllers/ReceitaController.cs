using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_receitas_backend.Models;
using sistema_receitas_backend.DTO.Receita;
using System.Text.Json.Serialization;
using System.Text.Json;
using sistema_receitas_backend.DTO.Ingrediente;
using sistema_receitas_backend.Migrations;

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

            var receitasDTO = new List<MostrarReceitaDTO>();
            
            foreach (var receita in receitas) {

                List<Ingrediente> ingredientesDaReceita = await _context.ReceitaIngrediente
                    .Where(ri => ri.ReceitaId == receita.Id)
                    .Join(_context.Ingrediente, 
                        receitaIngrediente => receitaIngrediente.IngredienteId,
                        ingrediente => ingrediente.Id,
                        (receitaIngrediente, ingrediente) => ingrediente)
                    .ToListAsync();


                var ingredientesDTO = new List<MostrarIngredienteDTO>();

                if (ingredientesDaReceita.Count > 0)
                {
                    foreach (var ing in ingredientesDaReceita)
                    {
                        var ingDTO = new MostrarIngredienteDTO { Id = ing.Id, Nome = ing.Nome, Quantidade = ing.Quantidade };
                        ingredientesDTO.Add(ingDTO);
                    }
                }

                var mrDTO = new MostrarReceitaDTO { Id = receita.Id, Nome = receita.Nome, Descricao = receita.Descricao, Curtidas = receita.Curtidas, Ingredientes = ingredientesDTO, UsuarioId = receita.UsuarioId };
                receitasDTO.Add(mrDTO);
            }
            
            return Ok(receitasDTO); 
        }

        // GET: api/receita/usuario/1
        [HttpGet("usuario/{userId}")]
        public async Task<IActionResult> ListByUserId(int userId) // busca receitas pelo id do usuario que cadastrou
        {
            var receitas = await _context.Receita.Where(r => r.UsuarioId == userId).ToListAsync();

            var receitasDTO = new List<MostrarReceitaDTO>();

            foreach (var receita in receitas)
            {

                List<Ingrediente> ingredientesDaReceita = await _context.ReceitaIngrediente
                    .Where(ri => ri.ReceitaId == receita.Id)
                    .Join(_context.Ingrediente,
                        receitaIngrediente => receitaIngrediente.IngredienteId,
                        ingrediente => ingrediente.Id,
                        (receitaIngrediente, ingrediente) => ingrediente)
                    .ToListAsync();


                var ingredientesDTO = new List<MostrarIngredienteDTO>();

                if (ingredientesDaReceita.Count > 0)
                {
                    foreach (var ing in ingredientesDaReceita)
                    {
                        var ingDTO = new MostrarIngredienteDTO { Id = ing.Id, Nome = ing.Nome, Quantidade = ing.Quantidade };
                        ingredientesDTO.Add(ingDTO);
                    }
                }

                var mrDTO = new MostrarReceitaDTO { Id = receita.Id, Nome = receita.Nome, Descricao = receita.Descricao, Curtidas = receita.Curtidas, Ingredientes = ingredientesDTO, UsuarioId = receita.UsuarioId };
                receitasDTO.Add(mrDTO);
            }

            return Ok(receitasDTO);
        }

        // GET: api/receita/nome/nomeReceita
        [HttpGet("nome/{nomeReceita}")]
        public async Task<IActionResult> ListByNome(string nomeReceita) // busca receitas pelo nome da receita
        {
            var receitas = await _context.Receita.Where(r => r.Nome.Contains(nomeReceita)).ToListAsync();

            var receitasDTO = new List<MostrarReceitaDTO>();

            foreach (var receita in receitas)
            {
                List<Ingrediente> ingredientesDaReceita = await _context.ReceitaIngrediente
                    .Where(ri => ri.ReceitaId == receita.Id)
                    .Join(_context.Ingrediente,
                        receitaIngrediente => receitaIngrediente.IngredienteId,
                        ingrediente => ingrediente.Id,
                        (receitaIngrediente, ingrediente) => ingrediente)
                    .ToListAsync(); ;

                var ingredientesDTO = new List<MostrarIngredienteDTO>();

                if (ingredientesDaReceita.Count > 0)
                {
                    foreach (var ing in ingredientesDaReceita)
                    {
                        var ingDTO = new MostrarIngredienteDTO { Id = ing.Id, Nome = ing.Nome, Quantidade = ing.Quantidade };
                        ingredientesDTO.Add(ingDTO);
                    }
                }

                var mrDTO = new MostrarReceitaDTO { Id = receita.Id, Nome = receita.Nome, Descricao = receita.Descricao, Curtidas = receita.Curtidas, Ingredientes = ingredientesDTO, UsuarioId = receita.UsuarioId };
                receitasDTO.Add(mrDTO);
            }

            return Ok(receitasDTO);
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

            List<Ingrediente> ingredientesDaReceita = await _context.ReceitaIngrediente
            .Where(ri => ri.ReceitaId == receita.Id)
            .Join(_context.Ingrediente,
                receitaIngrediente => receitaIngrediente.IngredienteId,
                ingrediente => ingrediente.Id,
                (receitaIngrediente, ingrediente) => ingrediente)
            .ToListAsync();

            var ingredientesDTO = new List<MostrarIngredienteDTO>();

            if (ingredientesDaReceita.Count > 0)
            {
                foreach (var ing in ingredientesDaReceita)
                {
                    var ingDTO = new MostrarIngredienteDTO { Id = ing.Id, Nome = ing.Nome, Quantidade = ing.Quantidade };
                    ingredientesDTO.Add(ingDTO);
                }
            }

            var receitaDTO = new MostrarReceitaDTO { Id = receita.Id, Descricao = receita.Descricao, Curtidas = receita.Curtidas , Nome = receita.Nome, Ingredientes = ingredientesDTO,UsuarioId = receita.UsuarioId};
            return Ok(receitaDTO);
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

                var receitaIngredientes = ingredientes.Select(ingrediente => new Models.ReceitaIngrediente
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
                        receita.Ingredientes.Add(new Models.ReceitaIngrediente
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
