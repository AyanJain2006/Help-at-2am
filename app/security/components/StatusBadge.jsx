
const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Acknowledged: "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-violet-50 text-violet-700 border-violet-200",
  Resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] || statusStyles.Pending
      }`}
    >
      {status}
    </span>
  );
}
