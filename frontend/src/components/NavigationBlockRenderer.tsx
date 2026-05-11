import { Anchor } from "@mantine/core";
import { arrayStartsWith } from "@/lib/object-utils";
import {
  type ContentArea,
  type ContentItem,
  type ContentLongString,
  type ContentUrl,
  cleanContentUrl,
  getContentById,
} from "@/lib/optimizely";
import { ClientLink } from "./ClientLink";

export type NavigationBlock = ContentItem & {
  navigationItems: ContentArea;
};

export const isNavigationBlock = (item: ContentItem): item is NavigationBlock =>
  arrayStartsWith(item.contentType, ["Block", "Navigation"]);

export type NavigationItem = ContentItem & {
  label: ContentLongString;
  link: ContentUrl;
};

export const isNavigationItem = (item: ContentItem): item is NavigationItem =>
  arrayStartsWith(item.contentType, ["Block", "NavigationItem"]);

export async function NavigationBlockRenderer({
  block,
}: {
  block: NavigationBlock;
}) {
  const navItemIds = block.navigationItems.value.map(
    (navItemValue) => navItemValue.contentLink.id,
  );
  const navItemPromises = navItemIds.map((navItemId) =>
    getContentById(navItemId),
  );
  const navItems = await Promise.all(navItemPromises);

  return (
    <>
      {navItems.filter(isNavigationItem).map((navItem) => (
        <Anchor
          component={ClientLink}
          key={navItem.contentLink.id}
          href={cleanContentUrl(navItem.link.value)}
        >
          {navItem.label.value}
        </Anchor>
      ))}
    </>
  );
}
