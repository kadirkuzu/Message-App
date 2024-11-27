using FluentValidation.AspNetCore;
using MessageApp.Application.Validators.Messages;
using MessageApp.Infrastructure;
using MessageApp.Infrastructure.Services.Storage.Local;
using MessageApp.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPersistenceServices();
builder.Services.AddInfrastructureServices();

builder.Services.AddStorage<LocalStorage>();

builder.Services.AddControllers()
    .AddFluentValidation(conf => conf.RegisterValidatorsFromAssemblyContaining<SendMessageValidator>());


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options=> options.AddDefaultPolicy(policy => policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{  
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
