using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using ApiAuth.Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace ApiAuth
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Console.WriteLine(Configuration);
            services.AddControllers();
            services.AddDbContext<MyDbContext>(options =>
               options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<MyDbContext>()
                .AddDefaultTokenProviders();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
            services.Configure<IISOptions>(options =>
            {

            });
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@";
                options.User.RequireUniqueEmail = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(2);
                options.Lockout.MaxFailedAccessAttempts = 2;
            });
            services.AddSwaggerDocument();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors("CorsPolicy");
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All
            });

            app.UseRouting();

            app.UseAuthorization();
            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            CreateUsersAndRoles(app).Wait();

        }
        private async Task CreateUsersAndRoles(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (var RoleManager = serviceScope.ServiceProvider.GetService<RoleManager<ApplicationRole>>())
                {
                    ApplicationRole role = new ApplicationRole()
                    {
                        Name = "SuperAdminName"
                    };
                  
                    var roleExist = await RoleManager.RoleExistsAsync(role.Name);
                    if (!roleExist)
                    {
                        var roleResult = await RoleManager.CreateAsync(role);
                    }
                }
            }
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (var UserManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>())
                {
                    ApplicationUser user1 = await UserManager.FindByEmailAsync("ismailelaissaoui@gmail.com");
                    if (user1 == null)
                    {
                        user1 = new ApplicationUser()
                        {
                            UserName = "ismailelaissaoui",
                            Email = "ismailelaissaoui@gmail.com",
                        };
                        await UserManager.CreateAsync(user1, "asx@6798I");
                    }
                    await UserManager.AddToRoleAsync(user1, "SuperAdminName");
                }
            }
        }

    }
}
