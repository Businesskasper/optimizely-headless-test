using EPiServer.Core;
using EPiServer.DataAnnotations;

namespace headless_cms.Models.Blocks;

[ContentType(DisplayName = "Quote Block", GUID = "a468ff39-ad6f-4a4c-973a-edc7aa21c4be")]
public class QuoteBlock : BlockData
{
    public virtual string QuoteText { get; set; }
    public virtual string Attribution { get; set; }
}