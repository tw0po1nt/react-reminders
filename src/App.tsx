function App() {
  return (
    <main className="container flex flex-row bg-zinc-900 overflow-clip h-screen max-w-5xl rounded-xl lg:my-8">
      <aside className="h-full w-1/3 bg-zinc-800 border-r border-black pt-4 pl-4">
        <h1 className="text-2xl text-white font-bold">[Sidebar component here]</h1>
      </aside>
      <section className="h-full grow pt-4 pl-4">
        <h1 className="text-2xl text-white font-bold">[Reminders list component here]</h1>
      </section>
    </main>
  );
}

export default App;
