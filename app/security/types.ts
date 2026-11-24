export type Status =
  | "Pending"
  | "Acknowledged"
  | "In Progress"
  | "Resolved";

export type EmergencyRequest = {
  id: string;
  student: string;
  type: string;
  location: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  status: Status;
  description: string;
  notes: string[];
};
