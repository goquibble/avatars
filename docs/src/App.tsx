import CodeBlock from "./components/code-block";
import { cn } from "./lib/utils";

const queryParams = [
  {
    param: "seed",
    default: `"guest"`,
    description: "For consistent seed.",
  },
  {
    param: "color",
    default: "None",
    description: "Color of the body. (based on seed)",
  },
  {
    param: "expression",
    default: "None",
    description: "Expression for the avatar. (based on seed)",
  },
];

export default function App() {
  return (
    <main className="max-w-2xl mx-auto p-10 flex flex-col">
      <div className="blur-xl absolute -top-5 left-1/2 -translate-x-1/2 size-50 -z-1 bg-gradient-to-b from-ctp-base to-transparent"></div>
      <span className="inline-flex items-center gap-2 self-center mb-2 text-sm/none border border-ctp-surface0 rounded-full py-1.5 px-2 bg-ctp-base">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ctp-mauve opacity-75"></span>{" "}
          <span className="relative inline-flex size-2 rounded-full bg-ctp-mauve"></span>
        </span>
        New avatar dropped!
      </span>
      <h1 className="text-6xl font-black text-center">
        <span className="text-ctp-mauve">avatars</span> <br />
        <span className="text-ctp-subtext0">by </span>
        <span className="text-ctp-red">Quibble</span>
      </h1>
      <p className="text-sm text-ctp-subtext0 text-center mt-4">
        API for generating customizable SVG avatars with consistent seeds.
      </p>
      <div className="flex items-center gap-2 self-center mt-10">
        {Array.from({ length: 5 }).map((_, idx) => (
          <img
            key={idx.toString()}
            src={`http://localhost:8000/1.x/avatar/svg?seed=${idx}`}
            alt={`avatar-${idx}`}
            className={cn(
              "select-none pointer-events-none",
              idx === 2 ? "size-30" : idx % 2 !== 0 ? "size-25" : "size-20",
            )}
          />
        ))}
      </div>
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
        <h2 className="text-xl font-bold text-center mt-10">Query Params</h2>
        <p className="text-sm text-ctp-subtext0 text-center">
          These endpoints accepts some query parameters.
        </p>
        <div className="mt-5 text-sm space-y-1">
          <div className="flex bg-ctp-mantle rounded-md border border-ctp-base font-semibold text-ctp-subtext0">
            <div className="p-1 pl-2 w-1/4 rounded-tl-md">Param</div>
            <div className="p-1 w-1/4">Default</div>
            <div className="p-1 w-2/4 rounded-tr-md">Description</div>
          </div>
          {queryParams.map((query, idx) => (
            <div key={idx.toString()} className="flex">
              <div className="p-1 pl-2 w-1/4">
                <code>{query.param}</code>
              </div>
              <div className="p-1 w-1/4">
                <code className="text-ctp-subtext0">{query.default}</code>
              </div>
              <div className="p-1 w-2/4 text-ctp-subtext0">
                {query.description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
