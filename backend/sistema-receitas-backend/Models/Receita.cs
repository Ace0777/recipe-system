using sistema_receitas_backend.Models;


namespace sistema_receitas_backend.Models
{
    public class Receita
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public string Descricao { get; set; } = "";
        public List<ReceitaIngrediente>? Ingredientes { get; set; } = new List<ReceitaIngrediente>();
        public int Curtidas { get; set; }
        
        [System.ComponentModel.DataAnnotations.Schema.ForeignKey("Usuario")]
        public int UsuarioId { get; set; }

        public Usuario Usuario { get; set; }
    }
}
