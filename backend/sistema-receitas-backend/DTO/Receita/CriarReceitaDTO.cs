namespace sistema_receitas_backend.DTO.Receita
{
    public class CriarReceitaDTO
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public int Curtidas { get; set; }
        public int UsuarioId { get; set; }
        public List<int> IngredientesIds { get; set; }
    }
}
