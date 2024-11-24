import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Favorite from "./components/pages/Favorite.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.scss";
import Home from "./components/pages/Home.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
