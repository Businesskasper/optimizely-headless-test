using EPiServer.Cms.Shell;
using EPiServer.Cms.UI.AspNetIdentity;
// using EPiServer.ContentDefinitionsApi;
using EPiServer.OpenIDConnect;
using EPiServer.Scheduler;
using EPiServer.Web.Routing;


namespace optimizely_headless;

public class Startup(IWebHostEnvironment webHostingEnvironment)
{
    public void ConfigureServices(IServiceCollection services)
    {
        if (webHostingEnvironment.IsDevelopment())
        {
            AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(webHostingEnvironment.ContentRootPath, "App_Data"));

            services.Configure<SchedulerOptions>(options => options.Enabled = false);
        }

        services
            .AddCmsAspNetIdentity<ApplicationUser>()
            .AddCms()
            .AddAdminUserRegistration()
            .AddEmbeddedLocalization<Startup>();



        services.AddOpenIDConnect<ApplicationUser>(useDevelopmentCertificate: true, createSchema: true, options =>
        {
            // Sample application using Client Credentials to make
            // machine-to-machine API calls
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
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapContent();
        });
    }
}
