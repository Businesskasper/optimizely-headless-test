import { Group } from "@mantine/core";
import Link from "next/link";
import {
  cleanContentUrl,
  getChildrenById,
  getStartPage,
} from "@/lib/optimizely";

export const NavBar = async () => {
  const startPage = await getStartPage();
  const children = await getChildrenById(startPage.contentLink.id);

  return (
    <Group>
      <Link href="/">Home</Link>
      {children.map((child) => (
        <Link key={child.contentLink.id} href={cleanContentUrl(child.url)}>
          {child.name}
        </Link>
      ))}
    </Group>
  );
};
