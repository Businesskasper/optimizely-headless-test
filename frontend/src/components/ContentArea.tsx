import { getContentById } from "@/lib/optimizely";
import { RenderBlock } from "./RenderBlock";

export async function ContentArea({ items }: any) {
    if (!items || items.length === 0) return null;

    const resolved = await Promise.all(
        items.map(async (item: any) => {
            return getContentById(item.contentLink.id);
        })
    );

    return (
        <>
            {resolved.map((block, i) => (
                <RenderBlock key={i} block={block} />
            ))}
        </>
    );
}