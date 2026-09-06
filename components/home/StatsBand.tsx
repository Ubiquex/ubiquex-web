// Every number here is verified against the real thing, not asserted.
//
//   8 providers          config/providers.json on the live provider site
//   13,000+              providers.ubiquex.io/search-index.json: 13,378
//                        entries, 5,033 resources + 8,345 data sources.
//                        Rounded DOWN, and labelled "resources and data
//                        sources" rather than "resources", because only
//                        5,033 are resources and calling the total
//                        "resources" would be wrong in two directions.
//   3 SDK languages      @ubx/sdk on npm, ubx-sdk on PyPI,
//                        ubx-sdk-go on the Go module proxy
//   0 state files        a stack's .ubx/ holds config, salt, lock,
//                        ledger.lock, plans, schemas, aliases.json.
//                        Current truth is folded from the ledger by
//                        FoldState, never stored.
//
// No cost figure anywhere on this page. ubx has a cost delta field and
// every code path writes literal 0, so any number here would be false.
const STATS = [
  { value: "8", label: "providers" },
  { value: "13,000+", label: "resources and data sources" },
  { value: "3", label: "SDK languages" },
  { value: "0", label: "state files" },
];

export function StatsBand() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-3xl font-medium text-brand-bright md:text-4xl">{s.value}</div>
          <div className="mt-1 text-sm text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
