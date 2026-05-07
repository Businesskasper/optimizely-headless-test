import { Stack, Title } from "@mantine/core";
import { arrayStartsWith } from "@/lib/object-utils";
import type {
  ContentDate,
  ContentHtmlString,
  ContentItem,
  ContentLongString,
} from "@/lib/optimizely";

export type BlogEntryPage = ContentItem & {
  title: ContentLongString;
  publishedDate: ContentDate;
  author: ContentLongString;
  body: ContentHtmlString;
};

export const isBlogEntryPage = (item: ContentItem): item is BlogEntryPage =>
  arrayStartsWith(item.contentType, ["Page", "ArticlePage"]);

export async function BlogEntryPageComponent({
  content,
}: {
  content: BlogEntryPage;
}) {
  return (
    <Stack gap="md">
      <Title>{content.title.value}</Title>
    </Stack>
  );
}
