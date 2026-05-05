import { Container, Title } from "@mantine/core";
import { getContentByUrl } from "@/lib/optimizely";
import { RenderPage } from "@/components/RenderPage";

export default async function Page({ params }: any) {
  const { slug } = await params;
  const url = `/${slug.join("/")}`;

  const content = await getContentByUrl(url);

  if (!content) {
    return (
      <Container py="xl">
        <Title>404 Not Found</Title>
      </Container>
    );
  }

  return <RenderPage content={content} />;
}
