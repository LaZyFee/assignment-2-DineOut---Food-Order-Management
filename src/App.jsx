import { Navbar } from "./Components/Navbar/Navbar";
import { DashBoard } from "./Pages/DashBoardPage/DashBoard";

function App() {
  return (
    <div className="text-white bg-background">
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <Navbar />
        <DashBoard />
      </div>
    </div>
  );
}

export default App;
