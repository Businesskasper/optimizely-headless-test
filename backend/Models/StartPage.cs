using EPiServer.Core;
using EPiServer.DataAnnotations;
using headless_cms.Models.Blocks;

namespace headless_cms.Models.Pages;

[ContentType(DisplayName = "Start Page", GUID = "82d6ddff-e5ad-4838-8eb4-d316843a7426", AvailableInEditMode = true)]
public class StartPage : PageData
{
    [AllowedTypes(AllowedTypes = new[] { typeof(Navigation) })]
    public virtual ContentReference TopNavigation { get; set; }
    public virtual string Heading { get; set; }

    public virtual XhtmlString MainBody { get; set; }

    public virtual ContentArea MainContentArea { get; set; }
}
