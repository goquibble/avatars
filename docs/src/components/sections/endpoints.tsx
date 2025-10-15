import { AVATARS_API_BASE_URL } from "../../constants";
import CodeBlock from "../code-block";

export default function EndpointsSection() {
  const url = new URL(AVATARS_API_BASE_URL);

  return (
    <section className="mt-20 flex flex-col">
      <h2 className="text-2xl font-bold text-center">Endpoints</h2>
      <p className="text-sm text-ctp-subtext0 text-center">
        API has one endpoint and two sub endpoints.
      </p>
      <div className="mt-5 self-center space-y-1.5">
        <CodeBlock>
          <span className="text-ctp-subtext0">{`${url.protocol}//`}</span>
          {`${url.href.replace(`${url.protocol}//`, "")}/svg`}
        </CodeBlock>
        <CodeBlock>
          <span className="text-ctp-subtext0">{`${url.protocol}//`}</span>
          {`${url.href.replace(`${url.protocol}//`, "")}/svg`}
        </CodeBlock>
      </div>
    </section>
  );
}
