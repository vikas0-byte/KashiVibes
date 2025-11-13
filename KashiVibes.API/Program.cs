using KashiVibes.API.Middleware;
using KashiVibes.Application;
using KashiVibes.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Render.com specific - PORT environment variable
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://*:{port}");

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger Configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "KashiVibes API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Database Configuration (ADO.NET)
builder.Services.AddInfrastructure(builder.Configuration);

// Application Services
builder.Services.AddApplication();

// Static Files Configuration
builder.Services.Configure<StaticFileOptions>(options =>
{
    options.ServeUnknownFileTypes = false;
    options.DefaultContentType = "application/octet-stream";

    var provider = new FileExtensionContentTypeProvider();
    provider.Mappings[".js"] = "application/javascript";
    provider.Mappings[".mjs"] = "application/javascript";
    provider.Mappings[".wasm"] = "application/wasm";
    provider.Mappings[".json"] = "application/json";

    options.ContentTypeProvider = provider;
});

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? "YourSuperSecretKeyForRenderDeployment123";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"] ?? "https://kashivibes.onrender.com",
        ValidAudience = jwtSettings["Audience"] ?? "https://kashivibes.onrender.com",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

// CORS - Render.com ke liye update
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowRender", policy =>
    {
        policy.WithOrigins(
                "https://kashivibes.onrender.com",
                "http://kashivibes.onrender.com",
                "https://localhost:4200",
                "http://localhost:4200"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Health Checks
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

// HTTPS Redirection - Render.com par comment out karein
// app.UseHttpsRedirection();

// Angular SPA support
app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
    {
        context.Request.Path = "/index.html";
        await next();
    }
});

// CORS
app.UseCors("AllowRender");

app.UseAuthentication();
app.UseAuthorization();

// Static files
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = new FileExtensionContentTypeProvider
    {
        Mappings =
        {
            [".js"] = "application/javascript",
            [".mjs"] = "application/javascript",
            [".wasm"] = "application/wasm",
            [".json"] = "application/json"
        }
    }
});

app.MapControllers();
app.MapHealthChecks("/health");

// Angular routing
app.MapFallbackToFile("/index.html");

app.Run();