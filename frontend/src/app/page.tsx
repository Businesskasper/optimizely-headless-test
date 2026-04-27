import { getStartPage } from "@/lib/optimizely";
import { RenderPage } from "@/components/RenderPage";

export default async function Home() {
  const content = await getStartPage();
console.log('content', content)
  return <RenderPage content={content} />;
}