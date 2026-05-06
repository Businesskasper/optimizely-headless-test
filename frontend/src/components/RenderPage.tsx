import { Text } from "@mantine/core";
import type { ContentItem } from "@/lib/optimizely";
import { isStartPage, StartPageComponent } from "./StartPageComponent";

export function RenderPage({ content }: { content: ContentItem }) {
  if (isStartPage(content)) {
    return <StartPageComponent content={content} />;
  }

  return <Text c="dimmed">Unknown page type</Text>;
}
