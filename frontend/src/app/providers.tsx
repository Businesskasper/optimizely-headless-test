"use client";

import { MantineProvider } from "@mantine/core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={{ fontFamily: "var(--font-roboto), sans-serif" }}>
      {children}
    </MantineProvider>
  );
}
