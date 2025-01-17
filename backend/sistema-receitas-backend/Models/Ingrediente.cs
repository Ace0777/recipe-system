﻿namespace sistema_receitas_backend.Models
{
    public class Ingrediente
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public double Quantidade { get; set; }
        public List<ReceitaIngrediente> Receitas { get; set; } = new List<ReceitaIngrediente>();
    }
}