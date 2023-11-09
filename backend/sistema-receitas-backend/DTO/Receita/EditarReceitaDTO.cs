namespace sistema_receitas_backend.DTO.Receita
{
    public class EditarReceitaDTO
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public List<int> IngredientesIds { get; set; }
    }
}
