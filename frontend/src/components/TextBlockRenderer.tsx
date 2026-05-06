import { Paper, Stack, Title } from "@mantine/core";
import { arrayStartsWith } from "@/lib/object-utils";
import type {
  ContentHtmlString,
  ContentItem,
  ContentLongString,
} from "@/lib/optimizely";

export type TextBlock = ContentItem & {
  heading: ContentLongString;
  text: ContentHtmlString;
};

export const isTextBlock = (item: ContentItem): item is TextBlock =>
  arrayStartsWith(item.contentType, ["Block", "TextBlock"]);

export function TextBlockRenderer({ block }: { block: TextBlock }) {
  return (
    <Paper p="md" withBorder>
      <Stack gap="sm">
        <Title order={2}>{block.heading.value}</Title>
        <div dangerouslySetInnerHTML={{ __html: block.text?.value }} />
      </Stack>
    </Paper>
  );
}
