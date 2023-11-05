using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sistema_receitas_backend.Migrations
{
    /// <inheritdoc />
    public partial class ReceitaIngrediente : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingrediente_Receita_ReceitaId",
                table: "Ingrediente");

            migrationBuilder.DropIndex(
                name: "IX_Ingrediente_ReceitaId",
                table: "Ingrediente");

            migrationBuilder.DropColumn(
                name: "ReceitaId",
                table: "Ingrediente");

            migrationBuilder.CreateTable(
                name: "ReceitaIngrediente",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ReceitaId = table.Column<int>(type: "int", nullable: false),
                    IngredienteId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceitaIngrediente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReceitaIngrediente_Ingrediente_IngredienteId",
                        column: x => x.IngredienteId,
                        principalTable: "Ingrediente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReceitaIngrediente_Receita_ReceitaId",
                        column: x => x.ReceitaId,
                        principalTable: "Receita",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ReceitaIngrediente_IngredienteId",
                table: "ReceitaIngrediente",
                column: "IngredienteId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceitaIngrediente_ReceitaId",
                table: "ReceitaIngrediente",
                column: "ReceitaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReceitaIngrediente");

            migrationBuilder.AddColumn<int>(
                name: "ReceitaId",
                table: "Ingrediente",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ingrediente_ReceitaId",
                table: "Ingrediente",
                column: "ReceitaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingrediente_Receita_ReceitaId",
                table: "Ingrediente",
                column: "ReceitaId",
                principalTable: "Receita",
                principalColumn: "Id");
        }
    }
}
