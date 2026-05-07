import { notFound } from "next/navigation";
import { RenderPage } from "@/components/RenderPage";
import { getContentByUrl } from "@/lib/optimizely";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  // const cleaned = slug[0] === "en" ? slug.slice(1) : slug;
  const url = `/${slug.join("/")}`;

  if (slug.at(-1)?.includes(".")) notFound();

  const content = await getContentByUrl(url);

  if (!content) notFound();

  return <RenderPage content={content} />;
}
