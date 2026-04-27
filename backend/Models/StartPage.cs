using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.Core;

namespace headless_cms.Models.Pages
{
    [ContentType(DisplayName = "Start Page", GUID = "82d6ddff-e5ad-4838-8eb4-d316843a7426", AvailableInEditMode = true)]
    public class StartPage : PageData
    {
        public virtual string Heading { get; set; }

        public virtual XhtmlString MainBody { get; set; }

        public virtual ContentArea MainContentArea { get; set; }
    }
}