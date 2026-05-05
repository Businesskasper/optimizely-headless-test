import { getStartPage } from "@/lib/optimizely";
import { RenderPage } from "@/components/RenderPage";

export default async function Home() {
  const content = await getStartPage();
  
  return <RenderPage content={content} />;
}