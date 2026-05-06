import type { ContentItem } from "@/lib/optimizely";
import { isTextBlock, TextBlockRenderer } from "./TextBlockRenderer";

export function RenderBlock({ block }: { block: ContentItem }) {
  if (isTextBlock(block)) {
    return <TextBlockRenderer block={block} />;
  }

  return <div>Unknown block: {block.contentType?.join(", ")}</div>;
}
