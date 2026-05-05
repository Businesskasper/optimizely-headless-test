import { Text } from "@mantine/core";
import { StartPageComponent } from "./StartPage";

export function RenderPage({ content }: any) {
  if (content.contentType?.includes("StartPage")) {
    return <StartPageComponent content={content} />;
  }

  return <Text c="dimmed">Unknown page type</Text>;
}
