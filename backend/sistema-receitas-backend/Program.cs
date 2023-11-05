using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using sistema_receitas_backend.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<sistema_receitas_backendContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("MySqlConnection") ?? throw new InvalidOperationException("Connection string 'sistema_receitas_backendContext' not found.");
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 26)));
});

using var scope = builder.Services.BuildServiceProvider().CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<sistema_receitas_backendContext>();
dbContext.Database.Migrate();

builder.Services.AddControllers();
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();