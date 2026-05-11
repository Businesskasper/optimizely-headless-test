using EPiServer.Core;
using EPiServer.DataAnnotations;

namespace headless_cms.Models.Blocks;

[ContentType(DisplayName = "Text Block", GUID = "49b5b739-83b1-408f-83da-853056350b71")]
public class TextBlock : BlockData
{
    public virtual string Heading { get; set; }
    public virtual XhtmlString Text { get; set; }
}