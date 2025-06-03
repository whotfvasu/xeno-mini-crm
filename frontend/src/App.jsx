import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CampaignCreation from "./pages/CampaignCreation"; 
import CampaignHistory from "./pages/CampaignHistory";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/campaign-creation" element={<CampaignCreation />} />
        <Route path="/campaign-history" element={<CampaignHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
