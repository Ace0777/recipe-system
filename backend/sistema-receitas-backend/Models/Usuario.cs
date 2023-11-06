namespace sistema_receitas_backend.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? Email { get; set; } = "";
        public string Senha { get; set; } = "";
        public string Profile { get; set; } = "FUNC";
        public List<Receita>? Receita { get; set; } = new List<Receita>();
    }
}
