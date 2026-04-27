import { getContentByUrl } from "@/lib/optimizely";
import { RenderPage } from "@/components/RenderPage";

export default async function Page({ params }: any) {
  const url = `/${params.slug.join("/")}`;

  const content = await getContentByUrl(url);

  if (!content) {
    return <h1>404 Not Found</h1>;
  }

  return <RenderPage content={content} />;
}