using KashiVibes.API.Middleware;
using KashiVibes.Application;
using KashiVibes.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

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
    options.ServeUnknownFileTypes = false; // Change to false
    options.DefaultContentType = "application/octet-stream";

    // MIME types manually set karein
    var provider = new FileExtensionContentTypeProvider();
    provider.Mappings[".js"] = "application/javascript";
    provider.Mappings[".mjs"] = "application/javascript";
    provider.Mappings[".wasm"] = "application/wasm";
    provider.Mappings[".json"] = "application/json";

    options.ContentTypeProvider = provider;
});

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"]
    ?? throw new ArgumentNullException("SecretKey", "JWT SecretKey is missing");

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
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

// CORS - IMPROVED CONFIGURATION
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowProduction", policy =>
    {
        policy.WithOrigins(
            "https://vikasvikki-001-site1.rtempurl.com",
            "http://vikasvikki-001-site1.rtempurl.com",
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
app.UseHttpsRedirection();

// SmarterASP.net specific - Angular SPA support
app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
    {
        context.Request.Path = "/index.html";
        await next();
    }
});

// CORS must be in this order
app.UseCors("AllowProduction");

app.UseAuthentication();
app.UseAuthorization();

// Static files serve karne ke liye
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

// YE LINE IMPORTANT HAI - Angular routing ke liye
app.MapFallbackToFile("/index.html");

app.Run();