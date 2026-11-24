
"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmergency } from "../context/EmergencyContext";

const campusLocations = {};

function addHostels(gender) {
  for (let i = 1; i <= 7; i++) {
    for (const block of ["A", "B", "C"]) {
      const name = `${gender} Hostel ${i} - Block ${block}`;
      campusLocations[name] = Array.from(
        { length: 10 },
        (_, index) => `Floor ${index + 1}`
      );
    }
  }

  for (let i = 10; i <= 12; i++) {
    for (const block of ["A", "B", "C"]) {
      const name = `${gender} Studio ${i} - Block ${block}`;
      campusLocations[name] = Array.from(
        { length: 10 },
        (_, index) => `Floor ${index + 1}`
      );
    }
  }
}

addHostels("Boys");
addHostels("Girls");

for (let i = 1; i <= 57; i++) {
  campusLocations[`Academic Block ${i}`] = Array.from(
    { length: 7 },
    (_, index) => `Floor ${index + 1}`
  );
}

[
  "Auditorium",
  "Indoor Sports",
  "Unipolis",
  "Uni Mall",
  "Robo Park",
  "BH-5 Ground",
  "Amphitheatre",
].forEach((place) => {
  campusLocations[place] = ["Landmark"];
});

const buildingNames = Object.keys(campusLocations).sort((a, b) => {
  const group = (name) => {
    if (name.startsWith("Boys")) return 1;
    if (name.startsWith("Girls")) return 2;
    if (name.startsWith("Academic")) return 3;
    return 4;
  };

  return group(a) - group(b) || a.localeCompare(b);
});

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700";

export default function StudentPage() {
  const { addRequest } = useEmergency();

  const [student, setStudent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [category, setCategory] = useState("Medical");
  const [description, setDescription] = useState("");

  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const availableFloors = building
    ? campusLocations[building] || []
    : [];

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    if (!building || !floor || !area.trim()) {
      alert("Please complete your campus location.");
      return;
    }

    const id = `REQ-${Date.now().toString().slice(-8)}`;

    const priority =
      category === "Medical" ||
      category === "Security" ||
      category === "Fire"
        ? "High"
        : "Medium";

    setSubmitting(true);

    try {
      await addRequest({
        id,
        student: student.trim(),
        type: category,
        location: `${building} · ${floor} · ${area.trim()}`,
        time: new Date().toLocaleString(),
        priority,
        status: "Pending",
        description: `Student ID: ${studentId.trim()}\n\n${description.trim()}`,
        notes: [],
      });

      setRequestId(id);
      setSubmitted(true);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to submit your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Request Submitted!
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your simulated emergency request has been recorded.
          </p>

          <div className="my-5 rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Your Request ID</p>
            <p className="mt-1 text-xl font-bold text-blue-600">
              {requestId}
            </p>
          </div>

          <p className="mb-5 text-xs leading-5 text-slate-500">
            This is an academic simulation. It does not dispatch
            real emergency assistance.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/security"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Security Dashboard
            </Link>

            <button
              onClick={() => {
                setSubmitted(false);
                setStudent("");
                setStudentId("");
                setDescription("");
                setBuilding("");
                setFloor("");
                setArea("");
                setCategory("Medical");
              }}
              className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Campus Safety System
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Help at 2 A.M.
            </h1>

            <p className="mt-1 text-base text-slate-600">
              Campus Emergency Assistance Portal
            </p>
          </div>

          <Link
            href="/security"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Security Dashboard →
          </Link>
        </header>

        {/* Request Form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Request Emergency Assistance
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill in the details and communicate your campus location.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Details */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Full Name</label>

                <input
                  required
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Student ID</label>

                <input
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your student ID"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Emergency Category */}
            <div>
              <label className={labelClass}>
                Emergency Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                <option value="Medical">Medical Emergency</option>
                <option value="Security">Security Issue</option>
                <option value="Fire">Fire Emergency</option>
                <option value="General Help">General Help</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>
                Describe Your Situation
              </label>

              <textarea
                required
                maxLength={500}
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what happened and what kind of assistance you need..."
                className={`${inputClass} resize-y`}
              />

              <p className="mt-1 text-right text-xs text-slate-400">
                {description.length}/500
              </p>
            </div>

            {/* Campus Location */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-0.5 text-lg text-blue-600">
                  ⌖
                </span>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Campus Location
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Select your building and floor so the response
                    team can identify your location.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClass}>
                    Building / Location
                  </label>

                  <select
                    required
                    value={building}
                    onChange={(e) => {
                      setBuilding(e.target.value);
                      setFloor("");
                      setArea("");
                    }}
                    className={inputClass}
                  >
                    <option value="">
                      Select Building / Location
                    </option>

                    {buildingNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Floor</label>

                  <select
                    required
                    disabled={!building}
                    value={floor}
                    onChange={(e) => {
                      setFloor(e.target.value);
                      setArea("");
                    }}
                    className={inputClass}
                  >
                    <option value="">Select Floor</option>

                    {availableFloors.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Room / Specific Area
                  </label>

                  <input
                    required
                    disabled={!floor}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Room 204, near entrance..."
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {submitting ? "Submitting..." : "Submit Emergency Request"}
            </button>

            <p className="text-center text-xs leading-5 text-slate-400">
              Academic simulation only. This form does not contact
              real emergency services or guarantee a response.
            </p>
          </form>
        </section>

        <footer className="py-5 text-center text-xs text-slate-400">
          Help at 2 A.M. · Campus Emergency Assistance System
        </footer>
      </div>
    </main>
  );
}
