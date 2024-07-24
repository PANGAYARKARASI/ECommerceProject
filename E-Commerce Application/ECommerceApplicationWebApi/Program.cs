
using ECommerceLibrary.Model;
using ECommerceLibrary.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ECommerceApplicationWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddScoped<IProductRepo, ProductRepository>();
            builder.Services.AddScoped<IUserRepo, UserRepository>();
            builder.Services.AddScoped<IOrderRepo, OrderRepository>();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            var configuration = builder.Configuration;
            builder.Services.AddDbContext<ECommerceDBContext>(options =>
            {
                //options.UseSqlServer(@"server=(localdb)\MSSQLLocalDB; database=EmployeeDb; integrated security=true");
                options.UseSqlServer(configuration.GetConnectionString("ECommerceDB"));

            });
            var app = builder.Build();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.MapControllers();

            app.Run();
        }
    }
}
