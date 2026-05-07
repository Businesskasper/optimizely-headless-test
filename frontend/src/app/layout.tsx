import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { Container, Divider } from "@mantine/core";
import { NavBar } from "@/components/NavBar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Optimizely Headless",
  description: "Optimizely CMS 12 headless frontend",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Container size="md" py="xl">
            <NavBar />
            <Divider mb="lg" />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
