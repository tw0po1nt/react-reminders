import Sidebar from "./components/Sidebar";
import { LISTS } from "./app-data";
import { useState } from "react";

function App() {
  const [selectedListId, setSelectedListId] = useState<number>(LISTS[0].id);
  const [lists, setLists] = useState(LISTS);

  const handleSelectList = (listId: number) => {
    setSelectedListId(listId);
  };

  return (
    <div className="container flex flex-row bg-zinc-900 overflow-clip h-screen max-w-5xl rounded-xl lg:my-8">
      <aside className="h-full w-1/3 min-w-fit bg-zinc-800 border-r border-black p-4">
        <Sidebar lists={lists} selectedListId={selectedListId} onSelectList={handleSelectList} />
      </aside>
      <section className="h-full grow pt-4 pl-4">
        <h1 className="text-2xl text-white font-bold">[Reminders list component here]</h1>
      </section>
    </div>
  );
}

export default App;
