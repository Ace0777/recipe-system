﻿using Microsoft.AspNetCore.Mvc;
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

            return Ok(receita); // Retorna a receita encontrada em JSON
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
                Curtidas = criarReceitaDTO.Curtidas,
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

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                // Outras configurações, se necessário
            };

            var json = JsonSerializer.Serialize(novaReceita, options);

            await _context.SaveChangesAsync();

            return Ok(json);
        }

        // PUT: api/receita/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Receita receita)
        {
            if (id != receita.Id)
            {
                return BadRequest("O ID na URL e o ID no corpo da solicitação não coincidem.");
            }

            if (!_context.Receita.Any(u => u.Id == id))
            {
                return NotFound("Receita não encontrada.");
            }

            _context.Entry(receita).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(receita); 
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