import { Container, Title, Stack } from "@mantine/core";
import { ContentArea } from "./ContentArea";

export function StartPageComponent({ content }: any) {
  return (
    <Container size="md" py="xl">
      <Stack gap="md">
        <Title>{content.heading?.value}</Title>
        <div dangerouslySetInnerHTML={{ __html: content.mainBody?.value }} />
        <ContentArea items={content.mainContentArea?.value} />
      </Stack>
    </Container>
  );
}
