import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement | null>(null);

  function handleCopyClick() {
    const codeToCopy = codeRef.current?.textContent;
    if (!codeToCopy) return;

    window.navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopied(true);
    });
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  }, [copied]);

  return (
    <div className="flex items-center gap-1.5">
      <code
        ref={codeRef}
        className="bg-ctp-mantle border border-ctp-base h-8 flex items-center justify-center px-3 text-sm rounded-l-4xl rounded-r-2xl"
      >
        {children}
      </code>
      <button
        type="button"
        className="size-8 bg-ctp-mantle rounded-l-2xl rounded-r-4xl grid place-items-center border border-ctp-base p-1.5 hover:bg-ctp-base transition-colors"
        onClick={handleCopyClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="size-full"
        >
          <title>Copy</title>
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path
            d="m9 14 2 2 4-4"
            className={cn(
              "transition-opacity",
              copied ? "opacity-100" : "opacity-0",
            )}
          />
        </svg>
      </button>
    </div>
  );
}
