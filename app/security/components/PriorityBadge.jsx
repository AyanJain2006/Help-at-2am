
const priorityStyles = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-green-100 text-green-700 border-green-200",
};

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
    >
      {priority} Priority
    </span>
  );
}
