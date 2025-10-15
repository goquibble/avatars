import { queryParams } from "../../_data";

export default function QueryParamsSection() {
  return (
    <section className="mt-10 flex flex-col">
      <h2 className="text-xl font-bold text-center">Query Params</h2>
      <p className="text-sm text-ctp-subtext0 text-center">
        These endpoints accept some query parameters.
      </p>
      <div className="mt-5 text-sm">
        <div className="flex bg-ctp-mantle rounded-md border border-ctp-base font-semibold text-ctp-subtext0">
          <div className="p-1 pl-2 w-1/5 rounded-tl-md">Param</div>
          <div className="p-1 w-2/5">Default</div>
          <div className="p-1 w-2/5 rounded-tr-md">Description</div>
        </div>
        <div className="mt-2 space-y-1 border border-ctp-base rounded-md">
          {queryParams.map((query, idx) => (
            <div key={idx.toString()} className="flex">
              <div className="p-1 pl-2 w-1/5">
                <code className="font-medium">{query.param}</code>
              </div>
              <div className="p-1 w-2/5">
                <code className="text-ctp-subtext0">{query.default}</code>
              </div>
              <div className="p-1 w-2/5 text-ctp-subtext0">
                {query.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
