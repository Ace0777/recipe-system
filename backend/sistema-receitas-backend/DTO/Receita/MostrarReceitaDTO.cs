using sistema_receitas_backend.DTO.Ingrediente;

namespace sistema_receitas_backend.DTO.Receita
{
    
    public class MostrarReceitaDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public string Descricao { get; set; } = "";
        public List<MostrarIngredienteDTO>? Ingredientes { get; set; }
        public int Curtidas { get; set; }
        public int UsuarioId { get; set; }

    }
}
