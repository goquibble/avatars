import Footer from "./components/footer";
import EndpointsSection from "./components/sections/endpoints";
import PlaygroundSection from "./components/sections/playground";
import QueryParamsSection from "./components/sections/query-params";
import { AVATARS_API_BASE_URL } from "./constants";
import { cn } from "./lib/utils";

export default function App() {
  return (
    <main className="sm:max-w-2xl sm:mx-auto p-5 sm:p-10 flex flex-col">
      <div className="blur-xl absolute -top-5 left-1/2 -translate-x-1/2 size-50 -z-1 bg-gradient-to-b from-ctp-base to-transparent"></div>
      <span className="inline-flex items-center gap-2 self-center mb-2 text-xs/none sm:text-sm/none border border-ctp-surface0 rounded-full py-1.5 px-2 bg-ctp-base">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ctp-mauve opacity-75"></span>{" "}
          <span className="relative inline-flex size-2 rounded-full bg-ctp-mauve"></span>
        </span>
        New avatar dropped!
      </span>
      <h1 className="text-5xl sm:text-6xl font-black text-center">
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
            src={`${AVATARS_API_BASE_URL}/svg?seed=${idx}`}
            alt={`avatar-${idx}`}
            className={cn(
              "select-none pointer-events-none",
              idx === 2
                ? "size-25 sm:size-30"
                : idx % 2 !== 0
                  ? "size-20 sm:size-25"
                  : "size-20 hidden sm:block",
            )}
          />
        ))}
      </div>
      <EndpointsSection />
      <QueryParamsSection />
      <PlaygroundSection />
      <Footer />
    </main>
  );
}
