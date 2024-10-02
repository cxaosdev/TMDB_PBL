import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import MovieDetail from "./components/MovieDetail";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/detail/:title" element={<MovieDetail />} /> */}
        <Route path="/detail" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
