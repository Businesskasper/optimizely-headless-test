export function TextBlock({ block }: any) {

  return (
    <section>
      <h2>{block.heading.value}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: block.text?.value }}
      />
    </section>
  );
}