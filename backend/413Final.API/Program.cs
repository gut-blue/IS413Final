using _413Final.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EntertainmentDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("EntertainmentConnection")));




// ADDING CORS POLICY
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://is413final-frontend.azurewebsites.net") // Remember this isn't a real site yet, I need to deploy
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// CAPABILITY FOR LOGGING
builder.Logging.ClearProviders();
builder.Logging.AddConsole();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
