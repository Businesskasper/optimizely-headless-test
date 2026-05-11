using EPiServer.Core;
using EPiServer.DataAnnotations;

namespace headless_cms.Models.Blocks;

[ContentType(DisplayName = "Navigation Item", GUID = "cd8ad41d-1c64-437a-8953-ec393067a84b")]
public class NavigationItem : BlockData
{
    public virtual string Label { get; set; }
    public virtual Url Link { get; set; }
}