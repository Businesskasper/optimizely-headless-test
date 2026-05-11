using EPiServer.Core;
using EPiServer.DataAnnotations;
using headless_cms.Models.Blocks;

namespace headless_cms.Models.Pages;

[ContentType(DisplayName = "Blog Listing Page", GUID = "25640ae7-e1b9-4780-b829-31c08a5dcefe", AvailableInEditMode = true)]
[AvailableContentTypes(Include = new[] { typeof(ArticlePage) })]

public class BlogListingPage : PageData
{
    public virtual string Heading { get; set; }

    public virtual XhtmlString Intro { get; set; }

    [AllowedTypes(AllowedTypes = new[] { typeof(Navigation) })]
    public virtual ContentReference EntryNavigation { get; set; }
}
