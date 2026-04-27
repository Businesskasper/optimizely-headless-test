import { StartPageComponent } from "./StartPage";

export function RenderPage({ content }: any) {
  if (content.contentType?.includes("StartPage")) {
    return <StartPageComponent content={content} />;
  }

  return <div>Unknown page type</div>;
}