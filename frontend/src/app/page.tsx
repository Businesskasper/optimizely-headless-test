import { RenderPage } from "@/components/RenderPage";
import { getStartPage } from "@/lib/optimizely";

export default async function Home() {
  const content = await getStartPage();

  return <RenderPage content={content} />;
}
