import { Text } from "@mantine/core";
import type { ContentItem } from "@/lib/optimizely";
import { BlogEntryPageComponent, isBlogEntryPage } from "./BlogEntryComponent";
import { BlogListPageComponent, isBlogListPage } from "./BlogListingComponent";
import { isStartPage, StartPageComponent } from "./StartPageComponent";

export function RenderPage({ content }: { content: ContentItem }) {
  if (isStartPage(content)) {
    return <StartPageComponent content={content} />;
  }
  if (isBlogListPage(content)) {
    return <BlogListPageComponent content={content} />;
  }
  if (isBlogEntryPage(content)) {
    return <BlogEntryPageComponent content={content} />;
  }

  return <Text c="dimmed">Unknown page type</Text>;
}
