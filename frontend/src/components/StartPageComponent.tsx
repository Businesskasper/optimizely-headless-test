import { Container, Stack, Title } from "@mantine/core";
import { arrayStartsWith } from "@/lib/object-utils";
import type {
  ContentArea,
  ContentHtmlString,
  ContentItem,
  ContentLongString,
} from "@/lib/optimizely";
import { ContentAreaRenderer } from "./ContentAreaRenderer";

export type StartPage = ContentItem & {
  heading: ContentLongString;
  mainBody: ContentHtmlString;
  mainContentArea: ContentArea;
};

export const isStartPage = (item: ContentItem): item is StartPage => {
  return arrayStartsWith(item.contentType, ["Page", "StartPage"]);
};

export function StartPageComponent({ content }: { content: StartPage }) {
  return (
    <Container size="md" py="xl">
      <Stack gap="md">
        <Title>{content.heading?.value}</Title>
        <div dangerouslySetInnerHTML={{ __html: content.mainBody?.value }} />
        <Title order={3}>Lernziele</Title>
        <Stack gap="md">
          <ContentAreaRenderer items={content.mainContentArea?.value} />
        </Stack>
      </Stack>
    </Container>
  );
}
