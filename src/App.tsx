import { useMemo, useState } from "react";
import { LISTS, ReminderList } from "./app-data";
import Sidebar from "./components/Sidebar";
import RemindersList from "./components/RemindersList";

function App() {
  const [selectedListId, setSelectedListId] = useState<number>(LISTS[0].id);
  const [lists, setLists] = useState(LISTS);

  const handleSelectList = (listId: number) => {
    setSelectedListId(listId);
  };

  const handleAddList = (newList: Omit<ReminderList, "id">) => {
    setLists(prev => ([
      ...prev,
      {
        id: prev[prev.length - 1].id + 1,
        ...newList
      }
    ]));
  };

  const selectedList = useMemo(() => lists.find(l => l.id === selectedListId), [lists, selectedListId]);

  const handleMarkCompleted = (reminderId: number) => {
    const listIdx = lists.findIndex(l => l.id === selectedListId);
    if (listIdx >= 0) {
      const list = lists[listIdx];
      const reminderIdx = list.reminders.findIndex(r => r.id === reminderId);
      if (reminderIdx >= 0) {
        const updatedReminders = [
          ...list.reminders.slice(0, reminderIdx),
          {
            ...list.reminders[reminderIdx],
            isCompleted: !list.reminders[reminderIdx].isCompleted
          },
          ...list.reminders.slice(reminderIdx + 1),
        ];

        setLists(prev => ([
          ...prev.slice(0, listIdx),
          {
            ...prev[listIdx],
            reminders: updatedReminders
          },
          ...prev.slice(listIdx + 1),
        ]));
      }
    }
  };

  return (
    <div className="container flex flex-row bg-zinc-900 overflow-clip h-screen max-w-5xl rounded-xl lg:my-8">
      <aside className="h-full w-1/3 min-w-fit bg-zinc-800 border-r border-black p-4">
        <Sidebar lists={lists} selectedListId={selectedListId} onSelectList={handleSelectList} onCommitAddList={handleAddList} />
      </aside>
      <section className="h-full grow">
        {selectedList && (
          <RemindersList list={selectedList} onMarkCompleted={handleMarkCompleted} />
        )}
      </section>
    </div>
  );
}

export default App;
