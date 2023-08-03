import Sidebar from "./sections/Sidebar";
import TopNav from "./sections/TopNav";

function App() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Contents */}
      <main className="h-[200vh] w-full">
        {/* TopNav */}
        <TopNav />
      </main>
    </div>
  );
}

export default App;
