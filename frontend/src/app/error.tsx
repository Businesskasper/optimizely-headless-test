"use client";

import { Button, Container, Text, Title } from "@mantine/core";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container py="xl">
      <Title>Something went wrong</Title>
      <Text mt="sm" c="dimmed">
        {error.message}
      </Text>
      <Button mt="md" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}
