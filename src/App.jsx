import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App w-screen min-h-screen flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
