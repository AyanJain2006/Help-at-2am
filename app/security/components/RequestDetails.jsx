
"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

export default function RequestDetails({
  request,
  onStatusChange,
  onAddNote,
}) {
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  function clearMessage() {
    setMessage("");
  }

  function handleStatusChange(status) {
    if (!request) return;

    onStatusChange(request.id, status);
    setMessage("Request status updated successfully!");

    setTimeout(clearMessage, 3000);
  }

  function handleAddNote() {
    if (!request || !note.trim()) return;

    onAddNote(request.id, note.trim());
    setNote("");
    setMessage("Response note added successfully!");

    setTimeout(clearMessage, 3000);
  }

  if (!request) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <p className="text-gray-500">
          Select a request to view details.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        Request Details
      </h2>

      <div className="mt-4">
        <p className="font-semibold">{request.student}</p>
        <p className="text-sm text-gray-500">{request.id}</p>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <p>
          <strong>Emergency Type:</strong> {request.type}
        </p>

        <p>
          <strong>Location:</strong> {request.location}
        </p>

        <p>
          <strong>Time:</strong> {request.time}
        </p>

        <div>
          <strong>Priority:</strong>
          <div className="mt-2">
            <PriorityBadge priority={request.priority} />
          </div>
        </div>

        <p>
          <strong>Description:</strong> {request.description}
        </p>

        <div>
          <strong>Current Status:</strong>
          <div className="mt-2">
            <StatusBadge status={request.status} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold">
          Update Request Status
        </label>

        <select
          value={request.status}
          onChange={(event) =>
            handleStatusChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-200 p-3 text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="Acknowledged">Acknowledged</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h3 className="font-semibold">
          Security Response Notes
        </h3>

        <div className="mt-3 space-y-2">
          {request.notes.length === 0 ? (
            <p className="text-sm text-gray-500">
              No response notes yet.
            </p>
          ) : (
            request.notes.map((item, index) => (
              <div
                key={`${request.id}-${index}`}
                className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600"
              >
                {item}
              </div>
            ))
          )}
        </div>

        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Write a security response note..."
          rows={3}
          maxLength={300}
          aria-label="Security response note"
          className="mt-4 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
        />

        <button
          onClick={handleAddNote}
          disabled={!note.trim()}
          className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add Response Note
        </button>

        {message && (
          <p
            role="status"
            className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700"
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
