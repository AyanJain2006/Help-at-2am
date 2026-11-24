
export default function Sidebar() {
  return (
    <aside className="flex flex-col border-r border-slate-200 bg-[#F5F8FA] p-5 text-slate-800 md:min-h-screen md:w-64 md:shrink-0">

      {/* Logo and Brand */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#527FA3] to-[#438F96] text-xl font-bold text-white shadow-sm">
          +
        </div>

        <div>
          <h1 className="font-bold tracking-tight text-slate-800">
            Campus Shield
          </h1>
          <p className="text-xs text-slate-500">
            Security Response
          </p>
        </div>
      </div>

      {/* Navigation */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Workspace
      </p>

      <nav className="space-y-2">

        {/* Active Menu */}
        <div className="flex items-center rounded-xl border border-blue-100 bg-[#EAF1FF] px-4 py-3 font-semibold text-[#416B9B]">
          <span className="mr-3 text-lg">▦</span>
          Overview
          <span className="ml-auto h-2 w-2 rounded-full bg-[#6B91C5]" />
        </div>

        {/* Emergency Requests */}
        <div className="flex items-center rounded-xl px-4 py-3 text-slate-600 transition hover:bg-[#EAF4F1] hover:text-[#438F80]">
          <span className="mr-3 text-lg">◉</span>
          Emergency Requests
        </div>

        {/* Response History */}
        <div className="flex items-center rounded-xl px-4 py-3 text-slate-600 transition hover:bg-[#EAF4F1] hover:text-[#438F80]">
          <span className="mr-3 text-lg">◷</span>
          Response History
        </div>

      </nav>

      {/* Demo Environment */}
      <div className="mt-auto pt-10">
        <div className="rounded-xl border border-[#DCEBE8] bg-gradient-to-br from-[#EAF5F5] to-[#EFF3FA] p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#5B9C91]" />
            <p className="text-sm font-semibold text-slate-800">
              Demo environment
            </p>
          </div>

          <p className="text-xs leading-5 text-slate-500">
            All requests are simulated. No real emergency
            services are connected.
          </p>
        </div>
      </div>

    </aside>
  );
}
