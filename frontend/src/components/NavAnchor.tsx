"use client";

import { Anchor } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export function NavAnchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = normalize(pathname) === normalize(href);

  return (
    <Anchor
      component={Link}
      href={href}
      fw={active ? "bold" : undefined}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Anchor>
  );
}
