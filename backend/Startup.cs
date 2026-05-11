using EPiServer.Cms.Shell;
using EPiServer.Cms.UI.AspNetIdentity;
// using EPiServer.ContentDefinitionsApi;
using EPiServer.OpenIDConnect;
using EPiServer.Scheduler;
using EPiServer.Web.Routing;
using optimizely_headless.Services;


namespace optimizely_headless;

public class Startup
{
    private IConfiguration _configuration;
    private IWebHostEnvironment _webHostingEnvironment;

    public Startup(IWebHostEnvironment webHostingEnvironment, IConfiguration configuration)
    {
        _configuration = configuration;
        _webHostingEnvironment = webHostingEnvironment;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        if (_webHostingEnvironment.IsDevelopment())
        {
            AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(_webHostingEnvironment.ContentRootPath, "App_Data"));

            services.Configure<SchedulerOptions>(options => options.Enabled = false);
        }

        services.AddLogging();

        // Frontend client to revalidate paths after content changes
        services.AddFrontendClient();

        services
            .AddCmsAspNetIdentity<ApplicationUser>()
            .AddCms()
            .AddAdminUserRegistration()
            .AddEmbeddedLocalization<Startup>();

        services.AddOpenIDConnect<ApplicationUser>(useDevelopmentCertificate: true, createSchema: true, options =>
        {
            options.Applications.Add(new OpenIDConnectApplication
            {
                ClientId = "cli",
                ClientSecret = "cli",
                // Scopes = {
                //     ContentDefinitionsApiOptionsDefaults.Scope
                // }, 
            });
        });

        services.AddOpenIDConnectUI();

        services.AddContentDeliveryApi(options =>
        {
            options.SiteDefinitionApiEnabled = true;
            // options.DisableScopeValidation = false;
            options.DisableScopeValidation = true;
        });

        services.ConfigureContentApiOptions(options =>
        {
            options.HttpResponseExpireTime = TimeSpan.FromSeconds(1);
        });

    }


    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseStaticFiles();

        // if (env.IsDevelopment())
        // {
        //     app.Use(async (context, next) =>
        //     {
        //         var loggerFactory = app.ApplicationServices.GetRequiredService<ILoggerFactory>();
        //         var logger = loggerFactory.CreateLogger("RequestLogging");
        //         if (logger != null)
        //         {
        //             logger.LogDebug("Requested {Url}", context.Request.Path);
        //             foreach (var header in context.Request.Headers)
        //                 logger.LogDebug("  {Key}: {Value}", header.Key, header.Value);
        //         }

        //         await next();
        //     });
        // }

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapContent();
        });
    }
}
