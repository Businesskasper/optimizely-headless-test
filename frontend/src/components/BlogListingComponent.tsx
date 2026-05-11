import { Stack, Title } from "@mantine/core";
import { arrayStartsWith } from "@/lib/object-utils";
import {
  type ContentHtmlString,
  type ContentItem,
  type ContentLongString,
  type ContentReference,
  getContentById,
} from "@/lib/optimizely";
import {
  isNavigationBlock,
  NavigationBlockRenderer,
} from "./NavigationBlockRenderer";

export type BlogListPage = ContentItem & {
  heading: ContentLongString;
  intro: ContentHtmlString;
  entryNavigation: ContentReference;
};

export const isBlogListPage = (item: ContentItem): item is BlogListPage =>
  arrayStartsWith(item.contentType, ["Page", "BlogListingPage"]);

export async function BlogListPageComponent({
  content,
}: {
  content: BlogListPage;
}) {
  return (
    <Stack gap="md">
      <Title>{content.heading?.value}</Title>
      <div dangerouslySetInnerHTML={{ __html: content.intro?.value ?? "" }} />
      <BlogListingPageNavigation
        entryNavigationId={content.entryNavigation?.value?.id || null}
      />
    </Stack>
  );
}

async function BlogListingPageNavigation({
  entryNavigationId,
}: {
  entryNavigationId: number | null;
}) {
  if (!entryNavigationId) return null;

  const entryNavigation = await getContentById(entryNavigationId);
  if (!isNavigationBlock(entryNavigation))
    throw new Error(
      `ContentItem "${entryNavigation.contentLink.id}" is not a valid NavigationBlock`,
    );
  return (
    <Stack gap="md">
      <NavigationBlockRenderer block={entryNavigation} />
    </Stack>
  );
}
