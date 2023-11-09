using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_receitas_backend.DTO.Usuario;
using sistema_receitas_backend.Migrations;
using sistema_receitas_backend.Models;

namespace sistema_receitas_backend.Controllers
{

    [Route("api/usuario")]
    public class UsuarioController : Controller
    {
        private readonly sistema_receitas_backendContext _context;

        public UsuarioController(sistema_receitas_backendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var usuarios = await _context.Usuario.ToListAsync();
            return Ok(usuarios);
        }

        // GET: api/usuario/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Usuario == null)
            {
                return NotFound();
            }

            var usuario = await _context.Usuario
                .FirstOrDefaultAsync(m => m.Id == id);
            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CriarUsuarioDTO criarUsuarioDTO)
        {
            if (ModelState.IsValid)
            {
               
                var usuario = new Usuario
                {
                    Name = criarUsuarioDTO.Name,
                    Email = criarUsuarioDTO.Email,
                    Senha = criarUsuarioDTO.Senha
                   
                };

                _context.Add(usuario);
                await _context.SaveChangesAsync();

                
                return Ok(usuario);
            }

            return BadRequest(ModelState);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Email,Senha,Profile")] Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest("O ID na URL e o ID no corpo da solicitação não coincidem.");
            }

            if (!_context.Usuario.Any(u => u.Id == id))
            {
                return NotFound("usuario não encontrado.");
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(usuario);
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Ocorreu um conflito ao atualizar o usuario.");
            }
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Usuario == null)
            {
                return NotFound();
            }

            var usuario = await _context.Usuario.FirstOrDefaultAsync(m => m.Id == id);

            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuario.Remove(usuario);
            await _context.SaveChangesAsync();

            return Ok(usuario);
        }

        private bool UsuarioExists(int id)
        {
          return (_context.Usuario?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
