import { Anchor, Group } from "@mantine/core";
import {
  cleanContentUrl,
  getChildrenById,
  getStartPage,
} from "@/lib/optimizely";
import { ClientLink } from "./ClientLink";

export const NavBar = async () => {
  const startPage = await getStartPage();
  const children = await getChildrenById(startPage.contentLink.id);

  return (
    <Group>
      <Anchor component={ClientLink} href="/">
        Home
      </Anchor>
      {children.map((child) => (
        <Anchor
          component={ClientLink}
          key={child.contentLink.id}
          href={cleanContentUrl(child.url)}
        >
          {child.name}
        </Anchor>
      ))}
    </Group>
  );
};
