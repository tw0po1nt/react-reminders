import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ReminderList, Reminder } from "../app-data";

interface ReminderListProps {
  list: ReminderList;
  onMarkCompleted: (reminderId: number) => void;
  onAddNewReminder: (reminder: Reminder) => void;
}

const RemindersList: FC<ReminderListProps> = ({ list, onMarkCompleted, onAddNewReminder }) => {
  const [newReminder, setNewReminder] = useState<
    Omit<Reminder, "id"> | undefined
  >();

  const handleAddNewReminderClicked = () => {
    if (!newReminder) {
      setNewReminder({
        task: "New reminder",
        isCompleted: false,
      });
    }
  };

  const handleNewReminderNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewReminder(prev => {
      if (prev) {
        return {
          ...prev,
          task: e.target.value,
        }
      }

      return prev;
    })
  };

  const handleReturnKeyClicked = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitNewReminder();
    }
  };

  const handleNewReminderBlur = () => {
    commitNewReminder();
  };

  const commitNewReminder = () => {
    if (newReminder) {
      const nextId = list.reminders.length ? list.reminders[list.reminders.length - 1].id + 1 : 1;
      onAddNewReminder({
        ...newReminder,
        id: nextId
      });
      setNewReminder(undefined);
    }
  };

  return (
    <section className="w-full">
      <div className="flex flex-row items-baseline px-4 pt-4">
        <h1
          className="grow text-2xl text-white font-bold ml-2 mb-2"
          style={{ color: list.color }}
        >
          {list.name}
        </h1>
        <h1
          className="text-2xl text-white font-bold ml-2 mb-2"
          style={{ color: list.color }}
        >
          {list.reminders.length}
        </h1>
      </div>
      <div className="w-full">
        {list.reminders.map((r) => (
          <div className="flex flex-row items-center p-2" key={r.id}>
            <div
              className="flex flex-row justify-center items-center border w-5 h-5 rounded-full ml-4 mr-2 cursor-pointer"
              style={{
                borderColor: r.isCompleted ? list.color : "rgb(113,113,122)",
              }}
              onClick={() => onMarkCompleted(r.id)}
            >
              {r.isCompleted && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    borderColor: list.color,
                    backgroundColor: list.color,
                  }}
                ></div>
              )}
            </div>
            <p className="text-white">{r.task}</p>
          </div>
        ))}
        {newReminder ? (
          <div className="flex flex-row items-center p-2 cursor-pointer">
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="text-zinc-400 ml-4 mr-2 w-5 h-5"
            />
            <input 
              className="grow bg-zinc-800 text-white focus:ring-0 focus:ring-offset-0" 
              type="text" 
              value={newReminder.task}
              onChange={handleNewReminderNameChange} 
              onKeyUp={handleReturnKeyClicked}
              onBlur={handleNewReminderBlur} />
          </div>
        ) : (
          <div className="flex flex-row items-center p-2 cursor-pointer" onClick={handleAddNewReminderClicked}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="text-zinc-400 ml-4 mr-2 w-5 h-5"
            />
            <p className="text-white">Add new task</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RemindersList;
