import "./App.css";
import NavTabs from "./components/NavTabs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavTabs />
    </Router>
  );
}


export default App;
