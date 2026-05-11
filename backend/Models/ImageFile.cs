using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.Framework.DataAnnotations;

namespace headless_cms.Models.Media;

[ContentType(DisplayName = "Image", GUID = "a3e7c8b2-4f51-4d9e-b7a6-1c2d3e4f5a6b")]
[MediaDescriptor(ExtensionString = "jpg,jpeg,png,gif,webp,svg")]
public class ImageFile : ImageData
{
    public virtual string AltText { get; set; }
}
