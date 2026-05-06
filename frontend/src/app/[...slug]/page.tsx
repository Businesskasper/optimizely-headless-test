import { notFound } from "next/navigation";
import { RenderPage } from "@/components/RenderPage";
import { getContentByUrl } from "@/lib/optimizely";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const url = `/${slug.join("/")}`;

  const content = await getContentByUrl(url);

  if (!content) notFound();

  return <RenderPage content={content} />;
}
