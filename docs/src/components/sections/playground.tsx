import { expressions } from "../../_data";
import CodeBlock from "../code-block";

export default function PlaygroundSection() {
  return (
    <section className="mt-20 flex flex-col">
      <h2 className="text-2xl font-bold text-center">Playground</h2>
      <p className="text-sm text-ctp-subtext0 text-center">
        Let's customize it even furthur!
      </p>
      <div className="w-full border border-ctp-base rounded-lg flex mt-5">
        <div className="flex flex-col justify-between p-2 w-1/2">
          <span className="text-sm text-ctp-overlay0 font-medium">
            Preview:
          </span>
          <img
            src="http://localhost:8000/1.x/avatar/svg"
            alt=""
            className="size-2/3 m-auto"
          />
        </div>
        <div className="w-1/2 border-l border-ctp-base flex flex-col gap-2 p-2">
          <div className="text-sm bg-ctp-mantle p-2 flex ring ring-ctp-base rounded-md focus-within:bg-ctp-base transition-colors">
            <span className="text-ctp-subtext0 whitespace-nowrap">?seed=</span>
            <input placeholder="guest" className="outline-none w-full" />
          </div>
          <span className="text-sm text-ctp-overlay1 font-medium">
            Expression:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {expressions.map((expression) => (
              <button
                key={expression}
                type="button"
                className="text-sm text-ctp-subtext0 bg-ctp-mantle border border-ctp-base rounded-md py-1 hover:bg-ctp-base transition-colors"
              >
                {expression}
              </button>
            ))}
            <div className="col-span-2 text-sm text-ctp-overlay0 self-center justify-self-center">
              More coming soon!
            </div>
          </div>
        </div>
      </div>
      <CodeBlock className="self-center mt-2">
        <span className="text-ctp-subtext0">https://</span>
        avatars.goquibble.online/1.x/avatar/png
      </CodeBlock>
    </section>
  );
}
