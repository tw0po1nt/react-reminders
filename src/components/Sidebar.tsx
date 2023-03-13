import { FC, useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ReminderList, getRandomColor } from "../app-data";

interface SidebarProps {
  lists: ReminderList[];
  selectedListId: number;
  onSelectList: (listId: number) => void;
  onCommitAddList: (newList: Omit<ReminderList, "id">) => void;
}

const Sidebar: FC<SidebarProps> = ({ lists, selectedListId, onSelectList, onCommitAddList }) => {
  const [newList, setNewList] = useState<Omit<ReminderList, "id"> | undefined>();

  const handleAddListClicked = () => {
    if (!newList) {
      setNewList({
        name: "New list",
        color: getRandomColor(),
        reminders: [],
      });
    }
  };

  const handleNewListNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewList(prev => {
      if (prev) {
        return {
          ...prev,
          name: e.target.value,
        }
      }

      return prev;
    })
  };

  const handleReturnKeyClicked = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitNewListItem();
    }
  };

  const handleNewListBlur = () => {
    commitNewListItem();
  };

  const commitNewListItem = () => {
    if (newList) {
      const nextId = lists[lists.length - 1].id + 1;
      onCommitAddList(newList);
      setNewList(undefined);
      onSelectList(nextId);
    }
  };

  return (
    <section className="w-full">
      <div className="flex flex-row items-baseline">
        <h1 className="grow text-2xl text-white font-bold ml-2 mb-2">My Lists</h1>
        <div className="flex flex-row items-center">
          <FontAwesomeIcon icon={faCirclePlus} className="text-zinc-400 mr-1" />
          <p className="text-zinc-400 cursor-pointer" onClick={handleAddListClicked}>Add List</p>
        </div>
      </div>
      <div className="w-full">
        {lists.map(l => {
          const isSelected = l.id === selectedListId;
          return (
            <div onClick={() => onSelectList(l.id)} className={`flex flex-row items-center rounded-md p-2 cursor-pointer ${isSelected ? 'bg-[#3164B6]' : ''}`} key={l.id}>
              <div 
                className="flex flex-row justify-center items-center w-8 h-8 rounded-full mr-2"
                style={{ backgroundColor: l.color }}> {/* Tailwind doesn't allow template strings for classes */}
                <FontAwesomeIcon icon={faListUl} className="text-white" />
              </div>
              <p className="text-white text-base grow">{l.name}</p>
              <p className="text-zinc-500 text-base ml-2">{l.reminders.length}</p>
            </div>
          );
        })}
        {newList && (
          <div className={"flex flex-row items-center rounded-md p-2 cursor-pointer"}>
            <div 
              className="flex flex-row justify-center items-center w-8 h-8 rounded-full mr-2"
              style={{ backgroundColor: newList.color }}> {/* Tailwind doesn't allow template strings for classes */}
              <FontAwesomeIcon icon={faListUl} className="text-white" />
            </div>
            <input 
              className="grow bg-zinc-800 text-white focus:ring-0 focus:ring-offset-0" 
              type="text" 
              value={newList.name}
              onChange={handleNewListNameChange} 
              onKeyUp={handleReturnKeyClicked}
              onBlur={handleNewListBlur} />
        </div>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
