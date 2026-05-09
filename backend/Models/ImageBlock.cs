[ContentType(DisplayName = "Image Block", GUID = "092f5756-e91c-4a2c-b627-ac6d6737828c")]
public class ImageBlock : BlockData
{
    public virtual string Caption { get; set; }
    public virtual string Alt {get; set; }
    public virtual ContentReference Image { get; set; }
}