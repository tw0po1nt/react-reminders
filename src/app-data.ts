export interface Reminder {
  id: number;
  task: string;
  isCompleted: boolean;
}

export interface ReminderList {
  id: number;
  name: string;
  color: string;
  reminders: Reminder[];
}

export const LISTS: ReminderList[] = [
  {
    id: 1,
    name: "Reminders",
    color: "#F19A38",
    reminders: [],
  },
  {
    id: 2,
    name: "Final project tasks",
    color: "#3B82F7",
    reminders: [],
  },
];
