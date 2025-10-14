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

export default function QueryParamsSection() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-center">Query Params</h2>
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
  );
}
