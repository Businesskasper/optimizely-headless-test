using Microsoft.AspNetCore.WebUtilities;

namespace optimizely_headless.Services;

public interface IFrontendClient
{
    public Task RevalidatePath(string path);
}

public class FrontendClient : IFrontendClient
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<FrontendClient> _logger;

    public FrontendClient(HttpClient httpClient, IConfiguration configuration, ILogger<FrontendClient> logger)
    {
        _logger = logger;
        _httpClient = httpClient;

        var frontendBaseAddress = configuration.GetValue<string>("Frontend:BaseAddress") ?? throw new Exception("Frontend:BaseAddress is not set");
        _httpClient.BaseAddress = new Uri(frontendBaseAddress);

        var frontendRevalidateSecret = configuration.GetValue<string>("Frontend:RevalidateSecret") ?? throw new Exception("Frontend:RevalidateSecret is not set");
        _httpClient.DefaultRequestHeaders.Add("X-Api-Key", frontendRevalidateSecret);
    }

    public async Task RevalidatePath(string path)
    {
        _logger.LogInformation("Revalidate {path}", path);
        await _httpClient.PostAsync(QueryHelpers.AddQueryString("api/revalidate", "path", path), null);
    }
}

public static class FrontendClientExtensions
{
    public static IServiceCollection AddFrontendClient(this IServiceCollection services)
    {
        services.AddHttpClient<IFrontendClient, FrontendClient>();
        return services;
    }
}