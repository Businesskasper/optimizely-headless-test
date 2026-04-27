import { ContentArea } from "./ContentArea";

export function StartPageComponent({ content }: any) {
  return (
    <main>
      <h1>{content.heading?.value}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: content.mainBody?.value,
        }}
      />

      <ContentArea items={content.mainContentArea?.value} />
    </main>
  );
}