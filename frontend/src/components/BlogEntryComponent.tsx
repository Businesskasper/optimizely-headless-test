import { Stack, Text, Title } from "@mantine/core";
import { arrayStartsWith } from "@/lib/object-utils";
import type {
  ContentArea,
  ContentDate,
  ContentHtmlString,
  ContentItem,
  ContentLongString,
} from "@/lib/optimizely";
import { ContentAreaRenderer } from "./ContentAreaRenderer";

export type BlogEntryPage = ContentItem & {
  title: ContentLongString;
  publishedDate: ContentDate;
  author: ContentLongString;
  body: ContentHtmlString;
  mainContentArea: ContentArea;
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
      <div dangerouslySetInnerHTML={{ __html: content.body.value }} />
      <ContentAreaRenderer items={content.mainContentArea?.value} />
    </Stack>
  );
}
