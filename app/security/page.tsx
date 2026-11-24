
"use client";

import { useEffect, useRef, useState } from "react";

import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import RequestList from "./components/RequestList";
import RequestDetails from "./components/RequestDetails";

import { useEmergency } from "../context/EmergencyContext";
import type { Status } from "./types";

type ToastNotification = {
  eventId: string;
  student: string;
  type: string;
  location: string;
  priority: string;
  requestId: string;
};

export default function SecurityPage() {
  const {
    requests,
    updateRequest,
    loading,
    notificationEvents,
  } = useEmergency();

  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission | "unsupported">("default");

  const audioContextRef = useRef<AudioContext | null>(null);
  const processedEvents = useRef(new Set<string>());

  const selected =
    requests.find((request) => request.id === selectedId) ??
    requests[0];

  // Check browser notification permission
  useEffect(() => {
    if (!("Notification" in window)) {
      setNotificationPermission("unsupported");
      return;
    }

    setNotificationPermission(Notification.permission);
  }, []);

  // Enable sound and desktop notifications
  async function enableNotifications() {
    try {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
      }

      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (AudioContextClass) {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContextClass();
        }

        if (audioContextRef.current.state === "suspended") {
          await audioContextRef.current.resume();
        }
      }

      alert("Notification settings updated.");
    } catch (error) {
      console.error("Unable to enable notifications:", error);
      alert("Unable to enable notifications in this browser.");
    }
  }

  // Play a short notification sound
  function playNotificationSound() {
    try {
      const audioContext = audioContextRef.current;

      if (!audioContext || audioContext.state !== "running") {
        return;
      }

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        880,
        audioContext.currentTime
      );

      gain.gain.setValueAtTime(0.001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.15,
        audioContext.currentTime + 0.03
      );
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.35
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.36);
    } catch (error) {
      console.error("Notification sound error:", error);
    }
  }

  // Listen for new real-time notification events
  useEffect(() => {
    notificationEvents.forEach((event) => {
      if (processedEvents.current.has(event.eventId)) {
        return;
      }

      processedEvents.current.add(event.eventId);

      const request = event.request;

      const toast: ToastNotification = {
        eventId: event.eventId,
        student: request.student,
        type: request.type,
        location: request.location,
        priority: request.priority,
        requestId: request.id,
      };

      setToasts((previous) => [toast, ...previous]);
      setUnreadCount((previous) => previous + 1);

      playNotificationSound();

      // Show desktop notification when permission is granted
      if (
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        const desktopNotification = new Notification(
          "New Emergency Request!",
          {
            body: `${request.student} submitted a ${request.type} request.\nLocation: ${request.location}`,
            tag: request.id,
          }
        );

        desktopNotification.onclick = () => {
          window.focus();
          setSelectedId(request.id);
          desktopNotification.close();
        };
      }
    });
  }, [notificationEvents]);

  // Close toast notification
  function dismissToast(eventId: string) {
    setToasts((previous) =>
      previous.filter((toast) => toast.eventId !== eventId)
    );
  }

  // Select a request from notification
  function openRequest(requestId: string) {
    setSelectedId(requestId);
    setUnreadCount(0);
    setToasts([]);
  }

  async function updateStatus(id: string, status: Status) {
    try {
      await updateRequest(id, { status });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to update request status."
      );
    }
  }

  async function addNote(id: string, newNote: string) {
    const request = requests.find((item) => item.id === id);

    if (!request || !newNote.trim()) return;

    try {
      await updateRequest(id, {
        notes: [...request.notes, newNote.trim()],
      });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to add note."
      );
    }
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.student.toLowerCase().includes(search.toLowerCase()) ||
      request.id.toLowerCase().includes(search.toLowerCase()) ||
      request.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || request.status === filter;

    return matchesSearch && matchesFilter;
  });

  const pending = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const active = requests.filter(
    (request) =>
      request.status === "Acknowledged" ||
      request.status === "In Progress"
  ).length;

  const resolved = requests.filter(
    (request) => request.status === "Resolved"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <Sidebar />

      <section className="relative min-w-0 flex-1 p-4 md:p-8">
        {/* Real-time toast notifications */}
        <div className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
          {toasts.map((toast) => (
            <div
              key={toast.eventId}
              className="rounded-xl border border-blue-200 bg-white p-4 shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl">
                    🔔
                  </span>

                  <div>
                    <p className="font-bold text-slate-900">
                      New Emergency Request!
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {toast.student} submitted a {toast.type} request.
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {toast.location}
                    </p>

                    <span className="mt-2 inline-block rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
                      {toast.priority} Priority
                    </span>

                    <button
                      onClick={() => {
                        openRequest(toast.requestId);
                        dismissToast(toast.eventId);
                      }}
                      className="mt-3 block text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View Request →
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => dismissToast(toast.eventId)}
                  aria-label="Dismiss notification"
                  className="text-lg text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Workspace / Security
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              Security Overview
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Monitor and manage simulated campus assistance requests.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Notification bell */}
            <button
              onClick={() => {
                setUnreadCount(0);
                setToasts([]);
              }}
              aria-label="Clear notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-xl shadow-sm hover:bg-slate-50"
            >
              🔔

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {/* Enable desktop notifications and sound */}
            <button
              onClick={enableNotifications}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              {notificationPermission === "granted"
                ? "Notifications Enabled ✓"
                : "Enable Notifications"}
            </button>

            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              ● Simulation mode
            </span>
          </div>
        </header>

        {/* Notification permission status */}
        {notificationPermission === "denied" && (
          <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Browser notifications are blocked. Allow notifications
            for this localhost site in your browser settings.
          </div>
        )}

        {notificationPermission === "unsupported" && (
          <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            This browser does not support desktop notifications.
            Dashboard popup notifications will still work.
          </div>
        )}

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <StatCard
            title="Total requests"
            value={requests.length}
            color="text-slate-900"
          />

          <StatCard
            title="Awaiting action"
            value={pending}
            color="text-amber-600"
          />

          <StatCard
            title="Active requests"
            value={active}
            color="text-blue-600"
          />

          <StatCard
            title="Resolved"
            value={resolved}
            color="text-emerald-600"
          />
        </div>

        {/* Request management */}
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Loading emergency requests...
          </div>
        ) : (
          <div className="grid items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
            <RequestList
              requests={filteredRequests}
              selectedId={selected?.id ?? ""}
              onSelect={setSelectedId}
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
            />

            <RequestDetails
              request={selected}
              onStatusChange={updateStatus}
              onAddNote={addNote}
            />
          </div>
        )}

        <footer className="mt-8 text-center text-xs leading-5 text-slate-500">
          Academic project · Simulated requests only ·
          No guaranteed emergency response
        </footer>
      </section>
    </main>
  );
}
