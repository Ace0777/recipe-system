using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using sistema_receitas_backend.Models;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

public class sistema_receitas_backendContext : DbContext
{
    public sistema_receitas_backendContext(DbContextOptions<sistema_receitas_backendContext> options)
        : base(options)
    {
    }

    public DbSet<sistema_receitas_backend.Models.Receita> Receita { get; set; } = default!;

    public DbSet<sistema_receitas_backend.Models.Ingrediente>? Ingrediente { get; set; }

    public DbSet<sistema_receitas_backend.Models.Usuario>? Usuario { get; set; }

    public DbSet<sistema_receitas_backend.Models.ReceitaIngrediente>? ReceitaIngrediente { get; set; }
}
