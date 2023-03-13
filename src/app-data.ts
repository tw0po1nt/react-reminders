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
    reminders: [
      {
        id: 1,
        task: "Do the dishes",
        isCompleted: false,
      },
      {
        id: 2,
        task: "Hang up the clothes",
        isCompleted: true,
      }
    ],
  },
  {
    id: 2,
    name: "Final project tasks",
    color: "#3B82F7",
    reminders: [
      {
        id: 1,
        task: "Write a React app",
        isCompleted: false,
      }
    ],
  },
];

const COLORS = [
  "#EB5545",
  "#F9D84A",
  "#68CE6A",
  "#89C1FA",
  "#5E5CDE",
  "#EC5D7B",
  "#C983EE",
  "#C3A77C",
  "#747E86",
  "#E3B7B0"
]

export const getRandomColor = () => COLORS[Math.floor(Math.random()*COLORS.length)];
