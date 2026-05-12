import { Group } from "@mantine/core";
import { getContentById, getStartPage } from "@/lib/optimizely";
import {
  isNavigationBlock,
  NavigationBlockRenderer,
} from "./NavigationBlockRenderer";
import { isStartPage } from "./StartPageComponent";

export const NavBar = async () => {
  const startPage = await getStartPage();
  if (!isStartPage(startPage)) throw new Error("No start page found");

  if (!startPage.topNavigation?.value?.id) return null;

  const topNavigation = await getContentById(startPage.topNavigation.value.id);
  if (!isNavigationBlock(topNavigation))
    throw new Error(
      `ContentItem "${topNavigation.contentLink.id}" is not a valid NavigationBlock`,
    );

  return (
    <Group>
      <NavigationBlockRenderer block={topNavigation} />
    </Group>
  );
};
