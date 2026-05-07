import { Anchor, Stack, Title } from "@mantine/core";
import { arrayStartsWith } from "@/lib/object-utils";
import {
  type ContentHtmlString,
  type ContentItem,
  type ContentLongString,
  cleanContentUrl,
  getChildrenById,
} from "@/lib/optimizely";
import { isBlogEntryPage } from "./BlogEntryComponent";
import { ClientLink } from "./ClientLink";

export type BlogListPage = ContentItem & {
  heading: ContentLongString;
  intro: ContentHtmlString;
};

export const isBlogListPage = (item: ContentItem): item is BlogListPage =>
  arrayStartsWith(item.contentType, ["Page", "BlogListingPage"]);

export async function BlogListPageComponent({
  content,
}: {
  content: BlogListPage;
}) {
  const children = await getChildrenById(content.contentLink.id);
  const blogEntries = children.filter(isBlogEntryPage);

  return (
    <Stack gap="md">
      <Title>{content.heading?.value}</Title>
      <div dangerouslySetInnerHTML={{ __html: content.intro?.value ?? "" }} />
      <Stack gap="md">
        {blogEntries
          .sort((a, b) => b.publishedDate.value.localeCompare(a.publishedDate.value))
          .map((blogEntry) => (
            <Anchor
              key={blogEntry.contentLink.id}
              component={ClientLink}
              href={cleanContentUrl(blogEntry.contentLink.url)}
              mt="md"
              display="block"
            >
              {blogEntry.title.value}
            </Anchor>
          ))}
      </Stack>
    </Stack>
  );
}
