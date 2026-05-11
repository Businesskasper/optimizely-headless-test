using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.Shell.ObjectEditing;
using headless_cms.Models.Blocks;

namespace headless_cms.Models.Blocks;

[ContentType(DisplayName = "Navigation", GUID = "c466bb53-f331-4452-a175-f308ab96784a")]
public class Navigation : BlockData
{
    [AllowedTypes(AllowedTypes = new[] { typeof(NavigationItem) })]
    public virtual ContentArea NavigationItems { get; set; }
}