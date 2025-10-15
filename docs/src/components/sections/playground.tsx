import { useCallback, useEffect, useState } from "react";
import { expressions } from "../../_data";
import { AVATARS_API_BASE_URL } from "../../constants";
import debounce from "../../lib/debounce";
import { cn } from "../../lib/utils";
import CodeBlock from "../code-block";

export default function PlaygroundSection() {
  const [url, setUrl] = useState(new URL(`${AVATARS_API_BASE_URL}/svg`));
  const [selectedExpression, setSelectedExpression] = useState("");

  const debouncedUrlChange = useCallback(
    debounce((key: string, value: string) => {
      setUrl((prev) => {
        const newUrl = new URL(prev);
        if (!value.trim()) {
          newUrl.searchParams.delete(key);
        } else {
          newUrl.searchParams.set(key, value);
        }
        return newUrl;
      });
    }, 500),
    [],
  );

  function handleSeedChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    debouncedUrlChange("seed", value);
  }

  function handleExpressionChange(expression: string) {
    if (selectedExpression === expression) setSelectedExpression("");
    else setSelectedExpression(expression);
  }

  useEffect(() => {
    debouncedUrlChange("expression", selectedExpression);
  }, [selectedExpression, debouncedUrlChange]);

  return (
    <section className="mt-20 flex flex-col">
      <h2 className="text-2xl font-bold text-center">Playground</h2>
      <p className="text-sm text-ctp-subtext0 text-center">
        Try it out and see what works!
      </p>
      <div className="w-full flex flex-col sm:flex-row mt-5 gap-2">
        <div className="flex flex-col justify-between p-2 sm:w-1/2 border border-ctp-base rounded-xl bg-ctp-mantle">
          <img
            src={url.toString()}
            alt=""
            className="size-25 sm:size-2/3 m-auto"
          />
        </div>
        <div className="sm:w-1/2 border border-ctp-base rounded-xl flex flex-col gap-2 p-2">
          <div className="text-sm bg-ctp-mantle p-2 flex ring ring-ctp-base rounded-md focus-within:bg-ctp-base transition-colors">
            <span className="text-ctp-subtext0 whitespace-nowrap">?seed=</span>
            <input
              placeholder="guest"
              className="outline-none w-full"
              onChange={handleSeedChange}
            />
          </div>
          <span className="text-sm text-ctp-overlay1 font-medium">
            Expression:
          </span>
          <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
            {expressions.map((expression) => (
              <button
                key={expression}
                type="button"
                className={cn(
                  "text-sm text-ctp-subtext0 bg-ctp-mantle border border-ctp-base rounded-md py-1.5 hover:bg-ctp-base transition-colors",
                  selectedExpression === expression &&
                    "bg-ctp-base border-ctp-surface0 text-ctp-text",
                )}
                onClick={() => handleExpressionChange(expression)}
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
      <CodeBlock className="sm:self-center mt-2">
        <span className="text-ctp-subtext0">{`${url.protocol}//`}</span>
        {url.href.replace(`${url.protocol}//`, "")}
      </CodeBlock>
    </section>
  );
}
