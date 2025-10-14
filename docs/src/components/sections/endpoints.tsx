import CodeBlock from "../code-block";

export default function EndpointsSection() {
  return (
    <section className="mt-20 flex flex-col">
      <h2 className="text-2xl font-bold text-center">Endpoints</h2>
      <p className="text-sm text-ctp-subtext0 text-center">
        API has one endpoint and two sub endpoints.
      </p>
      <div className="mt-5 self-center space-y-1.5">
        <CodeBlock>
          <span className="text-ctp-subtext0">https://</span>
          avatars.goquibble.online/1.x/avatar/svg
        </CodeBlock>
        <CodeBlock>
          <span className="text-ctp-subtext0">https://</span>
          avatars.goquibble.online/1.x/avatar/png
        </CodeBlock>
      </div>
    </section>
  );
}
