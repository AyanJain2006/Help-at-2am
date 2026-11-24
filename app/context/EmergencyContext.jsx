
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";

const API_URL = "http://localhost:5000/api/requests";
const SOCKET_URL = "http://localhost:5000";

const EmergencyContext = createContext(undefined);

export function EmergencyProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationEvents, setNotificationEvents] = useState([]);

  // Fetch existing requests from backend
  useEffect(() => {
    let active = true;

    async function fetchRequests() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch emergency requests.");
        }

        const result = await response.json();

        if (active) {
          setRequests(result.data || []);
        }
      } catch (error) {
        console.error("Fetch requests error:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchRequests();

    return () => {
      active = false;
    };
  }, []);

  // Connect to Socket.IO for real-time requests
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log(
        "Connected to real-time notification server:",
        socket.id
      );
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.on("new-emergency-request", (newRequest) => {
      console.log("New emergency request received:", newRequest);

      setRequests((previous) => [
        newRequest,
        ...previous.filter((item) => item.id !== newRequest.id),
      ]);

      setNotificationEvents((previous) => [
        ...previous,
        {
          request: newRequest,
          eventId: `${newRequest.id}-${Date.now()}-${Math.random()}`,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Create request using POST API
  const addRequest = async (request) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to submit emergency request."
      );
    }

    setRequests((previous) => [
      result.data,
      ...previous.filter((item) => item.id !== result.data.id),
    ]);
  };

  // Update request using PATCH API
  const updateRequest = async (id, updates) => {
    const response = await fetch(
      `${API_URL}/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to update emergency request."
      );
    }

    setRequests((previous) =>
      previous.map((request) =>
        request.id === id ? result.data : request
      )
    );
  };

  return (
    <EmergencyContext.Provider
      value={{
        requests,
        loading,
        notificationEvents,
        addRequest,
        updateRequest,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);

  if (!context) {
    throw new Error(
      "useEmergency must be used inside EmergencyProvider"
    );
  }

  return context;
}
