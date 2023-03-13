import { FC } from "react";
import { ReminderList } from "../app-data";

interface ReminderListProps {
  list: ReminderList;
  onMarkCompleted: (reminderId: number) => void;
}

const RemindersList: FC<ReminderListProps> = ({ list, onMarkCompleted }) => {
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
              style={{ borderColor: r.isCompleted ? list.color : 'rgb(113,113,122)' }}
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
      </div>
    </section>
  );
};

export default RemindersList;
