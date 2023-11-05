using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> Index()
        {
              return _context.Usuario != null ? 
                          new JsonResult(await _context.Usuario.ToListAsync()) :
                          Problem("Entity set 'sistema_receitas_backendContext.Usuario'  is null.");
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

            return new JsonResult(usuario);
        }

        [HttpPost]
        public async Task<IActionResult> Create([Bind("Id,Name,Email,Senha,Profile")] Usuario usuario)
        {
            _context.Add(usuario);
            await _context.SaveChangesAsync();
            
            return new JsonResult(usuario);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Email,Senha,Profile")] Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest();
            }

            if (!_context.Usuario.Any(u => u.Id == id))
            {
                return NotFound(); 
            }

            _context.Entry(usuario).State = EntityState.Modified; 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
               
                return StatusCode(409); 
            }

            return Ok(usuario);
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

            return new JsonResult(usuario);
        }

        private bool UsuarioExists(int id)
        {
          return (_context.Usuario?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
