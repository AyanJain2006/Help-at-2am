
import type { EmergencyRequest } from "../types";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

type RequestListProps = {
  requests: EmergencyRequest[];
  selectedId: string;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
};

export default function RequestList({
  requests,
  selectedId,
  onSelect,
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: RequestListProps) {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <h3 className="text-lg font-bold">Incoming requests</h3>

        <p className="mt-1 text-sm text-slate-500">
          Select a request to view its details.
        </p>

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search student, ID or location..."
          aria-label="Search requests"
          className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <select
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
          aria-label="Filter by status"
          className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
        >
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Acknowledged">Acknowledged</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="divide-y divide-slate-100">
        {requests.map((request) => (
          <button
            key={request.id}
            onClick={() => onSelect(request.id)}
            className={`w-full p-5 text-left transition hover:bg-slate-50 ${
              selectedId === request.id ? "bg-blue-50/70" : ""
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{request.student}</p>

                <p className="mt-1 text-xs text-slate-500">
                  {request.id} · {request.time}
                </p>
              </div>

              <StatusBadge status={request.status} />
            </div>

            <p className="mt-3 text-sm font-medium">
              {request.type}
            </p>

            <div className="mt-2">
              <PriorityBadge priority={request.priority} />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              📍 {request.location}
            </p>
          </button>
        ))}

        {requests.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-500">
            No matching requests found.
          </p>
        )}
      </div>
    </section>
  );
}
