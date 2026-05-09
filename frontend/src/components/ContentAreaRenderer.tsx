import { type ContentAreaValue, getContentById } from "@/lib/optimizely";
import { RenderBlock } from "./RenderBlock";

export async function ContentAreaRenderer({
  items,
}: {
  items: Array<ContentAreaValue>;
}) {
  if (!items || items.length === 0) return null;

  const resolved = await Promise.all(
    items.map((item) => getContentById(item.contentLink.id, true)),
  );

  return (
    <>
      {resolved.map((block) => (
        <RenderBlock key={block.contentLink.id} block={block} />
      ))}
    </>
  );
}
