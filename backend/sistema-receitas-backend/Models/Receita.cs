using sistema_receitas_backend.Models;


namespace sistema_receitas_backend.Models
{
    public class Receita
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public string Descricao { get; set; } = "";
        public List<Ingrediente>? Ingredientes { get; set; } = new List<Ingrediente>();
        public int Curtidas { get; set; }
        public Usuario Usuario { get; set;} = new Usuario();
    }
}
