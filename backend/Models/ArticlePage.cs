using EPiServer.Core;
using EPiServer.DataAnnotations;
using headless_cms.Models.Blocks;

namespace headless_cms.Models.Pages;

[ContentType(DisplayName = "Article Page", GUID = "cbbeff57-7417-48f2-9e7d-0720c8adf207", AvailableInEditMode = true)]
public class ArticlePage : PageData
{
    public virtual string Title { get; set; }

    public virtual DateTime PublishedDate { get; set; }

    public virtual string Author { get; set; }

    public virtual XhtmlString Body { get; set; }

    [AllowedTypes(AllowedTypes = new[] { typeof(ImageBlock), typeof(TextBlock), typeof(QuoteBlock) })]
    public virtual ContentArea MainContentArea { get; set; }
}
