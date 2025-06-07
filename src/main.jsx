import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BirthdayCard from "../components/BirthdayCard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="App">
      <BirthdayCard />
    </div>
  </StrictMode>
);
