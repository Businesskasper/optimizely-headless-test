import { Blockquote } from "@mantine/core";
import { IconQuote } from "@tabler/icons-react";
import { arrayStartsWith } from "@/lib/object-utils";
import type { ContentItem, ContentLongString } from "@/lib/optimizely";

export type QuoteBlock = ContentItem & {
  quoteText: ContentLongString;
  attribution: ContentLongString;
};

export const isQuoteBlock = (item: ContentItem): item is QuoteBlock =>
  arrayStartsWith(item.contentType, ["Block", "QuoteBlock"]);

export function QuoteBlockRenderer({ block }: { block: QuoteBlock }) {
  return (
    <Blockquote
      color="blue"
      iconSize={38}
      cite={block.attribution?.value ?? ""}
      icon={<IconQuote />}
    >
      {block.quoteText?.value ?? ""}
    </Blockquote>
  );
}
