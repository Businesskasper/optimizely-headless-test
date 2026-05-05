import { ClientLink } from "@/components/ClientLink";
import { Container, Title, Text, Anchor } from "@mantine/core";

export default function NotFound() {
  return (
    <Container py="xl">
      <Title>Page not found</Title>
      <Text mt="sm">This page does not exist in the CMS.</Text>
      <Anchor component={ClientLink} href="/" mt="md" display="block">
        Back to home
      </Anchor>
    </Container>
  );
}
