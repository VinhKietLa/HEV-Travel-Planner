import "./App.css";
import NavTabs from "./components/NavTabs";
import Home from "./components/Home";
import Flights from "./components/Flights";
import CoolPlaces from "./components/CoolPlaces";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <NavTabs />
        {/* Wrap Route elements in a Routes component */}
        <Routes basename="/">
          {/* Define routes using the Route component to render different page components at different paths */}
          {/* Define a default route that will render the Home component */}
          <Route path="/" element={<Home />} exact />
          <Route path="/places-to-see" element={<CoolPlaces />} />
          <Route path="/flights" element={<Flights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
