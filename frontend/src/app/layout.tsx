import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import { Container, Divider } from "@mantine/core";
import { NavBar } from "@/components/NavBar";
import { Providers } from "./providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Optimizely Headless",
  description: "Optimizely CMS 12 headless frontend",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers>
          <Container strategy="grid">
            <NavBar />
            <Divider data-breakout mb="lg" />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
