import { Stack, Text } from "@mantine/core";
import NextImage from "next/image";
import { arrayStartsWith } from "@/lib/object-utils";
import type {
  ContentFileReference,
  ContentItem,
  ContentLongString,
} from "@/lib/optimizely";

type ImageFileItem = ContentItem & { altText?: ContentLongString };

export type ImageBlock = ContentItem & {
  caption: ContentLongString;
  alt: ContentLongString;
  image: ContentFileReference;
};

export const isImageBlock = (item: ContentItem): item is ImageBlock =>
  arrayStartsWith(item.contentType, ["Block", "ImageBlock"]);

export function ImageBlockRenderer({ block }: { block: ImageBlock }) {
  const expandedImage = block.image?.value?.expanded as ImageFileItem | null;
  const alt = block.alt?.value || expandedImage?.altText?.value || "";

  return (
    <Stack gap="xs">
      <NextImage
        src={block.image.value.url}
        alt={alt}
        width={400}
        height={300}
        unoptimized
        style={{ width: "100%", height: "auto" }}
      />
      {block.caption?.value && (
        <Text size="sm" c="dimmed">
          {block.caption.value}
        </Text>
      )}
    </Stack>
  );
}
