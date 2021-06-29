import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./components/shared/Sidebar";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <div className="wrapper-main">
        <Home />
      </div>
    </div>
  );
}

export default App;
