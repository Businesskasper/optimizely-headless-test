import { isDevEnv } from "@/lib/dev-utils";
import type { ContentItem } from "@/lib/optimizely";
import { ImageBlockRenderer, isImageBlock } from "./ImageBlockRenderer";
import { isQuoteBlock, QuoteBlockRenderer } from "./QuoteBlockRenderer";
import { isTextBlock, TextBlockRenderer } from "./TextBlockRenderer";

export function RenderBlock({ block }: { block: ContentItem }) {
  if (isDevEnv()) console.log("block", block);

  if (isTextBlock(block)) {
    return <TextBlockRenderer block={block} />;
  }
  if (isQuoteBlock(block)) {
    return <QuoteBlockRenderer block={block} />;
  }
  if (isImageBlock(block)) {
    return <ImageBlockRenderer block={block} />;
  }

  return <div>Unknown block: {block.contentType?.join(", ")}</div>;
}
