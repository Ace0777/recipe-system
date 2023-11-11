namespace sistema_receitas_backend.DTO.Usuario
{
    public class MostrarUsuarioDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Profile { get; set; } = "FUNC";
    }
}
