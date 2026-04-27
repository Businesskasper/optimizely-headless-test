import { TextBlock } from "./TextBlock";

export function RenderBlock({ block }: any) {
  if (block.contentType?.includes("TextBlock")) {
    return <TextBlock block={block} />;
  }

  return (
    <div>
      Unknown block: {block.contentType?.join(", ")}
    </div>
  );
}