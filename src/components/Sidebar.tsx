import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { ReminderList } from "../app-data";

interface SidebarProps {
  lists: ReminderList[];
  selectedListId: number;
  onSelectList: (listId: number) => void;
}

const Sidebar: FC<SidebarProps> = ({ lists, selectedListId, onSelectList }) => {
  return (
    <section className="w-full">
      <h1 className="text-2xl text-white font-bold ml-2 mb-2">My Lists</h1>
      <div className="w-full">
        {lists.map(l => {
          const isSelected = l.id === selectedListId;
          return (
            <div onClick={() => onSelectList(l.id)} className={`flex flex-row items-center rounded-md p-2 cursor-pointer ${isSelected ? 'bg-[#3164B6]' : ''}`} key={l.id}>
              <div className={`flex flex-row justify-center items-center w-8 h-8 bg-[${l.color}] rounded-full mr-2`}>
                <FontAwesomeIcon icon={faListUl} className="text-white" />
              </div>
              <p className="text-white text-base grow">{l.name}</p>
              <p className="text-zinc-400 text-base ml-2">{l.reminders.length}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
