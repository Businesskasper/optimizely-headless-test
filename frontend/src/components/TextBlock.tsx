import { Paper, Title, Stack } from "@mantine/core";

export function TextBlock({ block }: any) {
  return (
    <Paper p="md" withBorder>
      <Stack gap="sm">
        <Title order={2}>{block.heading.value}</Title>
        <div dangerouslySetInnerHTML={{ __html: block.text?.value }} />
      </Stack>
    </Paper>
  );
}
