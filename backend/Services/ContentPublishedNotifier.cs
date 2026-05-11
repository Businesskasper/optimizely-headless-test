using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;

namespace optimizely_headless.Services;

[InitializableModule]
public class ContentPublishedNotifier : IInitializableModule
{
    private IFrontendClient _frontendClient = null!;
    private ILogger<ContentPublishedNotifier> _logger = null!;
    private bool _eventsAttached = false;

    public void Initialize(InitializationEngine context)
    {
        if (_eventsAttached) return;

        _frontendClient = context.Locate.Advanced.GetInstance<IFrontendClient>();
        _logger = context.Locate.Advanced.GetInstance<ILogger<ContentPublishedNotifier>>();

        _logger.LogInformation("Register ContentPublishedNotifier");

        var contentEvents = context.Locate.ContentEvents();
        contentEvents.PublishedContent += _onContentPublished;
        _eventsAttached = true;
    }

    public void Uninitialize(InitializationEngine context)
    {
        if (!_eventsAttached) return;

        _logger.LogInformation("Unregister ContentPublishedNotifier");

        var contentEvents = context.Locate.ContentEvents();
        contentEvents.PublishedContent -= _onContentPublished;
        _eventsAttached = false;
    }

    private void _onContentPublished(object? sender, ContentEventArgs contentEventArgs)
    {
        var urlResolver = ServiceLocator.Current.GetInstance<IUrlResolver>();
        var friendlyUrl = urlResolver.GetUrl(contentEventArgs.ContentLink);
        _logger.LogDebug("friendlyUrl: {friendlyUrl}", friendlyUrl);

        if (string.IsNullOrEmpty(friendlyUrl)) return;

        _logger.LogInformation("Received update on path \"{path}\"", friendlyUrl);
        _frontendClient.RevalidatePath(friendlyUrl).GetAwaiter().GetResult();
        _logger.LogDebug("Revalidated!");
    }
}
